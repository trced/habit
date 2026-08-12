import type { ChangelogVersion } from './types.ts'

/** Les entrées les plus récentes en premier. Jamais de réécriture d'un
 *  historique déjà publié — voir le skill /release. */
export const changelogVersions: ChangelogVersion[] = [
  {
    version: '0.1.0',
    date: '2026-08-12',
    changes: {
      added: [
        {
          text: "L'application : la semaine est la page. Sept colonnes de jours, une ligne par habitude, une case binaire à l'intersection — un point médian quand rien n'est fait, un point plein quand c'est fait. Ajouter une habitude allonge la grille, ne la rétrécit jamais",
          textEn:
            'The app: the week is the page. Seven day columns, one row per habit, a binary cell at the crossing — a middle dot when nothing is done, a full dot when it is. Adding a habit lengthens the grid, never narrows it',
          category: 'Application',
          categoryEn: 'App',
        },
        {
          text: "Le mois en bandes sous la semaine : une bande par semaine calendaire, quatre hauteurs de trait selon la part de jours cochés. Toucher une bande affiche cette semaine. Aucun chiffre, aucun pourcentage — une lecture, pas un score",
          textEn:
            'The month in bands below the week: one band per calendar week, four stroke heights for the share of days ticked. Tapping a band shows that week. No figure, no percentage — a reading, not a score',
          category: 'Application',
          categoryEn: 'App',
        },
        {
          text: "Le mois jour par jour, modifiable lui aussi : sur téléphone derrière « voir le mois entier », avec la colonne des habitudes qui reste en place pendant le défilement et une ouverture calée sur aujourd'hui ; sur grand écran, affiché en permanence sous la semaine",
          textEn:
            'The month day by day, editable too: on a phone behind “see the whole month”, with the habit column staying put while scrolling and an opening set on today; on a wide screen, always shown below the week',
          category: 'Application',
          categoryEn: 'App',
        },
        {
          text: 'Habitudes : créer, renommer, réordonner, archiver. Renommer garde tout son historique, archiver le conserve en retirant la ligne du suivi, et seule la suppression définitive — derrière une confirmation qui dit combien de jours sont en jeu — efface des occurrences',
          textEn:
            'Habits: create, rename, reorder, archive. Renaming keeps the whole history, archiving keeps it while taking the row out of the tracker, and only deleting for good — behind a confirmation stating how many days are at stake — erases occurrences',
          category: 'Application',
          categoryEn: 'App',
        },
        {
          text: "Une couleur facultative par habitude, parmi quatre : elle aide à retrouver sa ligne, jamais à comprendre l'état. La grille se lit à l'identique sans elle, et un réglage la masque",
          textEn:
            'An optional colour per habit, out of four: it helps to find your row, never to understand the state. The grid reads the same without it, and a setting hides it',
          category: 'Application',
          categoryEn: 'App',
        },
        {
          text: 'Réglages : thème clair, sombre ou système ; langue française, anglaise ou système ; premier jour de la semaine lundi ou dimanche ; couleurs affichées ou masquées ; week-ends distingués ou non ; résumé mensuel affiché ou masqué. Chaque ligne défile ses valeurs au clic',
          textEn:
            'Settings: light, dark or system theme; French, English or system language; week starting on Monday or Sunday; colours shown or hidden; weekends marked or not; month summary shown or hidden. Each row cycles its values on click',
          category: 'Application',
          categoryEn: 'App',
        },
        {
          text: "Export et import du fichier habit.json, avec le choix entre fusionner et remplacer, et un effacement complet derrière une confirmation explicite. La fusion rattache les habitudes de même nom et n'écrase jamais une case déjà cochée ; une habitude mal formée est écartée seule plutôt que de faire échouer tout l'import",
          textEn:
            'Export and import of the habit.json file, with a choice between merging and replacing, and a full erase behind an explicit confirmation. Merging attaches habits of the same name and never overwrites an already ticked cell; a malformed habit is dropped on its own rather than failing the whole import',
          category: 'Données',
          categoryEn: 'Data',
        },
        {
          text: "« Envoyer vers » : le partage natif de l'appareil quand il sait recevoir un fichier, le téléchargement sinon. Le fichier ne quitte l'appareil que par ce geste, vers l'application choisie — le projet n'a pas de serveur pour le recevoir",
          textEn:
            '“Send to”: the device’s native share when it can take a file, a download otherwise. The file only leaves the device through that gesture, towards the app you pick — the project has no server to receive it',
          category: 'Données',
          categoryEn: 'Data',
        },
        {
          text: 'Application web installable et hors ligne : tout est précaché au téléchargement, et il n’y a aucune requête réseau à l’usage',
          textEn:
            'Installable, offline-capable web app: everything is precached on download, and there is no network request in use',
          category: 'Plateforme',
          categoryEn: 'Platform',
        },
        {
          text: "Site de présentation en français et en anglais : accueil avec l'application réelle embarquée, page à propos, conditions d'utilisation, confidentialité, mentions légales et journal des changements",
          textEn:
            'Presentation site in French and English: home page with the real app embedded, about page, terms of use, privacy, legal notice and changelog',
          category: 'Site',
          categoryEn: 'Site',
        },
        {
          text: "Mode exemple accessible depuis la présentation : l'application remplie de six habitudes sur huit semaines, sans rien écrire sur l'appareil",
          textEn:
            'Example mode reachable from the overview: the app filled with six habits over eight weeks, writing nothing to the device',
          category: 'Site',
          categoryEn: 'Site',
        },
        {
          text: "Le design system « famille . » 1.1.0 en tokens CSS : couleur, typographie, espace, forme, mouvement, et les composants partagés — bouton, champ, ligne de réglage, feuille, navigation de période",
          textEn:
            'The “famille .” 1.1.0 design system as CSS tokens: colour, typography, space, shape, motion, and the shared components — button, field, setting row, sheet, period navigation',
          category: 'Design',
          categoryEn: 'Design',
        },
        {
          text: "Accessibilité : la grille est un vrai tableau, avec ses en-têtes de ligne et de colonne ; chaque case est un bouton à état, nommé « marche, 12 août 2026, effectué » ; navigation au clavier de bout en bout, flèches pour changer de semaine, « T » pour revenir à celle en cours, Échap pour refermer une feuille, focus piégé dans les dialogues et rendu à la fermeture",
          textEn:
            'Accessibility: the grid is a real table, with its row and column headers; every cell is a toggle button, named “walk, 12 August 2026, done”; keyboard navigation throughout, arrows change week, “T” returns to the current one, Escape closes any sheet, and focus is trapped in dialogs and restored on close',
          category: 'Accessibilité',
          categoryEn: 'Accessibility',
        },
        {
          text: "Tests unitaires de la couche pure — dates, semaines et bandes du mois, densité, opérations sur les habitudes, import, fusion, stockage — et tests d'intégration des vrais parcours",
          textEn:
            'Unit tests over the pure layer — dates, weeks and month bands, density, habit operations, import, merge, storage — and integration tests of the real user paths',
          category: 'Qualité',
          categoryEn: 'Quality',
        },
      ],
    },
  },
]
