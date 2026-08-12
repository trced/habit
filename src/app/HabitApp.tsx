/** habit. — l'application. Une semaine, son mois en résumé, et le mois
 *  entier quand on le demande. Rien d'autre : elle répond à « qu'est-ce
 *  que j'ai tenu cette semaine ? ».
 *
 *  Une logique, trois mises en page :
 *  — téléphone : une colonne. La semaine, puis le mois en bandes ; le mois
 *    jour par jour est une vue à part, derrière un lien ;
 *  — tablette  : la même colonne, plus aérée, les destinations en barre haute ;
 *  — large     : la semaine à gauche, le mois en bandes à droite, et le mois
 *    jour par jour dessous — plus rien à ouvrir, tout est là.
 *
 *  Sept colonnes quel que soit le nombre d'habitudes : ajouter une habitude
 *  allonge la grille, ne la rétrécit jamais. */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/Button.tsx'
import { EmptyState } from '../components/Feedback.tsx'
import { PeriodNav } from '../components/PeriodNav.tsx'
import { useI18n } from '../i18n/index.tsx'
import {
  addDays,
  formatDate,
  formatDayRange,
  isoWeekNumber,
  isoWeekYear,
  monthName,
  parseISODate,
  todayISO,
  toISODate,
} from '../lib/format.ts'
import {
  activeHabits,
  completionSet,
  createHabit,
  toggleCompletion,
} from '../lib/habits.ts'
import type { Habit } from '../lib/types.ts'
import { monthBands, monthDays, startOfWeekISO, weekDays } from '../lib/week.ts'
import { useStore } from '../state/store.tsx'
import { useMediaQuery } from './useMediaQuery.ts'
import { HabitGrid } from './views/HabitGrid.tsx'
import { MonthSummary } from './views/MonthSummary.tsx'
import { HabitSheet } from './sheets/HabitSheet.tsx'
import { ManageSheet } from './sheets/ManageSheet.tsx'
import { SettingsSheet } from './sheets/SettingsSheet.tsx'

const FLASH_MS = 3000

/** Au-delà, les destinations quittent la ligne du titre pour une barre. */
const HAS_BAR = '(min-width: 640px)'

/** Au-delà, la semaine et le mois tiennent côte à côte : plus rien à ouvrir. */
const WIDE = '(min-width: 1100px)'

/** Le mois de rattachement d'une semaine : celui de son quatrième jour.
 *  Une semaine à cheval appartient au mois où elle a le plus de jours. */
function anchorMonth(weekStart: string): { year: number; month: number } {
  const middle = parseISODate(weekStart)
  const date = middle ? addDays(middle, 3) : new Date()
  return { year: date.getFullYear(), month: date.getMonth() }
}

