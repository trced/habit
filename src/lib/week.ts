/** La semaine est l'unité de la page : sept colonnes, toujours les mêmes.
 *  Le mois n'est pas une autre grille, c'est la même lue en bandes. */

import { addDays, daysInMonth, parseISODate, toISODate } from './format.ts'
import type { FirstDaySetting } from './types.ts'

export interface WeekDay {
  /** ISO 8601, AAAA-MM-JJ. */
  iso: string
  /** Quantième, 1 à 31. */
  day: number
  /** 0 = dimanche, comme Date. */
  dow: number
  weekend: boolean
}

/** Lundi ou dimanche selon le réglage — jamais deviné. */
export function startOfWeek(date: Date, firstDay: FirstDaySetting): Date {
  const offset = firstDay === 'monday' ? (date.getDay() + 6) % 7 : date.getDay()
  return addDays(date, -offset)
}

export function startOfWeekISO(iso: string, firstDay: FirstDaySetting): string {
  const date = parseISODate(iso)
  if (!date) return iso
  return toISODate(startOfWeek(date, firstDay))
}

/** Les sept jours d'une semaine, à partir de son premier. */
export function weekDays(startISO: string): WeekDay[] {
  const start = parseISODate(startISO)
  if (!start) return []
  const out: WeekDay[] = []
  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i)
    const dow = date.getDay()
    out.push({
      iso: toISODate(date),
      day: date.getDate(),
      dow,
      weekend: dow === 0 || dow === 6,
    })
  }
  return out
}

/** Les jours d'un mois, du 1er au dernier. */
export function monthDays(year: number, month: number): WeekDay[] {
  const total = daysInMonth(year, month)
  const out: WeekDay[] = []
  for (let d = 1; d <= total; d++) {
    const date = new Date(year, month, d)
    const dow = date.getDay()
    out.push({
      iso: toISODate(date),
      day: d,
      dow,
      weekend: dow === 0 || dow === 6,
    })
  }
  return out
}

export interface MonthBand {
  /** Premier jour de la semaine — parfois dans le mois précédent. */
  startISO: string
  /** Les jours de cette semaine qui appartiennent au mois affiché. */
  days: string[]
  /** « 03–09 », ou « 31 » quand la semaine ne mord que d'un jour. */
  label: string
}

/** Les semaines qui recouvrent un mois.
 *
 *  Ce sont de vraies semaines calendaires, pas des tranches de sept jours
 *  comptées depuis le 1er : sans cela, cliquer une bande ouvrirait une
 *  semaine que la bande ne décrit pas, et la bande de la semaine affichée
 *  ne serait presque jamais la bonne. La densité, elle, ne compte que les
 *  jours du mois — une bande ne parle que du mois qu'on regarde. */
export function monthBands(
  year: number,
  month: number,
  firstDay: FirstDaySetting,
): MonthBand[] {
  const total = daysInMonth(year, month)
  const last = new Date(year, month, total)
  let cursor = startOfWeek(new Date(year, month, 1), firstDay)
  const bands: MonthBand[] = []

  while (cursor.getTime() <= last.getTime()) {
    const days: string[] = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(cursor, i)
      if (date.getFullYear() === year && date.getMonth() === month) {
        days.push(toISODate(date))
      }
    }
    const first = days[0]
    const final = days[days.length - 1]
    bands.push({
      startISO: toISODate(cursor),
      days,
      label:
        first && final
          ? first === final
            ? first.slice(8)
            : `${first.slice(8)}–${final.slice(8)}`
          : '',
    })
    cursor = addDays(cursor, 7)
  }

  return bands
}

/** Quatre niveaux de densité, du vide au plein. Une lecture, pas un score :
 *  aucun chiffre n'est affiché, et rien ne qualifie une bande de bonne ou
 *  de mauvaise. Le rapport plutôt que le compte — une bande de deux jours
 *  cochés deux fois est pleine, elle aussi. */
export function densityLevel(done: number, total: number): number {
  if (total <= 0 || done <= 0) return 0
  const ratio = done / total
  if (ratio <= 1 / 3) return 1
  if (ratio <= 2 / 3) return 2
  return 3
}

export const DENSITY_GLYPHS = ['·', '▁', '▄', '█'] as const

export function densityGlyph(done: number, total: number): string {
  return DENSITY_GLYPHS[densityLevel(done, total)] ?? '·'
}
