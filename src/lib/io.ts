/** habit.json — lecture, écriture, fusion, partage.
 *  Import validé contre le schéma, jamais d'écrasement silencieux. */

import { isISODate, todayISO } from './format.ts'
import { completionKey, normaliseName, reindex } from './habits.ts'
import { HABIT_COLORS, SCHEMA_VERSION } from './types.ts'
import type {
  Completion,
  Habit,
  HabitColor,
  HabitFile,
  Settings,
} from './types.ts'

/** « habit-2026-08-12.json » : deux exports du même appareil ne se
 *  recouvrent pas dans le dossier de téléchargement. */
export function exportFilename(date = todayISO()): string {
  return `habit-${date}.json`
}

export type ParseResult =
  | { ok: true; file: HabitFile }
  | { ok: false; reason: 'unreadable' | 'schema' | 'version' }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asColor(value: unknown): HabitColor | null {
  return HABIT_COLORS.includes(value as HabitColor) ? (value as HabitColor) : null
}

function asHabit(value: unknown, index: number): Habit | null {
  if (!isRecord(value)) return null
  const name = normaliseName(asString(value.name))
  if (!name) return null
  const position = Number(value.position)
  const createdAt = asString(value.createdAt)
  const archivedAt = asString(value.archivedAt)
  return {
    id: asString(value.id) || `imported-${index}`,
    name,
    color: asColor(value.color),
    position: Number.isFinite(position) ? position : index,
    createdAt: isISODate(createdAt) ? createdAt : todayISO(),
    archivedAt: isISODate(archivedAt) ? archivedAt : null,
  }
}

/** Une occurrence sans habitude n'a pas de case où s'afficher : elle est
 *  écartée plutôt que gardée en orphelin dans un fichier qui grossit. */
function asCompletions(value: unknown, habits: Habit[]): Completion[] {
  if (!Array.isArray(value)) return []
  const known = new Set(habits.map((habit) => habit.id))
  const seen = new Set<string>()
  const out: Completion[] = []
  for (const entry of value) {
    if (!isRecord(entry)) continue
    const habitId = asString(entry.habitId)
    const date = asString(entry.date)
    if (!known.has(habitId) || !isISODate(date)) continue
    const key = completionKey(habitId, date)
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ habitId, date })
  }
  return out
}

function asSettings(value: unknown): Partial<Settings> {
  if (!isRecord(value)) return {}
  const out: Partial<Settings> = {}
  const pick = <K extends keyof Settings>(
    key: K,
    allowed: readonly Settings[K][],
  ): void => {
    const v = value[key]
    if (allowed.includes(v as Settings[K])) out[key] = v as Settings[K]
  }
  pick('theme', ['system', 'light', 'dark'])
  pick('lang', ['system', 'fr', 'en'])
  pick('firstDay', ['monday', 'sunday'])
  pick('colors', ['shown', 'hidden'])
  pick('weekends', ['distinct', 'plain'])
  pick('summary', ['shown', 'hidden'])
  return out
}

/** Parse une chaîne JSON en fichier habit. Les enregistrements illisibles
 *  sont écartés un à un : une habitude cassée ne perd pas les autres. */
export function parseFile(text: string): ParseResult {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return { ok: false, reason: 'unreadable' }
  }
  if (!isRecord(raw)) return { ok: false, reason: 'schema' }

  const version = Number(raw.schemaVersion)
  if (!Number.isFinite(version)) return { ok: false, reason: 'schema' }
  if (version !== SCHEMA_VERSION) return { ok: false, reason: 'version' }

  const data = isRecord(raw.data) ? raw.data : null
  if (!data || !Array.isArray(data.habits)) {
    return { ok: false, reason: 'schema' }
  }

  const habits = reindex(
    data.habits
      .map((habit, index) => asHabit(habit, index))
      .filter((habit): habit is Habit => habit !== null),
  )

  return {
    ok: true,
    file: {
      schemaVersion: SCHEMA_VERSION,
      data: { habits, completions: asCompletions(data.completions, habits) },
      settings: asSettings(raw.settings),
    },
  }
}

export function serializeFile(file: HabitFile): string {
  return `${JSON.stringify(file, null, 2)}\n`
}

export interface MergeResult {
  habits: Habit[]
  completions: Completion[]
  /** Habitudes réellement ajoutées, et cases réellement cochées. */
  addedHabits: number
  addedCompletions: number
}

/** Deux habitudes sont la même si elles portent le même nom : l'identifiant
 *  est local à un appareil, le nom est ce que l'utilisateur reconnaît.
 *
 *  Fusionner n'écrase rien — les occurrences entrantes rejoignent celles de
 *  l'habitude déjà là, et une case déjà cochée le reste. */
export function mergeFile(
  current: { habits: Habit[]; completions: Completion[] },
  incoming: { habits: Habit[]; completions: Completion[] },
): MergeResult {
  const key = (name: string): string => name.trim().toLowerCase()
  const byName = new Map(current.habits.map((habit) => [key(habit.name), habit]))

  const habits = [...current.habits]
  /** Identifiant entrant → identifiant local. */
  const remap = new Map<string, string>()
  let addedHabits = 0

  for (const habit of incoming.habits) {
    const existing = byName.get(key(habit.name))
    if (existing) {
      remap.set(habit.id, existing.id)
      continue
    }
    const adopted: Habit = { ...habit, position: habits.length }
    habits.push(adopted)
    byName.set(key(adopted.name), adopted)
    remap.set(habit.id, adopted.id)
    addedHabits++
  }

  const seen = new Set(
    current.completions.map((done) => completionKey(done.habitId, done.date)),
  )
  const completions = [...current.completions]
  for (const done of incoming.completions) {
    const habitId = remap.get(done.habitId)
    if (!habitId) continue
    const id = completionKey(habitId, done.date)
    if (seen.has(id)) continue
    seen.add(id)
    completions.push({ habitId, date: done.date })
  }

  return {
    habits: reindex(habits),
    completions,
    addedHabits,
    addedCompletions: completions.length - current.completions.length,
  }
}

function fileBlob(file: HabitFile): Blob {
  return new Blob([serializeFile(file)], { type: 'application/json' })
}

/** Déclenche le téléchargement du fichier. Aucun réseau : un Blob local. */
export function downloadFile(file: HabitFile, filename = exportFilename()): void {
  const url = URL.createObjectURL(fileBlob(file))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

/** Envoyer vers : le partage natif quand l'appareil sait recevoir un
 *  fichier, le téléchargement sinon. Le contenu ne quitte l'appareil que
 *  par le geste explicite de l'utilisateur, vers l'application qu'il
 *  choisit — jamais vers un serveur du projet, il n'y en a pas. */
export async function shareFile(
  file: HabitFile,
  filename = exportFilename(),
): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const nav = typeof navigator === 'undefined' ? null : navigator
  if (nav && typeof nav.share === 'function' && typeof File === 'function') {
    const payload = new File([fileBlob(file)], filename, {
      type: 'application/json',
    })
    const canShare = nav.canShare?.({ files: [payload] }) ?? false
    if (canShare) {
      try {
        await nav.share({ files: [payload], title: filename })
        return 'shared'
      } catch (error) {
        // Refus de l'utilisateur : ce n'est pas une panne, on n'enchaîne
        // pas sur un téléchargement qu'il n'a pas demandé.
        if (error instanceof DOMException && error.name === 'AbortError') {
          return 'cancelled'
        }
      }
    }
  }
  downloadFile(file, filename)
  return 'downloaded'
}
