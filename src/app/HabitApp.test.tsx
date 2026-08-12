/** Parcours réels : cocher, ajouter, naviguer, archiver.
 *  Le test passe par l'interface, jamais par le magasin. */

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { HabitApp } from './HabitApp.tsx'
import { I18nProvider } from '../i18n/index.tsx'
import { STORAGE_KEY, toFile } from '../lib/storage.ts'
import type { StoredState } from '../lib/storage.ts'
import { DEFAULT_SETTINGS } from '../lib/types.ts'
import type { Completion, Habit } from '../lib/types.ts'
import { StoreProvider, useStore } from '../state/store.tsx'

/** Mercredi 12 août 2026 : la semaine du 10 au 16, la semaine 33. */
const TODAY = new Date(2026, 7, 12, 10, 0, 0)

function habit(id: string, name: string, position: number): Habit {
  return {
    id,
    name,
    color: null,
    position,
    createdAt: '2026-08-01',
    archivedAt: null,
  }
}

const HABITS: Habit[] = [
  habit('walk', 'marche', 0),
  habit('read', 'lecture', 1),
]

function seed(habits: Habit[], completions: Completion[] = []): void {
  const state: StoredState = {
    habits,
    completions,
    // Langue fixée : sans cela le test suivrait celle du navigateur simulé.
    settings: { ...DEFAULT_SETTINGS, lang: 'fr' },
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toFile(state)))
}

function Localised({ children }: { children: ReactNode }) {
  const { lang } = useStore()
  return <I18nProvider lang={lang}>{children}</I18nProvider>
}

function renderApp() {
  return render(
    <StoreProvider>
      <Localised>
        <MemoryRouter>
          <HabitApp />
        </MemoryRouter>
      </Localised>
    </StoreProvider>,
  )
}

function stored(): StoredState {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}').data
}

