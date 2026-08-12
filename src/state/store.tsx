/** État de l'application : les habitudes, leurs jours cochés, les réglages.
 *  Une seule source, persistée localement à chaque changement.
 *
 *  Le mode exemple ne duplique pas les réglages : il ne remplace que les
 *  données. Le thème choisi depuis la démonstration est donc un vrai
 *  réglage, mais le suivi de l'utilisateur n'est jamais touché. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import {
  archiveHabit,
  moveHabit,
  removeHabit,
  renameHabit,
  restoreHabit,
} from '../lib/habits.ts'
import { mergeFile } from '../lib/io.ts'
import {
  EMPTY_STATE,
  isStorageAvailable,
  loadState,
  saveState,
  toFile,
} from '../lib/storage.ts'
import type { StoredState } from '../lib/storage.ts'
import { sampleState } from '../lib/sample.ts'
import type {
  Completion,
  Habit,
  HabitColor,
  HabitFile,
  Settings,
} from '../lib/types.ts'
import { resolveLang } from '../i18n/index.tsx'
import type { Lang } from '../i18n/index.tsx'

export interface Store {
  habits: Habit[]
  completions: Completion[]
  settings: Settings
  lang: Lang
  /** Mode exemple : rien ne sort de l'onglet. */
  demo: boolean
  storageAvailable: boolean
  file: () => HabitFile
  setCompletions: (completions: Completion[]) => void
  addHabit: (habit: Habit) => void
  renameHabit: (id: string, name: string, color: HabitColor | null) => void
  moveHabit: (id: string, direction: -1 | 1) => void
  archiveHabit: (id: string) => void
  restoreHabit: (id: string) => void
  /** Suppression définitive : l'habitude et tout son historique. */
  deleteHabit: (id: string) => void
  replaceAll: (habits: Habit[], completions: Completion[]) => void
  /** Fusionne et renvoie ce qui a réellement été ajouté. */
  mergeIncoming: (
    habits: Habit[],
    completions: Completion[],
  ) => { habits: number; completions: number }
  eraseAll: () => void
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>(() =>
    typeof window === 'undefined' ? EMPTY_STATE : loadState(),
  )
  const [storageAvailable] = useState(
    () => typeof window !== 'undefined' && isStorageAvailable(),
  )

  // Une seule écriture, au même endroit : impossible d'oublier de persister.
  // Rien n'est écrit à la simple ouverture — seulement quand l'état change.
  const untouched = useRef(true)
  useEffect(() => {
    if (untouched.current) {
      untouched.current = false
      return
    }
    saveState(state)
  }, [state])

  const lang = useMemo(
    () => resolveLang(state.settings.lang),
    [state.settings.lang],
  )

  // Seul le magasin racine touche au document.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    if (state.settings.theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', state.settings.theme)
  }, [lang, state.settings.theme])

  const patchHabits = useCallback((next: (habits: Habit[]) => Habit[]) => {
    setState((s) => ({ ...s, habits: next(s.habits) }))
  }, [])

  const value = useMemo<Store>(
    () => ({
      habits: state.habits,
      completions: state.completions,
      settings: state.settings,
      lang,
      demo: false,
      storageAvailable,
      file: () => toFile(state),
      setCompletions: (completions) =>
        setState((s) => ({ ...s, completions })),
      addHabit: (habit) => patchHabits((habits) => habits.concat([habit])),
      renameHabit: (id, name, color) =>
        patchHabits((habits) => renameHabit(habits, id, name, color)),
      moveHabit: (id, direction) =>
        patchHabits((habits) => moveHabit(habits, id, direction)),
      archiveHabit: (id) => patchHabits((habits) => archiveHabit(habits, id)),
      restoreHabit: (id) => patchHabits((habits) => restoreHabit(habits, id)),
      deleteHabit: (id) =>
        setState((s) => ({ ...s, ...removeHabit(s.habits, s.completions, id) })),
      replaceAll: (habits, completions) =>
        setState((s) => ({ ...s, habits, completions })),
      mergeIncoming: (habits, completions) => {
        const result = mergeFile(
          { habits: state.habits, completions: state.completions },
          { habits, completions },
        )
        setState((s) => ({
          ...s,
          habits: result.habits,
          completions: result.completions,
        }))
        return { habits: result.addedHabits, completions: result.addedCompletions }
      },
      eraseAll: () => setState((s) => ({ ...s, habits: [], completions: [] })),
      setSetting: (key, val) =>
        setState((s) => ({ ...s, settings: { ...s.settings, [key]: val } })),
    }),
    [state, lang, storageAvailable, patchHabits],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

/** Surcouche exemple : mêmes réglages, données en mémoire seulement.
 *  Les noms viennent du dictionnaire — la démonstration parle la langue
 *  de qui la regarde. */
export function DemoStoreProvider({
  names,
  children,
}: {
  names: string[]
  children: ReactNode
}) {
  const parent = useStore()
  const [data, setData] = useState(() => sampleState(names))

  const value = useMemo<Store>(
    () => ({
      ...parent,
      habits: data.habits,
      completions: data.completions,
      demo: true,
      file: () => ({
        schemaVersion: parent.file().schemaVersion,
        data: { habits: data.habits, completions: data.completions },
        settings: parent.settings,
      }),
      setCompletions: (completions) => setData((d) => ({ ...d, completions })),
      addHabit: (habit) =>
        setData((d) => ({ ...d, habits: d.habits.concat([habit]) })),
      renameHabit: (id, name, color) =>
        setData((d) => ({ ...d, habits: renameHabit(d.habits, id, name, color) })),
      moveHabit: (id, direction) =>
        setData((d) => ({ ...d, habits: moveHabit(d.habits, id, direction) })),
      archiveHabit: (id) =>
        setData((d) => ({ ...d, habits: archiveHabit(d.habits, id) })),
      restoreHabit: (id) =>
        setData((d) => ({ ...d, habits: restoreHabit(d.habits, id) })),
      deleteHabit: (id) =>
        setData((d) => removeHabit(d.habits, d.completions, id)),
      replaceAll: (habits, completions) => setData({ habits, completions }),
      mergeIncoming: (habits, completions) => {
        const result = mergeFile(data, { habits, completions })
        setData({ habits: result.habits, completions: result.completions })
        return { habits: result.addedHabits, completions: result.addedCompletions }
      },
      eraseAll: () => setData({ habits: [], completions: [] }),
    }),
    [parent, data],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore doit être utilisé dans un StoreProvider')
  return store
}
