/** Le mois sous la semaine : une bande par semaine, une colonne par
 *  habitude, quatre hauteurs de trait.
 *
 *  C'est une lecture, pas un score : aucun chiffre, aucun pourcentage,
 *  aucune bande qualifiée de bonne ou de mauvaise. Elle sert d'abord à
 *  naviguer — la toucher affiche cette semaine. */

import { useI18n } from '../../i18n/index.tsx'
import { formatDate } from '../../lib/format.ts'
import { countDone } from '../../lib/habits.ts'
import type { Habit } from '../../lib/types.ts'
import { densityGlyph, densityLevel } from '../../lib/week.ts'
import type { MonthBand } from '../../lib/week.ts'

export interface MonthSummaryProps {
  habits: Habit[]
  bands: MonthBand[]
  done: Set<string>
  /** Premier jour de la semaine affichée dans la grille. */
  currentWeek: string
  showColors: boolean
  onOpenWeek: (startISO: string) => void
}

export function MonthSummary({
  habits,
  bands,
  done,
  currentWeek,
  showColors,
  onOpenWeek,
}: MonthSummaryProps) {
  const { t, locale } = useI18n()

  return (
    <ul className="summary">
      {/* Les noms repèrent les colonnes à l'œil ; le lecteur d'écran, lui, a
          déjà les noms entiers dans la grille au-dessus.

          Écrits en entier et coupés par la colonne, jamais tronqués à deux
          lettres : « marche » et « marathon » donneraient le même « ma », et
          deux colonnes voisines portant la même abréviation ne repèrent
          plus rien. La coupe garde au moins ce qui les sépare. */}
      <li className="summary__head" aria-hidden="true">
        <span className="summary__label" />
        {habits.map((habit) => (
          <span key={habit.id} className="summary__abbr" title={habit.name}>
            {habit.name}
          </span>
        ))}
      </li>

      {bands.map((band) => {
        const current = band.startISO === currentWeek
        const first = band.days[0]
        const last = band.days[band.days.length - 1]
        return (
          <li key={band.startISO}>
            <button
              type="button"
              className="summary__band"
              aria-label={t(
                current
                  ? 'app.summary.bandAriaCurrent'
                  : 'app.summary.bandAria',
                {
                  start: first ? formatDate(first, locale) : '',
                  end: last ? formatDate(last, locale) : '',
                },
              )}
              {...(current ? { 'aria-current': 'true' as const } : {})}
              onClick={() => onOpenWeek(band.startISO)}
            >
              <span
                className={`summary__label${
                  current ? ' summary__label--current' : ''
                }`}
              >
                {band.label}
              </span>
              {habits.map((habit) => {
                const n = countDone(done, habit.id, band.days)
                const level = densityLevel(n, band.days.length)
                return (
                  <span
                    key={habit.id}
                    aria-hidden="true"
                    className={`summary__cell${
                      level > 0 && showColors && habit.color
                        ? ` summary__cell--${habit.color}`
                        : ''
                    }`}
                  >
                    {densityGlyph(n, band.days.length)}
                  </span>
                )
              })}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
