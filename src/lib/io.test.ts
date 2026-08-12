import { describe, expect, it } from 'vitest'
import { exportFilename, mergeFile, parseFile, serializeFile } from './io.ts'
import { SCHEMA_VERSION } from './types.ts'
import type { Completion, Habit, HabitFile } from './types.ts'

function file(
  habits: unknown[],
  completions: unknown[] = [],
  overrides: Record<string, unknown> = {},
): string {
  return JSON.stringify({
    schemaVersion: SCHEMA_VERSION,
    data: { habits, completions },
    settings: {},
    ...overrides,
  })
}

const HABIT = {
  id: 'run',
  name: 'run',
  color: 'moss',
  position: 0,
  createdAt: '2026-01-01',
  archivedAt: null,
}

describe('parseFile', () => {
  it('lit un fichier conforme', () => {
    const result = parseFile(file([HABIT], [{ habitId: 'run', date: '2026-08-12' }]))
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.file.data.habits).toHaveLength(1)
    expect(result.file.data.completions).toEqual([
      { habitId: 'run', date: '2026-08-12' },
    ])
  })

  it('refuse ce qui n’est pas du JSON', () => {
    expect(parseFile('{')).toEqual({ ok: false, reason: 'unreadable' })
  })

  it('refuse une autre version de schéma', () => {
    const result = parseFile(file([HABIT], [], { schemaVersion: 99 }))
    expect(result).toEqual({ ok: false, reason: 'version' })
  })

  it('refuse un fichier sans habitudes', () => {
    expect(parseFile(JSON.stringify({ schemaVersion: 1 }))).toEqual({
      ok: false,
      reason: 'schema',
    })
  })

  it('écarte une habitude cassée sans perdre les autres', () => {
    const result = parseFile(file([HABIT, { name: '   ' }, null]))
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.file.data.habits.map((h) => h.name)).toEqual(['run'])
  })

  it('écarte une occurrence orpheline ou mal datée', () => {
    const result = parseFile(
      file(
        [HABIT],
        [
          { habitId: 'inconnu', date: '2026-08-12' },
          { habitId: 'run', date: '2026-02-30' },
          { habitId: 'run', date: '2026-08-12' },
          { habitId: 'run', date: '2026-08-12' },
        ],
      ),
    )
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.file.data.completions).toEqual([
      { habitId: 'run', date: '2026-08-12' },
    ])
  })

  it('ne garde qu’un réglage qu’il connaît', () => {
    const result = parseFile(
      file([HABIT], [], { settings: { theme: 'dark', unit: 'km' } }),
    )
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.file.settings).toEqual({ theme: 'dark' })
  })

  it('relit ce qu’il vient d’écrire', () => {
    const source: HabitFile = {
      schemaVersion: SCHEMA_VERSION,
      data: {
        habits: [HABIT as Habit],
        completions: [{ habitId: 'run', date: '2026-08-12' }],
      },
      settings: { theme: 'dark' },
    }
    const result = parseFile(serializeFile(source))
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.file).toEqual(source)
  })
})

describe('mergeFile', () => {
  const current = {
    habits: [HABIT as Habit],
    completions: [{ habitId: 'run', date: '2026-08-10' }] as Completion[],
  }

  it('rattache une habitude de même nom à celle déjà là', () => {
    const result = mergeFile(current, {
      habits: [{ ...HABIT, id: 'autre-appareil' } as Habit],
      completions: [{ habitId: 'autre-appareil', date: '2026-08-11' }],
    })
    expect(result.addedHabits).toBe(0)
    expect(result.habits).toHaveLength(1)
    expect(result.completions).toEqual([
      { habitId: 'run', date: '2026-08-10' },
      { habitId: 'run', date: '2026-08-11' },
    ])
  })

  it('n’écrase jamais une case déjà cochée', () => {
    const result = mergeFile(current, {
      habits: [{ ...HABIT, id: 'autre' } as Habit],
      completions: [{ habitId: 'autre', date: '2026-08-10' }],
    })
    expect(result.addedCompletions).toBe(0)
    expect(result.completions).toHaveLength(1)
  })

  it('ajoute une habitude inconnue à la suite', () => {
    const result = mergeFile(current, {
      habits: [{ ...HABIT, id: 'x', name: 'gym', position: 0 } as Habit],
      completions: [{ habitId: 'x', date: '2026-08-12' }],
    })
    expect(result.addedHabits).toBe(1)
    expect(result.habits.map((h) => h.name)).toEqual(['run', 'gym'])
    expect(result.habits.map((h) => h.position)).toEqual([0, 1])
    expect(result.addedCompletions).toBe(1)
  })
})

describe('exportFilename', () => {
  it('porte le jour de l’export', () => {
    expect(exportFilename('2026-08-12')).toBe('habit-2026-08-12.json')
  })
})
