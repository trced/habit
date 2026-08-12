import { describe, expect, it } from 'vitest'
import { toISODate } from './format.ts'
import {
  densityGlyph,
  densityLevel,
  monthBands,
  monthDays,
  startOfWeek,
  startOfWeekISO,
  weekDays,
} from './week.ts'

describe('startOfWeek', () => {
  it('remonte au lundi', () => {
    // 12 août 2026 est un mercredi.
    expect(toISODate(startOfWeek(new Date(2026, 7, 12), 'monday'))).toBe(
      '2026-08-10',
    )
  })

  it('remonte au dimanche quand c’est le réglage', () => {
    expect(toISODate(startOfWeek(new Date(2026, 7, 12), 'sunday'))).toBe(
      '2026-08-09',
    )
  })

  it('ne bouge pas un jour déjà premier de sa semaine', () => {
    expect(startOfWeekISO('2026-08-10', 'monday')).toBe('2026-08-10')
  })
})

describe('weekDays', () => {
  it('rend sept jours consécutifs', () => {
    const days = weekDays('2026-08-10')
    expect(days).toHaveLength(7)
    expect(days.map((d) => d.day)).toEqual([10, 11, 12, 13, 14, 15, 16])
  })

  it('marque samedi et dimanche', () => {
    const days = weekDays('2026-08-10')
    expect(days.filter((d) => d.weekend).map((d) => d.day)).toEqual([15, 16])
  })

  it('franchit un changement de mois', () => {
    const days = weekDays('2026-07-27')
    expect(days.map((d) => d.iso).at(-1)).toBe('2026-08-02')
  })
})

describe('monthDays', () => {
  it('couvre le mois entier', () => {
    const days = monthDays(2026, 7)
    expect(days).toHaveLength(31)
    expect(days[0]?.iso).toBe('2026-08-01')
    expect(days.at(-1)?.iso).toBe('2026-08-31')
  })
})

describe('monthBands', () => {
  const bands = monthBands(2026, 7, 'monday')

  it('découpe le mois en vraies semaines calendaires', () => {
    // Août 2026 commence un samedi : la première bande n'a que deux jours.
    expect(bands.map((b) => b.label)).toEqual([
      '01–02',
      '03–09',
      '10–16',
      '17–23',
      '24–30',
      '31',
    ])
  })

  it('fait partir chaque bande d’un premier jour de semaine', () => {
    expect(bands.map((b) => b.startISO)).toEqual([
      '2026-07-27',
      '2026-08-03',
      '2026-08-10',
      '2026-08-17',
      '2026-08-24',
      '2026-08-31',
    ])
  })

  it('ne compte que les jours du mois affiché', () => {
    expect(bands[0]?.days).toEqual(['2026-08-01', '2026-08-02'])
    expect(bands.flatMap((b) => b.days)).toHaveLength(31)
  })

  it('suit le réglage du premier jour de la semaine', () => {
    const sunday = monthBands(2026, 7, 'sunday')
    expect(sunday[0]?.startISO).toBe('2026-07-26')
    expect(sunday[0]?.label).toBe('01')
  })

  it('permet d’ouvrir la semaine que la bande décrit', () => {
    // La bande qui contient le 12 août démarre bien la semaine affichée.
    const band = bands.find((b) => b.days.includes('2026-08-12'))
    expect(band?.startISO).toBe(startOfWeekISO('2026-08-12', 'monday'))
  })
})

describe('densité', () => {
  it('reste vide quand rien n’est coché', () => {
    expect(densityLevel(0, 7)).toBe(0)
    expect(densityGlyph(0, 7)).toBe('·')
  })

  it('monte par tiers', () => {
    expect(densityLevel(2, 7)).toBe(1)
    expect(densityLevel(4, 7)).toBe(2)
    expect(densityLevel(7, 7)).toBe(3)
  })

  it('juge une bande courte sur sa propre longueur', () => {
    // Deux jours sur deux, c'est une bande pleine — pas un début de semaine.
    expect(densityLevel(2, 2)).toBe(3)
  })

  it('ne divise jamais par zéro', () => {
    expect(densityLevel(0, 0)).toBe(0)
  })
})
