import { describe, expect, it } from 'vitest'
import {
  addDays,
  daysInMonth,
  formatDayRange,
  isISODate,
  isoWeekNumber,
  isoWeekYear,
  parseISODate,
  toISODate,
  weekdayInitial,
} from './format.ts'

describe('toISODate', () => {
  it('lit la date locale, jamais UTC', () => {
    // 23 h le 12 août : toISOString basculerait au 13 dès UTC+2.
    expect(toISODate(new Date(2026, 7, 12, 23, 30))).toBe('2026-08-12')
  })

  it('complète les mois et les jours à deux chiffres', () => {
    expect(toISODate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})

describe('parseISODate', () => {
  it('accepte une date réelle', () => {
    expect(parseISODate('2026-08-12')?.getDate()).toBe(12)
  })

  it('refuse un jour qui n’existe pas', () => {
    expect(parseISODate('2026-02-30')).toBeNull()
    expect(parseISODate('2026-13-01')).toBeNull()
  })

  it('refuse ce qui n’est pas une date', () => {
    expect(parseISODate('hier')).toBeNull()
    expect(parseISODate('')).toBeNull()
    expect(isISODate(12)).toBe(false)
  })
})

describe('addDays', () => {
  it('franchit les mois et les années', () => {
    expect(toISODate(addDays(new Date(2026, 7, 31), 1))).toBe('2026-09-01')
    expect(toISODate(addDays(new Date(2026, 0, 1), -1))).toBe('2025-12-31')
  })

  it('reste sur le même quantième au changement d’heure', () => {
    // Nuit du passage à l'heure d'hiver en Europe : 25 octobre 2026.
    expect(toISODate(addDays(new Date(2026, 9, 24), 1))).toBe('2026-10-25')
    expect(toISODate(addDays(new Date(2026, 9, 25), 1))).toBe('2026-10-26')
  })
})

describe('daysInMonth', () => {
  it('donne la longueur réelle du mois', () => {
    expect(daysInMonth(2026, 1)).toBe(28)
    expect(daysInMonth(2024, 1)).toBe(29)
    expect(daysInMonth(2026, 7)).toBe(31)
  })
})

describe('isoWeekNumber', () => {
  it('numérote la semaine du 12 août 2026 en 33', () => {
    expect(isoWeekNumber('2026-08-12')).toBe(33)
  })

  it('rattache la fin décembre à la semaine 1 de l’année suivante', () => {
    expect(isoWeekNumber('2025-12-31')).toBe(1)
    expect(isoWeekYear('2025-12-31')).toBe(2026)
  })

  it('donne le même numéro à tous les jours d’une semaine', () => {
    const week = ['2026-08-10', '2026-08-13', '2026-08-16'].map(isoWeekNumber)
    expect(new Set(week).size).toBe(1)
  })
})

describe('formats localisés', () => {
  it('donne l’initiale du jour dans la langue demandée', () => {
    expect(weekdayInitial(1, 'fr-FR')).toBe('L')
    expect(weekdayInitial(1, 'en-GB')).toBe('M')
  })

  it('écrit une plage de dates sans répéter le mois', () => {
    const range = formatDayRange('2026-08-10', '2026-08-16', 'fr-FR')
    expect(range).toMatch(/10/)
    expect(range).toMatch(/16/)
    expect(range).toMatch(/août/)
  })
})
