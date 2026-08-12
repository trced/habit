import { beforeEach, describe, expect, it } from 'vitest'
import {
  EMPTY_STATE,
  STORAGE_KEY,
  hasHabits,
  loadState,
  saveState,
  toFile,
} from './storage.ts'
import { DEFAULT_SETTINGS } from './types.ts'
import type { StoredState } from './storage.ts'

const STATE: StoredState = {
  habits: [
    {
      id: 'run',
      name: 'run',
      color: null,
      position: 0,
      createdAt: '2026-01-01',
      archivedAt: null,
    },
  ],
  completions: [{ habitId: 'run', date: '2026-08-12' }],
  settings: { ...DEFAULT_SETTINGS, theme: 'dark' },
}

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('rend un état vide quand rien n’est enregistré', () => {
    expect(loadState()).toEqual(EMPTY_STATE)
    expect(hasHabits()).toBe(false)
  })

  it('relit exactement ce qu’il a écrit', () => {
    saveState(STATE)
    expect(loadState()).toEqual(STATE)
    expect(hasHabits()).toBe(true)
  })

  it('écrit le format du fichier d’export, pas un autre', () => {
    saveState(STATE)
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(raw).toEqual(toFile(STATE))
  })

  it('repart de zéro plutôt que de planter sur un contenu illisible', () => {
    localStorage.setItem(STORAGE_KEY, 'ceci n’est pas du JSON')
    expect(loadState()).toEqual(EMPTY_STATE)
    expect(hasHabits()).toBe(false)
  })

  it('complète les réglages absents par leur valeur par défaut', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        data: { habits: STATE.habits, completions: [] },
        settings: { theme: 'light' },
      }),
    )
    expect(loadState().settings).toEqual({
      ...DEFAULT_SETTINGS,
      theme: 'light',
    })
  })
})
