/** Gérer les habitudes : l'ordre, les noms, l'archivage.
 *
 *  Archiver retire du suivi et garde tout. Supprimer efface aussi
 *  l'historique — c'est le seul endroit où des occurrences disparaissent,
 *  et cela demande confirmation, en disant combien de jours sont en jeu. */

import { useState } from 'react'
import { Button } from '../../components/Button.tsx'
import { Confirm } from '../../components/Feedback.tsx'
import { Sheet } from '../../components/Sheet.tsx'
import { useI18n } from '../../i18n/index.tsx'
import { activeHabits, archivedHabits } from '../../lib/habits.ts'
import type { Habit } from '../../lib/types.ts'
import { useStore } from '../../state/store.tsx'

export interface ManageSheetProps {
  onClose: () => void
  onEdit: (habit: Habit) => void
  onAdd: () => void
  onFlash: (message: string) => void
}

export function ManageSheet({
  onClose,
  onEdit,
  onAdd,
  onFlash,
}: ManageSheetProps) {
  const { t, tp } = useI18n()
  const store = useStore()
  const [asking, setAsking] = useState<Habit | null>(null)

  const active = activeHabits(store.habits)
  const archived = archivedHabits(store.habits)

  const historyOf = (habit: Habit): number =>
    store.completions.filter((done) => done.habitId === habit.id).length

  return (
    <Sheet full label={t('app.manage.title')} onClose={onClose}>
      <div className="settings__head">
        <span className="t-title">{t('app.manage.title')}</span>
        <Button variant="quiet" onClick={onClose}>
          {t('common.close')}
        </Button>
      </div>

      <div className="settings__body">
        <section>
          <p className="t-meta t-dim">{t('app.manage.note')}</p>
          {active.length === 0 ? (
            <p className="settings__note">{t('app.manage.empty')}</p>
          ) : (
            <ul className="manage">
              {active.map((habit, index) => (
                <li key={habit.id} className="manage__row">
                  <button
                    type="button"
                    className="manage__name"
                    aria-label={t('app.manage.rename', { name: habit.name })}
                    onClick={() => onEdit(habit)}
                  >
                    {habit.color ? (
                      <span
                        aria-hidden="true"
                        className={`dot manage__dot manage__dot--${habit.color}`}
                      />
                    ) : (
                      <span aria-hidden="true" className="manage__dot" />
                    )}
                    {habit.name}
                  </button>
                  <span className="manage__move">
                    <button
                      type="button"
                      className="manage__arrow"
                      aria-label={t('app.manage.up', { name: habit.name })}
                      disabled={index === 0}
                      onClick={() => store.moveHabit(habit.id, -1)}
                    >
                      <span aria-hidden="true">↑</span>
                    </button>
                    <button
                      type="button"
                      className="manage__arrow"
                      aria-label={t('app.manage.down', { name: habit.name })}
                      disabled={index === active.length - 1}
                      onClick={() => store.moveHabit(habit.id, 1)}
                    >
                      <span aria-hidden="true">↓</span>
                    </button>
                  </span>
                  <Button
                    variant="quiet"
                    aria-label={t('app.manage.archiveAria', {
                      name: habit.name,
                    })}
                    onClick={() => {
                      store.archiveHabit(habit.id)
                      onFlash(t('app.flash.archived', { name: habit.name }))
                    }}
                  >
                    {t('app.manage.archive')}
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="manage__add">
            <Button onClick={onAdd}>{t('app.nav.addLong')}</Button>
          </div>
        </section>

        {archived.length > 0 ? (
          <section>
            <div className="section-label section-label--strong">
              {tp('app.manage.archived', archived.length)}
            </div>
            <ul className="manage">
              {archived.map((habit) => (
                <li key={habit.id}>
                  <div className="manage__row manage__row--archived">
                    <span className="manage__name manage__name--static">
                      {habit.name}
                    </span>
                    <Button
                      variant="quiet"
                      aria-label={t('app.manage.restoreAria', {
                        name: habit.name,
                      })}
                      onClick={() => {
                        store.restoreHabit(habit.id)
                        onFlash(t('app.flash.restored', { name: habit.name }))
                      }}
                    >
                      {t('app.manage.restore')}
                    </Button>
                    <Button
                      variant="destructive"
                      aria-label={t('app.manage.deleteAria', {
                        name: habit.name,
                      })}
                      onClick={() => setAsking(habit)}
                    >
                      {t('app.manage.delete')}
                    </Button>
                  </div>

                  {asking?.id === habit.id ? (
                    <Confirm
                      title={t('app.manage.deleteAsk', { name: habit.name })}
                      body={tp('app.manage.deleteBody', historyOf(habit))}
                    >
                      <Button variant="quiet" onClick={() => setAsking(null)}>
                        {t('common.cancel')}
                      </Button>
                      <Button
                        variant="destructive"
                        strong
                        onClick={() => {
                          store.deleteHabit(habit.id)
                          setAsking(null)
                          onFlash(t('app.flash.deleted', { name: habit.name }))
                        }}
                      >
                        {t('app.manage.deleteConfirm')}
                      </Button>
                    </Confirm>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="settings__note">{t('app.manage.deleteNote')}</p>
          </section>
        ) : null}
      </div>
    </Sheet>
  )
}