describe('HabitApp', () => {
  beforeEach(() => {
    // Seule Date est simulée : les délais du composant restent réels, donc
    // userEvent n'a pas à piloter les minuteries.
    vi.useFakeTimers({ now: TODAY, toFake: ['Date'] })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('ouvre sur la semaine courante et ses sept jours', () => {
    seed(HABITS)
    renderApp()

    expect(screen.getByText('semaine 33 · 2026')).toBeInTheDocument()
    const grid = screen.getByRole('table', { name: /semaine du/i })
    // Sept jours plus la colonne des habitudes.
    expect(within(grid).getAllByRole('columnheader')).toHaveLength(8)
    expect(
      within(grid).getByRole('rowheader', { name: 'marche' }),
    ).toBeInTheDocument()
  })

  it('coche une case en un geste et l’enregistre aussitôt', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    const cell = screen.getByRole('button', {
      name: 'marche, 12 août 2026, non effectué',
    })
    expect(cell).toHaveAttribute('aria-pressed', 'false')

    await user.click(cell)

    expect(
      screen.getByRole('button', { name: 'marche, 12 août 2026, effectué' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(stored().completions).toEqual([
      { habitId: 'walk', date: '2026-08-12' },
    ])
  })

  it('décoche la même case au geste suivant', async () => {
    const user = userEvent.setup()
    seed(HABITS, [{ habitId: 'walk', date: '2026-08-12' }])
    renderApp()

    await user.click(
      screen.getByRole('button', { name: 'marche, 12 août 2026, effectué' }),
    )

    expect(stored().completions).toEqual([])
  })

  it('ne touche à aucune autre case', async () => {
    const user = userEvent.setup()
    seed(HABITS, [
      { habitId: 'read', date: '2026-08-12' },
      { habitId: 'walk', date: '2026-08-11' },
    ])
    renderApp()

    await user.click(
      screen.getByRole('button', { name: 'marche, 12 août 2026, non effectué' }),
    )

    expect(stored().completions).toHaveLength(3)
  })

  it('change de semaine et revient à celle en cours', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(screen.getByRole('button', { name: 'semaine précédente' }))
    expect(screen.getByText('semaine 32 · revenir')).toBeInTheDocument()

    // Le titre est le retour à la semaine courante.
    await user.click(screen.getByText('3–9 août'))
    expect(screen.getByText('semaine 33 · 2026')).toBeInTheDocument()
  })

  it('change de semaine au clavier', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(
      screen.getByRole('button', { name: 'marche, 12 août 2026, non effectué' }),
    )
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('semaine 34 · revenir')).toBeInTheDocument()

    await user.keyboard('t')
    expect(screen.getByText('semaine 33 · 2026')).toBeInTheDocument()
  })

  it('affiche le mois en bandes et ouvre la semaine d’une bande', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(
      screen.getByRole('button', {
        name: /semaine du 3 août 2026 au 9 août 2026/,
      }),
    )

    expect(screen.getByText('3–9 août')).toBeInTheDocument()
    // Le mois affiché ne bouge pas : la bande décrit août, on reste en août.
    expect(screen.getByText('août 2026')).toBeInTheDocument()
  })

  it('propose de nommer la première habitude quand il n’y en a aucune', async () => {
    const user = userEvent.setup()
    seed([])
    renderApp()

    await user.click(
      screen.getByRole('button', { name: 'nommer la première habitude' }),
    )
    await user.type(screen.getByLabelText('Nom'), 'eau')
    await user.click(screen.getByRole('button', { name: 'ajouter' }))

    expect(
      screen.getByRole('rowheader', { name: 'eau' }),
    ).toBeInTheDocument()
    expect(stored().habits).toHaveLength(1)
    expect(stored().habits[0]?.name).toBe('eau')
  })

  it('refuse deux habitudes du même nom', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(screen.getByRole('button', { name: '+ ajouter' }))
    await user.type(screen.getByLabelText('Nom'), 'Marche')
    await user.click(screen.getByRole('button', { name: 'ajouter' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Une habitude porte déjà ce nom.',
    )
    expect(stored().habits).toHaveLength(2)
  })

  it('archive une habitude sans perdre son historique', async () => {
    const user = userEvent.setup()
    seed(HABITS, [{ habitId: 'walk', date: '2026-08-12' }])
    renderApp()

    await user.click(screen.getByRole('button', { name: 'paramètres' }))
    await user.click(screen.getByRole('button', { name: /^habitudes/ }))
    await user.click(screen.getByRole('button', { name: 'archiver marche' }))

    expect(
      screen.getByRole('button', { name: 'restaurer marche' }),
    ).toBeInTheDocument()
    expect(stored().completions).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'fermer' }))
    expect(screen.queryByRole('rowheader', { name: 'marche' })).toBeNull()
  })

  it('demande confirmation avant de supprimer, et dit ce qui sera perdu', async () => {
    const user = userEvent.setup()
    seed(
      [{ ...habit('walk', 'marche', 0), archivedAt: '2026-08-11' }],
      [{ habitId: 'walk', date: '2026-08-10' }],
    )
    renderApp()

    await user.click(screen.getByRole('button', { name: 'paramètres' }))
    await user.click(screen.getByRole('button', { name: /^habitudes/ }))
    await user.click(screen.getByRole('button', { name: 'supprimer marche' }))

    expect(
      screen.getByText(/1 jour coché — sera effacé/),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'supprimer définitivement' }),
    )
    expect(stored().habits).toHaveLength(0)
    expect(stored().completions).toHaveLength(0)
  })

  it('offre le code source depuis son interface, comme l’AGPL le demande', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(screen.getByRole('button', { name: 'paramètres' }))

    expect(
      screen.getByRole('link', { name: /code source/ }).getAttribute('href'),
    ).toBe('https://github.com/trced/habit')
    // Le texte livré avec le programme, pas la page de la FSF : c'est la
    // copie qui accompagne ce logiciel-là qui fait foi.
    expect(
      screen.getByRole('link', { name: /licence/ }).getAttribute('href'),
    ).toBe('https://github.com/trced/habit/blob/main/LICENSE')
  })

  it('applique un réglage immédiatement', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(screen.getByRole('button', { name: 'paramètres' }))
    await user.click(
      screen.getByRole('button', { name: 'résumé mensuel : affiché, changer' }),
    )
    await user.click(screen.getByRole('button', { name: 'fermer' }))

    expect(screen.queryByText('voir le mois entier')).toBeNull()
  })

  it('ouvre le mois entier et le referme', async () => {
    const user = userEvent.setup()
    seed(HABITS)
    renderApp()

    await user.click(screen.getByRole('button', { name: 'voir le mois entier' }))
    const month = screen.getByRole('table', { name: /Mois de août 2026/i })
    // Trente et un jours plus la colonne des habitudes.
    expect(within(month).getAllByRole('columnheader')).toHaveLength(32)

    await user.click(screen.getByRole('button', { name: 'retour à la semaine' }))
    expect(screen.getByRole('table', { name: /semaine du/i })).toBeInTheDocument()
  })
})
