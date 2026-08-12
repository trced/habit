/** Dates. Tout est stocké en AAAA-MM-JJ et manipulé en heure locale :
 *  une case cochée le 12 août reste le 12 août quel que soit le fuseau.
 *
 *  Aucune date n'est produite par toISOString — qui bascule en UTC et
 *  décale d'un jour partout à l'est de Greenwich après 22 h. */

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/

export function toISODate(date: Date): string {
  const y = String(date.getFullYear()).padStart(4, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Rejette autant les formats invalides que les dates qui n'existent pas :
 *  « 2026-02-30 » se replierait sur le 2 mars sans ce contrôle. */
export function parseISODate(iso: string): Date | null {
  const match = ISO.exec(String(iso ?? ''))
  if (!match) return null
  const [, y, m, d] = match
  const year = Number(y)
  const month = Number(m)
  const day = Number(d)
  if (month < 1 || month > 12 || day < 1 || day > 31) return null
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

export function isISODate(value: unknown): value is string {
  return typeof value === 'string' && parseISODate(value) !== null
}

/** Décalage en jours. Passe par les composants plutôt que par les
 *  millisecondes : un changement d'heure ne fait ni sauter ni répéter un jour. */
export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

export function startOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1)
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function todayISO(): string {
  return toISODate(new Date())
}

/** Le jour de la semaine, 0 = dimanche — la convention de Date. */
export function dayOfWeek(iso: string): number {
  return parseISODate(iso)?.getDay() ?? 0
}

export function monthName(month: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(
    new Date(2026, month, 1),
  )
}

/** Initiale du jour, telle que la locale l'abrège — « L » en français,
 *  « M » en anglais pour lundi. Jamais une lettre écrite en dur. */
export function weekdayInitial(dow: number, locale: string): string {
  // 2026-08-02 est un dimanche : le décalage donne le jour voulu.
  const date = new Date(2026, 7, 2 + dow)
  const short = new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(
    date,
  )
  return short.toUpperCase()
}

export function weekdayName(iso: string, locale: string): string {
  const date = parseISODate(iso)
  if (!date) return iso
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date)
}

/** « 12 août 2026 » — la forme longue, pour les noms accessibles. */
export function formatDate(iso: string, locale: string): string {
  const date = parseISODate(iso)
  if (!date) return iso
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** « 10–16 août » — le titre de la semaine. formatRange sait franchir un
 *  mois ou une année ; le repli sert les environnements qui l'ignorent. */
export function formatDayRange(
  startISO: string,
  endISO: string,
  locale: string,
): string {
  const start = parseISODate(startISO)
  const end = parseISODate(endISO)
  if (!start || !end) return `${startISO} – ${endISO}`
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }
  const formatter = new Intl.DateTimeFormat(locale, options)
  if (typeof formatter.formatRange === 'function') {
    return formatter.formatRange(start, end)
  }
  return `${formatter.format(start)} – ${formatter.format(end)}`
}

/** Numéro de semaine ISO 8601 : la semaine 1 est celle qui contient le
 *  premier jeudi de l'année. Ne vaut que pour des semaines commençant le
 *  lundi — c'est la définition même de la norme. */
export function isoWeekNumber(iso: string): number | null {
  const date = parseISODate(iso)
  if (!date) return null
  // Le jeudi de la semaine courante décide de l'année et du numéro.
  const day = (date.getDay() + 6) % 7
  const thursday = addDays(date, 3 - day)
  const firstThursday = new Date(thursday.getFullYear(), 0, 4)
  const firstDay = (firstThursday.getDay() + 6) % 7
  const firstMonday = addDays(firstThursday, -firstDay)
  const weeks = Math.round(
    (thursday.getTime() - firstMonday.getTime()) / (7 * 86400000),
  )
  return weeks + 1
}

/** L'année à laquelle la semaine ISO appartient — le 31 décembre 2025
 *  tombe dans la semaine 1 de 2026. */
export function isoWeekYear(iso: string): number | null {
  const date = parseISODate(iso)
  if (!date) return null
  const day = (date.getDay() + 6) % 7
  return addDays(date, 3 - day).getFullYear()
}
