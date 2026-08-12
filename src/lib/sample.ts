/** Jeu d'exemple de la page de présentation.
 *
 *  Il est calculé, pas écrit : la démonstration doit montrer la semaine en
 *  cours et le mois autour d'elle, quel que soit le jour où on l'ouvre. Les
 *  noms viennent de l'appelant — la couche lib ne traduit rien.
 *
 *  Rien de tout ceci n'est jamais écrit sur l'appareil. */

import { addDays, todayISO, toISODate, parseISODate } from './format.ts'
import type { Completion, Habit, HabitColor } from './types.ts'

/** Huit semaines : de quoi remplir le mois affiché et celui d'avant. */
const SPAN_DAYS = 56

const COLORS: (HabitColor | null)[] = [null, 'moss', 'slate', null, 'sand', 'clay']

/** Régularités choisies pour être crédibles et différentes les unes des
 *  autres : une habitude quasi tenue, une de semaine, une du week-end, une
 *  irrégulière — la grille doit montrer des jours vides sans en faire un
 *  reproche. */
const RHYTHMS = [88, 64, 70, 45, 30, 55]

/** Suite déterministe : la même démonstration à chaque ouverture, sans
 *  Math.random — deux captures d'écran du même jour sont identiques. */
function score(habit: number, offset: number): number {
  const x = (offset + 1) * 2654435761 + (habit + 1) * 40503 + offset * offset * 13
  return (x ^ (x >>> 5)) % 100
}

export interface SampleState {
  habits: Habit[]
  completions: Completion[]
}

export function sampleState(names: string[], today = todayISO()): SampleState {
  const end = parseISODate(today) ?? new Date()
  const start = addDays(end, -(SPAN_DAYS - 1))

  const habits: Habit[] = names.map((name, index) => ({
    id: `sample-${index}`,
    name,
    color: COLORS[index % COLORS.length] ?? null,
    position: index,
    createdAt: toISODate(start),
    archivedAt: null,
  }))

  const completions: Completion[] = []
  for (const [index, habit] of habits.entries()) {
    const rhythm = RHYTHMS[index % RHYTHMS.length] ?? 50
    for (let offset = 0; offset < SPAN_DAYS; offset++) {
      const date = addDays(start, offset)
      const weekend = date.getDay() === 0 || date.getDay() === 6
      // La cinquième habitude est celle du week-end : elle inverse le biais.
      const bias = index === 4 ? (weekend ? 45 : -30) : weekend ? -12 : 0
      if (score(index, offset) < rhythm + bias) {
        completions.push({ habitId: habit.id, date: toISODate(date) })
      }
    }
  }

  return { habits, completions }
}
