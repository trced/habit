/** Ajouter ou renommer une habitude. Un champ, cinq pastilles, un bouton.
 *
 *  Renommer ne touche pas à l'identifiant : l'historique suit le nouveau nom
 *  plutôt que de rester derrière l'ancien. */

import { useState } from 'react'
import { Button } from '../../components/Button.tsx'
import { Sheet } from '../../components/Sheet.tsx'
import { TextField } from '../../components/TextField.tsx'
import { useI18n } from '../../i18n/index.tsx'
import type { MessageKey } from '../../i18n/index.tsx'
import { normaliseName } from '../../lib/habits.ts'
import { HABIT_COLORS, NAME_MAX } from '../../lib/types.ts'
import type { Habit, HabitColor } from '../../lib/types.ts'

export interface HabitSheetProps {
  /** L'habitude modifiée, ou null pour en créer une. */
  habit: Habit | null
  /** Toutes les habitudes, archivées comprises : deux fois le même nom
   *  rendrait la colonne illisible et la fusion ambiguë. */
  habits: Habit[]
  onClose: () => void
  onSave: (name: string, color: HabitColor | null) => void
}

export function HabitSheet({ habit, habits, onClose, onSave }: HabitSheetProps) {
  const { t } = useI18n()
  const [name, setName] = useState(habit?.name ?? '')
  const [color, setColor] = useState<HabitColor | null>(habit?.color ?? null)
  const [error, setError] = useState<MessageKey | null>(null)

  const title = habit ? t('app.habit.editTitle') : t('app.habit.addTitle')

  const submit = (): void => {
    const clean = normaliseName(name)
    if (!clean) {
      setError('app.habit.nameError')
      return
    }
    const taken = habits.some(
      (other) =>
        other.id !== habit?.id &&
        other.name.toLowerCase() === clean.toLowerCase(),
    )
    if (taken) {
      setError('app.habit.nameTaken')
      return
    }
    onSave(clean, color)
  }

  return (
    <Sheet label={title} onClose={onClose}>
      <div className="sheet__head">
        <span className="t-body">{title}</span>
        <Button variant="quiet" onClick={onClose}>
          {t('common.close')}
        </Button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <TextField
          required
          autoFocus
          label={t('app.habit.name')}
          placeholder={t('app.habit.namePlaceholder')}
          maxLength={NAME_MAX}
          value={name}
          hint={t('app.habit.nameHint', { max: NAME_MAX })}
          error={error ? t(error) : undefined}
          onValueChange={(value) => {
            setName(value)
            setError(null)
          }}
        />

        {/* De vrais boutons radio : les flèches du clavier parcourent le
            groupe, et le choix est annoncé sans qu'on ait rien à simuler. */}
        <fieldset className="swatches">
          <legend className="field__label">{t('app.habit.color')}</legend>
          <div className="swatches__row">
            {[null, ...HABIT_COLORS].map((value) => {
              const key = value ?? 'none'
              const label = t(`app.habit.color.${key}` as MessageKey)
              return (
                <label key={key} className="swatch">
                  <input
                    type="radio"
                    name="habit-color"
                    className="visually-hidden"
                    value={key}
                    checked={color === value}
                    onChange={() => setColor(value)}
                  />
                  <span
                    className={`swatch__dot${
                      value ? ` swatch__dot--${value}` : ' swatch__dot--none'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">
                    {t('app.habit.colorAria', { name: label })}
                  </span>
                </label>
              )
            })}
          </div>
          <p className="field__hint">{t('app.habit.colorNote')}</p>
        </fieldset>

        <div className="sheet__actions">
          <div className="sheet__actions-group">
            <Button variant="quiet" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {habit ? t('app.habit.save') : t('app.habit.add')}
            </Button>
          </div>
        </div>
      </form>
    </Sheet>
  )
}
