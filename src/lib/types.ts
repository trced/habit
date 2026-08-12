/** Modèle de données de habit. Une habitude, un jour, coché ou non.
 *  Rien d'autre : pas de note, pas de quantité, pas d'objectif. */

/** Les couleurs sont nommées, jamais stockées en hexadécimal : c'est le
 *  thème qui décide de leur valeur, et un fichier exporté en 2026 doit
 *  rester lisible par une palette révisée en 2030.
 *
 *  Pas d'encre dans la liste : « aucune couleur » se peint déjà à l'encre,
 *  et deux choix qui donnent le même point n'en font qu'un. */
export const HABIT_COLORS = ['moss', 'slate', 'sand', 'clay'] as const

export type HabitColor = (typeof HABIT_COLORS)[number]

export interface Habit {
  id: string
  /** 24 caractères au plus : au-delà, la colonne tronque et le nom ment. */
  name: string
  /** Facultative, et jamais porteuse de sens : la grille se lit sans elle. */
  color: HabitColor | null
  /** Ordre d'affichage. Une préférence, jamais une donnée d'historique. */
  position: number
  /** ISO 8601, AAAA-MM-JJ. */
  createdAt: string
  /** Archivée : retirée du suivi courant, son historique reste entier. */
  archivedAt: string | null
}

/** Une occurrence effectuée. L'absence vaut « non effectué » : rien n'est
 *  écrit pour un jour vide, et un mois jamais ouvert ne pèse rien. */
export interface Completion {
  habitId: string
  /** ISO 8601, AAAA-MM-JJ. Aucune date formatée en base. */
  date: string
}

export type ThemeSetting = 'system' | 'light' | 'dark'
export type LangSetting = 'system' | 'fr' | 'en'
export type FirstDaySetting = 'monday' | 'sunday'
export type ColorsSetting = 'shown' | 'hidden'
export type WeekendsSetting = 'distinct' | 'plain'
export type SummarySetting = 'shown' | 'hidden'

export interface Settings {
  theme: ThemeSetting
  lang: LangSetting
  firstDay: FirstDaySetting
  /** Les couleurs d'habitude sont affichées, ou la grille reste à l'encre. */
  colors: ColorsSetting
  weekends: WeekendsSetting
  /** Le résumé du mois sous la semaine. */
  summary: SummarySetting
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  lang: 'system',
  firstDay: 'monday',
  colors: 'shown',
  weekends: 'distinct',
  summary: 'shown',
}

/** Longueur maximale d'un nom d'habitude. La colonne de gauche en montre
 *  autant qu'elle peut ; au-delà, elle tronquerait sans le dire. */
export const NAME_MAX = 24

export const SCHEMA_VERSION = 1

/** Le fichier habit.json — le seul format d'échange du projet. */
export interface HabitFile {
  schemaVersion: number
  data: { habits: Habit[]; completions: Completion[] }
  settings: Partial<Settings>
}
