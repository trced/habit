/** La grille : des jours en colonnes, des habitudes en lignes, une case
 *  binaire à l'intersection. La semaine et le mois sont la même grille —
 *  seule la largeur des colonnes change.
 *
 *  Un vrai tableau, pas une pile de div : le lecteur d'écran peut alors
 *  parcourir la grille par lignes et par colonnes, et chaque bouton porte
 *  en plus son nom complet — « marche, 12 août 2026, effectué » — pour la
 *  navigation à la tabulation, qui ne lit pas les en-têtes. */

import { useEffect, useRef } from 'react'
import { useI18n } from '../../i18n/index.tsx'
import { completionKey } from '../../lib/habits.ts'
import { formatDate, weekdayInitial } from '../../lib/format.ts'
import type { Habit } from '../../lib/types.ts'
import type { WeekDay } from '../../lib/week.ts'

/** Largeur d'une colonne en disposition « fixed », et de la colonne des
 *  noms qui l'accompagne : la vue se cale sur le jour courant en
 *  multipliant l'une par l'autre. */
export const FIXED_COLUMN = 40
const FIXED_NAME_COLUMN = 96

export interface HabitGridProps {
  habits: Habit[]
  days: WeekDay[]
  /** Clés « habitId|date » des jours cochés. */
  done: Set<string>
  today: string
  /** Nom accessible du tableau. */
  caption: string
  columnLabel: string
  /** « fill » partage la largeur entre les colonnes — la semaine tient
   *  toujours. « fixed » leur donne 40 px et laisse la grille défiler,
   *  la colonne des noms restant visible. */
  layout: 'fill' | 'fixed'
  markWeekends: boolean
  showColors: boolean
  /** Cale le défilement sur le jour courant à l'ouverture. */
  scrollToToday?: boolean
  onToggle: (habitId: string, date: string) => void
}

export function HabitGrid({
  habits,
  days,
  done,
  today,
  caption,
  columnLabel,
  layout,
  markWeekends,
  showColors,
  scrollToToday = false,
  onToggle,
}: HabitGridProps) {
  const { t, locale } = useI18n()
  const scroller = useRef<HTMLDivElement>(null)
  const fixed = layout === 'fixed'

  // Ouvrir le mois sur le 1er quand on est au 28 oblige à chercher :
  // la vue arrive sur aujourd'hui, une fois, sans reprendre la main ensuite.
  useEffect(() => {
    const element = scroller.current
    if (!element || !scrollToToday) return
    const index = days.findIndex((day) => day.iso === today)
    if (index < 0) return
    element.scrollLeft = Math.max(
      0,
      index * FIXED_COLUMN - (element.clientWidth - FIXED_NAME_COLUMN) / 2,
    )
  }, [days, today, scrollToToday])

  const table = (
    <table className={`grid${fixed ? ' grid--fixed' : ''}`}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className="grid__corner">
            {columnLabel}
          </th>
          {/* La clé est le rang de la colonne, pas sa date : en changeant
              de semaine, React réconcilie les cases en place au lieu de les
              remonter. Le focus reste donc sur le même jour de la semaine —
              sans quoi une flèche du clavier le perdrait au premier saut. */}
          {days.map((day, index) => {
            const isToday = day.iso === today
            const dim = markWeekends && day.weekend && !isToday
            return (
              <th
                key={index}
                scope="col"
                className={`grid__day${dim ? ' grid__day--dim' : ''}`}
              >
                <span className="grid__initial">
                  {weekdayInitial(day.dow, locale)}
                </span>
                <span
                  className={`grid__num${isToday ? ' grid__num--today' : ''}`}
                >
                  {String(day.day).padStart(2, '0')}
                </span>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {habits.map((habit) => (
          <tr key={habit.id}>
            <th scope="row" className="grid__name" title={habit.name}>
              {habit.name}
            </th>
            {days.map((day, index) => {
              const on = done.has(completionKey(habit.id, day.iso))
              const label = t(on ? 'app.cell.done' : 'app.cell.todo', {
                habit: habit.name,
                date: formatDate(day.iso, locale),
              })
              return (
                <td key={index} className="grid__cell">
                  <button
                    type="button"
                    className="cell"
                    aria-pressed={on}
                    aria-label={label}
                    onClick={() => onToggle(habit.id, day.iso)}
                  >
                    <span
                      aria-hidden="true"
                      className={`cell__mark${
                        on && showColors && habit.color
                          ? ` cell__mark--${habit.color}`
                          : ''
                      }`}
                    >
                      {on ? '●' : '·'}
                    </span>
                  </button>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

  if (!fixed) return table

  return (
    <div ref={scroller} className="grid-scroll">
      {table}
    </div>
  )
}
