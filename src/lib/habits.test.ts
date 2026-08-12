import { describe, expect, it } from 'vitest'
import {
  activeHabits,
  archiveHabit,
  archivedHabits,
  completionSet,
  countDone,
  createHabit,
  moveHabit,
  normaliseName,
  removeHabit,
  renameHabit,
  restoreHabit,
  toggleCompletion,
} from './habits.ts'
import type { Completion, Habit } from './types.ts'

function habit(id: string, position: number, archivedAt: string | null = null): Habit {
  return {
    id,
    name: id,
    color: null,
    position,
    createdAt: '2026-01-01',
    archivedAt,
  }
}

const HABITS: Habit[] = [habit('run', 0), habit('read', 1), habit('gym', 2)]

describe('normaliseName', () => {
  it('réduit les espaces et coupe à vingt-quatre caractères', () => {
    expect(normaliseName('  course   du   matin  ')).toBe('course du matin')
    expect(normaliseName('a'.repeat(40))).toHaveLength(24)
  })
})

describe('toggleCompletion', () => {
  it('coche un jour vide', () => {
    const next = toggleCompletion([], 'run', '2026-08-12')
    expect(next).toEqual([{ habitId: 'run', date: '2026-08-12' }])
  })

  it('décoche un jour déjà coché', () => {
    const done: Completion[] = [{ habitId: 'run', date: '2026-08-12' }]
    expect(toggleCompletion(done, 'run', '2026-08-12')).toEqual([])
  })

  it('ne touche pas aux autres jours ni aux autres habitudes', () => {
    const done: Completion[] = [
      { habitId: 'run', date: '2026-08-11' },
      { habitId: 'read', date: '2026-08-12' },
    ]
    expect(toggleCompletion(done, 'run', '2026-08-12')).toHaveLength(3)
  })

  it('efface les doublons d’un même jour', () => {
    const done: Completion[] = [
      { habitId: 'run', date: '2026-08-12' },
      { habitId: 'run', date: '2026-08-12' },
    ]
    expect(toggleCompletion(done, 'run', '2026-08-12')).toEqual([])
  })
})

describe('countDone', () => {
  it('compte les jours cochés d’une plage', () => {
    const set = completionSet([
      { habitId: 'run', date: '2026-08-10' },
      { habitId: 'run', date: '2026-08-12' },
      { habitId: 'read', date: '2026-08-11' },
    ])
    const week = ['2026-08-10', '2026-08-11', '2026-08-12']
    expect(countDone(set, 'run', week)).toBe(2)
    expect(countDone(set, 'gym', week)).toBe(0)
  })
})

describe('ordre et archivage', () => {
  it('sort les actives dans l’ordre des positions', () => {
    expect(activeHabits(HABITS).map((h) => h.id)).toEqual(['run', 'read', 'gym'])
  })

  it('descend une habitude d’un rang', () => {
    const moved = moveHabit(HABITS, 'run', 1)
    expect(activeHabits(moved).map((h) => h.id)).toEqual(['read', 'run', 'gym'])
  })

  it('ne fait rien au-delà des bords', () => {
    expect(moveHabit(HABITS, 'run', -1)).toBe(HABITS)
    expect(moveHabit(HABITS, 'gym', 1)).toBe(HABITS)
  })

  it('ignore les archivées dans le déplacement', () => {
    const mixed = [...HABITS, habit('yoga', 3, '2026-08-01')]
    const moved = moveHabit(mixed, 'gym', -1)
    expect(activeHabits(moved).map((h) => h.id)).toEqual(['run', 'gym', 'read'])
    expect(archivedHabits(moved).map((h) => h.id)).toEqual(['yoga'])
  })

  it('retire une archivée du suivi sans toucher à son historique', () => {
    const done: Completion[] = [{ habitId: 'run', date: '2026-08-12' }]
    const archived = archiveHabit(HABITS, 'run')
    expect(activeHabits(archived).map((h) => h.id)).toEqual(['read', 'gym'])
    expect(archivedHabits(archived).map((h) => h.id)).toEqual(['run'])
    expect(done).toHaveLength(1)
  })

  it('remet une restaurée en fin de suivi', () => {
    const restored = restoreHabit(archiveHabit(HABITS, 'run'), 'run')
    expect(activeHabits(restored).map((h) => h.id)).toEqual([
      'read',
      'gym',
      'run',
    ])
  })
})

describe('renameHabit', () => {
  it('garde l’identifiant, donc l’historique', () => {
    const renamed = renameHabit(HABITS, 'run', 'course à pied', 'moss')
    const target = renamed.find((h) => h.id === 'run')
    expect(target?.name).toBe('course à pied')
    expect(target?.color).toBe('moss')
  })
})

describe('removeHabit', () => {
  it('efface l’habitude et toutes ses occurrences', () => {
    const done: Completion[] = [
      { habitId: 'run', date: '2026-08-12' },
      { habitId: 'read', date: '2026-08-12' },
    ]
    const result = removeHabit(HABITS, done, 'run')
    expect(result.habits.map((h) => h.id)).toEqual(['read', 'gym'])
    expect(result.completions).toEqual([{ habitId: 'read', date: '2026-08-12' }])
  })

  it('laisse des positions sans trou', () => {
    const result = removeHabit(HABITS, [], 'read')
    expect(result.habits.map((h) => h.position)).toEqual([0, 1])
  })
})

describe('createHabit', () => {
  it('prend le rang suivant et aucune couleur par défaut', () => {
    const created = createHabit(HABITS, '  eau  ', null)
    expect(created.name).toBe('eau')
    expect(created.position).toBe(3)
    expect(created.color).toBeNull()
    expect(created.archivedAt).toBeNull()
  })
})
