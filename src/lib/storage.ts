/** Persistance locale. Une seule clé, le même format que le fichier
 *  d'export : ce qui est lu par l'application est ce qui en sort.
 *
 *  localStorage plutôt qu'IndexedDB : dix habitudes cochées tous les jours
 *  pendant un an tiennent dans quelques centaines de kilo-octets, l'API est
 *  synchrone — donc aucun écran d'attente au démarrage — et le format reste
 *  celui du fichier d'export, lisible à l'œil nu. */

import { parseFile } from './io.ts'
import { DEFAULT_SETTINGS, SCHEMA_VERSION } from './types.ts'
import type { Completion, Habit, HabitFile, Settings } from './types.ts'

export const STORAGE_KEY = 'habit.v1'

export interface StoredState {
  habits: Habit[]
  completions: Completion[]
  settings: Settings
}

export const EMPTY_STATE: StoredState = {
  habits: [],
  completions: [],
  settings: DEFAULT_SETTINGS,
}

/** Le stockage peut être refusé (mode privé, quota, iframe cloisonnée).
 *  On échoue en lecture seule plutôt que de casser l'application. */
function storage(): Storage | null {
  try {
    const s = window.localStorage
    const probe = '__habit_probe__'
    s.setItem(probe, '1')
    s.removeItem(probe)
    return s
  } catch {
    return null
  }
}

export function loadState(): StoredState {
  const s = storage()
  if (!s) return EMPTY_STATE
  const raw = s.getItem(STORAGE_KEY)
  if (!raw) return EMPTY_STATE
  const parsed = parseFile(raw)
  if (!parsed.ok) return EMPTY_STATE
  return {
    habits: parsed.file.data.habits,
    completions: parsed.file.data.completions,
    settings: { ...DEFAULT_SETTINGS, ...parsed.file.settings },
  }
}

export function toFile(state: StoredState): HabitFile {
  return {
    schemaVersion: SCHEMA_VERSION,
    data: { habits: state.habits, completions: state.completions },
    settings: state.settings,
  }
}

export function saveState(state: StoredState): void {
  const s = storage()
  if (!s) return
  try {
    s.setItem(STORAGE_KEY, JSON.stringify(toFile(state)))
  } catch {
    // Quota atteint : la session continue, l'export reste possible.
  }
}

export function isStorageAvailable(): boolean {
  return storage() !== null
}

/** Un suivi déjà commencé. Sert à décider, au démarrage, si « / » doit
 *  ouvrir l'application plutôt que la page de présentation.
 *
 *  Passe par loadState : un fichier illisible compte comme suivi vide, ce
 *  qui est la réponse prudente — on montre la présentation plutôt que
 *  d'envoyer sur une application qu'on n'a pas su relire. */
export function hasHabits(): boolean {
  return loadState().habits.length > 0
}