/** « 03–09 » — la plage d'une semaine, en quantièmes seuls. */
function shortRange(startISO: string): string {
  const days = weekDays(startISO)
  const first = days[0]
  const last = days[days.length - 1]
  if (!first || !last) return ''
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${pad(first.day)}–${pad(last.day)}`
}

interface Editing {
  habit: Habit | null
}

export function HabitApp({ embedded = false }: { embedded?: boolean }) {
  const { t, locale } = useI18n()
  const store = useStore()
  const root = useRef<HTMLDivElement>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // L'encart de la page de présentation fait 390 px de large dans une fenêtre
  // qui en fait mille : il garde la coque du téléphone, c'est ce qu'il montre.
  const hasBar = useMediaQuery(HAS_BAR) && !embedded
  const wide = useMediaQuery(WIDE) && !embedded

  const { firstDay } = store.settings
  const today = useMemo(() => todayISO(), [])

  const [weekStart, setWeekStart] = useState(() =>
    startOfWeekISO(today, firstDay),
  )
  const [anchor, setAnchor] = useState(() => anchorMonth(weekStart))
  const [monthOpen, setMonthOpen] = useState(false)
  const [editing, setEditing] = useState<Editing | null>(null)
  const [manageOpen, setManageOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [flash, setFlash] = useState('')

  const showFlash = useCallback((message: string) => {
    clearTimeout(flashTimer.current)
    setFlash(message)
    flashTimer.current = setTimeout(() => setFlash(''), FLASH_MS)
  }, [])

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  // Changer de premier jour de la semaine ne doit pas laisser la grille sur
  // un début de semaine qui n'en est plus un.
  useEffect(() => {
    setWeekStart((current) => startOfWeekISO(current, firstDay))
  }, [firstDay])

  useEffect(() => {
    if (embedded) return
    document.title = `${t('common.brand')} — ${t('site.home.title')}`
  }, [embedded, t])

  // Sur deux colonnes le mois est déjà là : la vue qui le montrait seule
  // n'a plus lieu d'être, sinon elle recouvrirait ce qui est déjà visible.
  useEffect(() => {
    if (wide) setMonthOpen(false)
  }, [wide])

  const goWeek = useCallback(
    (startISO: string, keepAnchor = false) => {
      setWeekStart(startISO)
      if (keepAnchor) return
      // La semaine reste dans le mois affiché tant qu'elle le touche ;
      // sinon le résumé suit, plutôt que de parler d'un autre mois.
      setAnchor((current) => {
        const touches = weekDays(startISO).some(
          (day) =>
            day.iso.slice(0, 7) ===
            `${current.year}-${String(current.month + 1).padStart(2, '0')}`,
        )
        return touches ? current : anchorMonth(startISO)
      })
    },
    [],
  )

  const shift = useCallback(
    (step: number) => {
      const date = parseISODate(weekStart)
      if (date) goWeek(toISODate(addDays(date, step * 7)))
    },
    [weekStart, goWeek],
  )

  const goToday = useCallback(() => {
    const start = startOfWeekISO(todayISO(), firstDay)
    setWeekStart(start)
    setAnchor(anchorMonth(start))
    setMonthOpen(false)
  }, [firstDay])

  // Raccourcis clavier — actifs seulement quand le focus est dans l'app,
  // et jamais par-dessus une feuille modale ou un champ de saisie.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!root.current?.contains(document.activeElement)) return
      if (settingsOpen || manageOpen || editing) return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      ) {
        return
      }
      if (event.key.toLowerCase() === 't') goToday()
      else if (event.key === 'ArrowLeft') shift(-1)
      else if (event.key === 'ArrowRight') shift(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [settingsOpen, manageOpen, editing, goToday, shift])

  // Passer d'une vue à l'autre repart du haut : on ne reprend pas la
  // lecture d'un mois à la hauteur où l'on avait laissé la semaine.
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = 0
  }, [monthOpen])

  const habits = useMemo(() => activeHabits(store.habits), [store.habits])
  const done = useMemo(
    () => completionSet(store.completions),
    [store.completions],
  )
  const days = useMemo(() => weekDays(weekStart), [weekStart])
  const bands = useMemo(
    () => monthBands(anchor.year, anchor.month, firstDay),
    [anchor, firstDay],
  )
  const monthGridDays = useMemo(
    () => monthDays(anchor.year, anchor.month),
    [anchor],
  )

  const currentWeek = startOfWeekISO(today, firstDay)
  const atToday = weekStart === currentWeek
  const first = days[0]
  const last = days[days.length - 1]
  const rangeTitle =
    first && last ? formatDayRange(first.iso, last.iso, locale) : weekStart
  const month = `${monthName(anchor.month, locale)} ${anchor.year}`

  // Le numéro ISO n'est défini que pour des semaines qui commencent le
  // lundi : en semaine dimanche, la légende ne porte que l'année plutôt
  // qu'un numéro qui aurait l'air juste sans l'être.
  const week = firstDay === 'monday' ? isoWeekNumber(weekStart) : null
  const year = (firstDay === 'monday' ? isoWeekYear(weekStart) : null) ?? anchor.year
  const caption = atToday
    ? week === null
      ? t('app.week.captionYear', { year })
      : t('app.week.caption', { week, year })
    : week === null
      ? t('app.week.captionAwayYear', { year })
      : t('app.week.captionAway', { week })

  const hasHabits = habits.length > 0
  const allArchived = !hasHabits && store.habits.length > 0

  const toggle = (habitId: string, date: string): void => {
    store.setCompletions(toggleCompletion(store.completions, habitId, date))
  }

  const saveHabit = (name: string, color: Habit['color']): void => {
    const target = editing?.habit
    if (target) {
      store.renameHabit(target.id, name, color)
      showFlash(t('app.flash.saved', { name }))
    } else {
      store.addHabit(createHabit(store.habits, name, color))
      showFlash(t('app.flash.added', { name }))
    }
    setEditing(null)
  }

  const weekPane = (
    <section className="pane" aria-label={t('app.week.grid', {
      start: first ? formatDate(first.iso, locale) : '',
      end: last ? formatDate(last.iso, locale) : '',
    })}>
      <PeriodNav
        title={rangeTitle}
        prevLabel={shortRange(
          toISODate(addDays(parseISODate(weekStart) ?? new Date(), -7)),
        )}
        nextLabel={shortRange(
          toISODate(addDays(parseISODate(weekStart) ?? new Date(), 7)),
        )}
        prevAria={t('app.week.prevAria')}
        nextAria={t('app.week.nextAria')}
        caption={caption}
        captionHint={t('app.week.hint', {
          date: formatDate(currentWeek, locale),
        })}
        onPrev={() => shift(-1)}
        onNext={() => shift(1)}
        onToday={goToday}
      />

      {hasHabits ? (
        <div className="pane__grid">
          <HabitGrid
            habits={habits}
            days={days}
            done={done}
            today={today}
            caption={t('app.week.grid', {
              start: first ? formatDate(first.iso, locale) : '',
              end: last ? formatDate(last.iso, locale) : '',
            })}
            columnLabel={t('app.week.columnHabit')}
            layout="fill"
            markWeekends={store.settings.weekends === 'distinct'}
            showColors={store.settings.colors === 'shown'}
            onToggle={toggle}
          />
          <div className="pane__actions">
            <Button onClick={() => setEditing({ habit: null })}>
              {hasBar ? t('app.nav.addLong') : t('app.nav.add')}
            </Button>
            <span className="pane__note" role="status">
              {flash || t('app.nav.autosave')}
            </span>
          </div>
        </div>
      ) : (
        <EmptyState
          title={t('app.empty.title')}
          body={allArchived ? t('app.empty.allArchived') : t('app.empty.body')}
          note={t('app.empty.note')}
          action={
            <Button variant="primary" onClick={() => setEditing({ habit: null })}>
              {t('app.empty.action')}
            </Button>
          }
        />
      )}
    </section>
  )

  const summaryPane =
    store.settings.summary === 'hidden' || !hasHabits ? null : (
      <section className="pane" aria-label={t('app.summary.byWeek', { month: monthName(anchor.month, locale), year: anchor.year })}>
        <div className="pane__head">
          <span className="pane__title">
            {wide
              ? t('app.summary.byWeek', {
                  month: monthName(anchor.month, locale),
                  year: anchor.year,
                })
              : month}
          </span>
          {wide ? (
            <span className="t-meta t-dim">{t('app.summary.current')}</span>
          ) : (
            <Button variant="quiet" onClick={() => setMonthOpen(true)}>
              {t('app.summary.openMonth')}
            </Button>
          )}
        </div>
        <MonthSummary
          habits={habits}
          bands={bands}
          done={done}
          currentWeek={weekStart}
          showColors={store.settings.colors === 'shown'}
          onOpenWeek={(startISO) => goWeek(startISO, true)}
        />
        <p className="pane__legend">
          {wide ? t('app.summary.legendWide') : t('app.summary.legend')}
        </p>
      </section>
    )

  const monthPane = !hasHabits ? null : (
    <section className="pane" aria-label={t('app.month.grid', { month: monthName(anchor.month, locale), year: anchor.year })}>
      <div className="pane__head">
        <span className="pane__title">
          {wide
            ? t('app.month.byDay', {
                month: monthName(anchor.month, locale),
                year: anchor.year,
              })
            : month}
        </span>
        {wide ? (
          <span className="t-meta t-dim">{t('app.month.noteWide')}</span>
        ) : (
          <Button variant="quiet" onClick={() => setMonthOpen(false)}>
            {t('app.month.back')}
          </Button>
        )}
      </div>
      <HabitGrid
        habits={habits}
        days={monthGridDays}
        done={done}
        today={today}
        caption={t('app.month.grid', {
          month: monthName(anchor.month, locale),
          year: anchor.year,
        })}
        columnLabel={t('app.week.columnHabit')}
        layout="fixed"
        markWeekends={store.settings.weekends === 'distinct'}
        showColors={store.settings.colors === 'shown'}
        scrollToToday={!wide}
        onToggle={toggle}
      />
      {wide ? null : <p className="pane__legend">{t('app.month.note')}</p>}
    </section>
  )

  return (
    <div
      ref={root}
      className={`app ${embedded ? 'app--embedded' : 'app--page'}${
        wide ? ' app--wide' : ''
      }`}
    >
      {store.demo && !embedded ? (
        <div className="app__demo">
          <span>
            {t('app.demo.label')} — {t('app.demo.note')}
          </span>
          <Link className="t-meta" to="/app">
            {t('app.demo.leave')}
          </Link>
        </div>
      ) : null}

      <div className="app__head">
        <div className="app__topline">
          <button
            type="button"
            className="app__brand"
            aria-label={t('app.nav.home')}
            onClick={goToday}
          >
            {t('common.brand')}
          </button>
          <nav className="app__tabs" aria-label={t('app.nav.views')}>
            {hasBar ? (
              <button
                type="button"
                className="app__tab"
                onClick={() => setManageOpen(true)}
              >
                {t('app.nav.habits')}
              </button>
            ) : null}
            <button
              type="button"
              className="app__tab"
              onClick={() => setSettingsOpen(true)}
            >
              {t('app.nav.settings')}
            </button>
          </nav>
        </div>
      </div>

      <div ref={scroll} className="app__scroll">
        {monthOpen && !wide ? (
          monthPane
        ) : wide ? (
          <div className="app__layout">
            <div className="app__col">{weekPane}</div>
            <div className="app__col">{summaryPane}</div>
            <div className="app__full">{monthPane}</div>
          </div>
        ) : (
          <>
            {weekPane}
            {summaryPane}
          </>
        )}
      </div>

      {editing ? (
        <HabitSheet
          habit={editing.habit}
          habits={store.habits}
          onClose={() => setEditing(null)}
          onSave={saveHabit}
        />
      ) : null}

      {manageOpen ? (
        <ManageSheet
          onClose={() => setManageOpen(false)}
          onEdit={(habit) => {
            setManageOpen(false)
            setEditing({ habit })
          }}
          onAdd={() => {
            setManageOpen(false)
            setEditing({ habit: null })
          }}
          onFlash={showFlash}
        />
      ) : null}

      {settingsOpen ? (
        <SettingsSheet
          onClose={() => setSettingsOpen(false)}
          onManage={() => {
            setSettingsOpen(false)
            setManageOpen(true)
          }}
          onFlash={showFlash}
        />
      ) : null}
    </div>
  )
}
