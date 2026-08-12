/** Opérations sur les habitudes et leurs occurrences.
 *  Toutes pures : elles rendent un nouvel état, jamais un effet de bord. */

import { todayISO } from './format.ts'
import { NAME_MAX } from './types.ts'
import type { Completion, Habit, HabitColor } from './types.ts'

/** Identifiant local d'une habitude. Jamais transmis, jamais partagé. */
export function newHabitId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `h${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

/** La clé d'une case de la grille. Un Set de ces clés répond en temps
 *  constant : la vue mois en interroge trois cents à chaque rendu. */
export function completionKey(habitId: string, date: string): string {
  return `${habitId}|${date}`
}

export function completionSet(completions: Completion[]): Set<string> {
  const set = new Set<string>()
  for (const done of completions) set.add(completionKey(done.habitId, done.date))
  return set
}

/** Coche ou décoche. Une seule occurrence par habitude et par jour :
 *  un doublon venu d'un import fusionné ne double pas la case. */
export function toggleCompletion(
  completions: Completion[],
  habitId: string,
  date: string,
): Completion[] {
  const done = completions.some((c) => c.habitId === habitId && c.date === date)
  if (done) {
    return completions.filter((c) => !(c.habitId === habitId && c.date === date))
  }
  return completions.concat([{ habitId, date }])
}

/** Nombre de jours cochés parmi ceux fournis. */
export function countDone(
  set: Set<string>,
  habitId: string,
  dates: string[],
): number {
  let n = 0
  for (const date of dates) if (set.has(completionKey(habitId, date))) n++
  return n
}

export function byPosition(a: Habit, b: Habit): number {
  if (a.position !== b.position) return a.position - b.position
  return a.createdAt < b.createdAt ? -1 : 1
}

/** Les habitudes du suivi courant : celles qu'on coche aujourd'hui. */
export function activeHabits(habits: Habit[]): Habit[] {
  return habits.filter((h) => h.archivedAt === null).sort(byPosition)
}

/** Les archivées, la plus récemment rangée en tête. */
export function archivedHabits(habits: Habit[]): Habit[] {
  return habits
    .filter((h) => h.archivedAt !== null)
    .sort((a, b) => ((a.archivedAt ?? '') < (b.archivedAt ?? '') ? 1 : -1))
}

/** Renumérote les positions de 0 à n-1, archivées comprises, pour qu'un
 *  déplacement parte toujours d'une suite sans trou. */
export function reindex(habits: Habit[]): Habit[] {
  const ordered = [...habits].sort(byPosition)
  return ordered.map((habit, index) => ({ ...habit, position: index }))
}

export function nextPosition(habits: Habit[]): number {
  return habits.reduce((max, habit) => Math.max(max, habit.position + 1), 0)
}

export function createHabit(
  habits: Habit[],
  name: string,
  color: HabitColor | null,
): Habit {
  return {
    id: newHabitId(),
    name: normaliseName(name),
    color,
    position: nextPosition(habits),
    createdAt: todayISO(),
    archivedAt: null,
  }
}

/** Un nom tient sur une ligne de grille : espaces réduits, longueur bornée. */
export function normaliseName(name: string): string {
  return String(name ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX)
}

/** Déplace une habitude d'un rang parmi les actives. Les archivées ne
 *  bougent pas : elles ne sont pas dans la colonne qu'on réordonne. */
export function moveHabit(
  habits: Habit[],
  id: string,
  direction: -1 | 1,
): Habit[] {
  const active = activeHabits(habits)
  const index = active.findIndex((habit) => habit.id === id)
  const target = index + direction
  if (index === -1 || target < 0 || target >= active.length) return habits

  const moved = [...active]
  const [habit] = moved.splice(index, 1)
  if (!habit) return habits
  moved.splice(target, 0, habit)

  // Les actives reprennent les rangs libres dans leur nouvel ordre ; les
  // archivées gardent le leur, derrière.
  const order = new Map(moved.map((h, position) => [h.id, position]))
  const offset = moved.length
  return habits.map((h) => {
    const position = order.get(h.id)
    return position === undefined
      ? { ...h, position: offset + h.position }
      : { ...h, position }
  })
}

export function archiveHabit(habits: Habit[], id: string): Habit[] {
  const today = todayISO()
  return habits.map((habit) =>
    habit.id === id ? { ...habit, archivedAt: today } : habit,
  )
}

/** Restaurer replace l'habitude en fin de suivi : son rang d'avant ne veut
 *  plus rien dire, et rien n'est perdu qu'un déplacement ne rende. */
export function restoreHabit(habits: Habit[], id: string): Habit[] {
  const position = nextPosition(habits)
  return habits.map((habit) =>
    habit.id === id ? { ...habit, archivedAt: null, position } : habit,
  )
}

export function renameHabit(
  habits: Habit[],
  id: string,
  name: string,
  color: HabitColor | null,
): Habit[] {
  return habits.map((habit) =>
    habit.id === id ? { ...habit, name: normaliseName(name), color } : habit,
  )
}

/** Suppression définitive : l'habitude et tout son historique.
 *  Le seul endroit du projet où des occurrences disparaissent. */
export function removeHabit(
  habits: Habit[],
  completions: Completion[],
  id: string,
): { habits: Habit[]; completions: Completion[] } {
  return {
    habits: reindex(habits.filter((habit) => habit.id !== id)),
    completions: completions.filter((done) => done.habitId !== id),
  }
}
