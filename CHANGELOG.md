# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-08-17

### Added

- A new version offers itself instead of imposing itself. Once it is downloaded, a banner says so and waits: the page reloads on click, never in the middle of typing

### Changed

- JetBrains Mono now ships with the app: two weights, two Latin subsets. The typeface no longer depends on what the machine happens to have installed, and the system stack stays behind it, for the loading window and for what those subsets do not cover
- Body text follows the trced. scale: fluid from 14 px to 15 px rather than a fixed 15 px, which gives the whole family the same reading density. The other steps (data, label, meta) do not move
- The "famille ." reference is published as 1.2.0 and describes what is actually shipped: right angles, fluid scales, layout tokens, the component variants, and whatever is not implemented declared as such

### Fixed

- An installed app never received a single update. Nothing asked the service worker again once the page was open, and the host served `sw.js` from its own cache: the published version simply did not arrive. The worker now waits to be handed over, returning to the app and an hourly check ask for it again, and the host revalidates `sw.js`, `index.html` and the manifest
- A multi-line field announces its error the way a single-line one does: `aria-invalid`, the message in `role="alert"`, and the field pointing at its error when there is one and at its hint otherwise
- The gap between two habit rows stays aligned with the row it separates. Its key column read a copied width, which drifted as soon as a list redefined its own

## [0.1.0] - 2026-08-12

### Added

- The app: the week is the page. Seven day columns, one row per habit, a binary cell at the crossing: a middle dot when nothing is done, a full dot when it is. Adding a habit lengthens the grid, never narrows it, and the week view never scrolls sideways
- The month in bands below the week: one band per calendar week, four stroke heights for the share of days ticked. Tapping a band shows that week above. No figure, no percentage. A reading, not a score. The bands are real calendar weeks rather than slices of seven days from the 1st, so the band you tap opens the week it describes
- The month day by day, editable too: on a phone behind "see the whole month", with the habit column staying put while scrolling and an opening set on today; on a wide screen, always shown below the week, at 36 px cells that are fine with a mouse and never offered to a finger
- Habits: create, rename, reorder, archive. Renaming keeps the whole history, archiving keeps it while taking the row out of the tracker, and only deleting for good — behind a confirmation stating how many days are at stake — erases occurrences
- An optional colour per habit, out of four: it helps to find your row, never to understand the state. The grid reads the same without it, and a setting hides it
- Settings: light, dark or system theme; French, English or system language; week starting on Monday or Sunday; colours shown or hidden; weekends marked or not; month summary shown or hidden. Each row cycles its values on click, and the change applies straight away
- Export and import of the `habit.json` file, with a choice between merging and replacing, and a full erase behind an explicit confirmation. Merging attaches habits of the same name and never overwrites an already ticked cell; a malformed habit is dropped on its own rather than failing the whole import
- "Send to": the device's native share when it can take a file, a download otherwise. The file only leaves the device through that gesture, towards the app you pick. The project has no server to receive it
- Installable, offline-capable progressive web app: everything is precached on download, and there is no network request in use
- Presentation site in French and English: home page with the real app embedded, about page, terms of use, privacy, legal notice and changelog
- Example mode reachable from the overview: the app filled with six habits over eight weeks, computed from today, writing nothing to the device
- The "famille ." 1.1.0 design system as CSS tokens: colour, typography, space, shape, motion, and the shared components (button, text field, setting row, sheet, period navigation, feedback)
- Accessibility: the grid is a real table, with its row and column headers; every cell is a toggle button named in full: "walk, 12 August 2026, done"; keyboard navigation throughout, arrows change week, `T` returns to the current one, `Escape` closes any sheet, focus is trapped in dialogs and restored on close. Colour is never the only carrier: weekends dim and keep their day initial, today is underlined rather than tinted
- Unit tests over the pure layer — dates, weeks and month bands, density, habit operations, import, merge, storage — and integration tests of the real user paths

[0.1.1]: https://github.com/trced/habit/releases/tag/v0.1.1
[0.1.0]: https://github.com/trced/habit/releases/tag/v0.1.0
