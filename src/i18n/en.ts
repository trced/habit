/** English dictionary — a typed mirror of fr.ts.
 *  A missing or extra key fails the build. */

import type { MessageKey } from './fr.ts'

export const en: Record<MessageKey, string> = {
  // ————— common —————
  'common.brand': 'habit.',
  'common.tagline': 'one thing. done well.',
  'common.close': 'close',
  'common.cancel': 'cancel',
  'common.skipToContent': 'skip to content',

  // ————— app · navigation —————
  'app.nav.home': 'back to the current week',
  'app.nav.settings': 'settings',
  'app.nav.habits': 'habits',
  'app.nav.views': 'Views',
  'app.nav.add': '+ add',
  'app.nav.addLong': '+ add a habit',
  'app.nav.autosave': 'saved automatically',

  // ————— app · example mode —————
  'app.demo.label': 'example',
  'app.demo.note': 'nothing is saved on this device',
  'app.demo.leave': 'open my own',
  'app.demo.habits': 'walk,reading,water,stretch,piano,journal',

  // ————— app · week —————
  'app.week.prevAria': 'previous week',
  'app.week.nextAria': 'next week',
  'app.week.today': 'this week',
  'app.week.backToToday': 'back to this week',
  'app.week.hint': 'back to the week of {date}',
  'app.week.caption': 'week {week} · {year}',
  'app.week.captionYear': '{year}',
  'app.week.captionAway': 'week {week} · back',
  'app.week.captionAwayYear': '{year} · back',
  'app.week.columnHabit': 'habit',
  'app.week.grid': 'Week of {start} to {end}',

  // ————— app · cell —————
  'app.cell.done': '{habit}, {date}, done',
  'app.cell.todo': '{habit}, {date}, not done',

  // ————— app · month summary —————
  'app.summary.heading': '{month} {year}',
  'app.summary.byWeek': '{month} {year} — by week',
  'app.summary.openMonth': 'see the whole month',
  'app.summary.legend':
    'height = days ticked that week · tap a band to open that week',
  'app.summary.legendWide':
    'Height = days ticked that week. Click a band to show that week on the left.',
  'app.summary.current': 'the week on show is in bold',
  'app.summary.bandAria': 'week of {start} to {end}, show',
  'app.summary.bandAriaCurrent': 'week of {start} to {end}, on show',

  // ————— app · whole month —————
  'app.month.title': '{month} {year}',
  'app.month.byDay': '{month} {year} — day by day',
  'app.month.back': 'back to the week',
  'app.month.note': 'opens on today · editable here too',
  'app.month.noteWide':
    'readable and editable · on a phone, behind “see the whole month”',
  'app.month.grid': 'Month of {month} {year}',
  'app.month.prevAria': 'previous month',
  'app.month.nextAria': 'next month',

  // ————— app · empty —————
  'app.empty.title': 'No habits yet.',
  'app.empty.body': 'An empty row, one button. No suggestions imposed.',
  'app.empty.action': 'name the first habit',
  'app.empty.note': 'Already have a habit.json file? Settings → import.',
  'app.empty.rowName': '—',
  'app.empty.allArchived':
    'All your habits are archived. Settings → habits to bring one back.',

  // ————— app · habit sheet —————
  'app.habit.addTitle': 'add a habit',
  'app.habit.editTitle': 'edit a habit',
  'app.habit.name': 'Name',
  'app.habit.namePlaceholder': 'walk',
  'app.habit.nameHint':
    '{max} characters at most · long names are truncated in the grid',
  'app.habit.nameError': 'A name is needed.',
  'app.habit.nameTaken': 'A habit already goes by that name.',
  'app.habit.color': 'Colour — optional',
  'app.habit.colorNote': 'The grid reads without it.',
  'app.habit.colorAria': '{name} colour',
  'app.habit.color.none': 'none',
  'app.habit.color.moss': 'moss',
  'app.habit.color.slate': 'slate',
  'app.habit.color.sand': 'sand',
  'app.habit.color.clay': 'clay',
  'app.habit.add': 'add',
  'app.habit.save': 'save',

  // ————— app · manage habits —————
  'app.manage.title': 'habits',
  'app.manage.note': 'Order is a display choice: it changes no past data.',
  'app.manage.up': 'move {name} up',
  'app.manage.down': 'move {name} down',
  'app.manage.rename': 'rename {name}',
  'app.manage.archive': 'archive',
  'app.manage.archiveAria': 'archive {name}',
  'app.manage.empty': 'No habits being tracked.',
  'app.manage.archived.one': 'archived — {n} · history is kept',
  'app.manage.archived.other': 'archived — {n} · history is kept',
  'app.manage.restore': 'restore',
  'app.manage.restoreAria': 'restore {name}',
  'app.manage.delete': 'delete',
  'app.manage.deleteAria': 'delete {name}',
  'app.manage.deleteNote':
    'Deleting also erases the history, and asks for confirmation.',
  'app.manage.deleteAsk': 'Delete {name}?',
  'app.manage.deleteBody.one':
    'Its history — {n} day ticked — will be erased. Archiving keeps it.',
  'app.manage.deleteBody.other':
    'Its history — {n} days ticked — will be erased. Archiving keeps it.',
  'app.manage.deleteConfirm': 'delete for good',

  // ————— app · settings —————
  'app.settings.title': 'settings',
  'app.settings.display': 'display',
  'app.settings.data': 'data — local, never sent',
  'app.settings.about': 'about',
  'app.settings.cycleAria': '{name}: {value}, change',
  'app.settings.displayNote':
    'Each row cycles its values. The change applies straight away.',

  'app.settings.theme': 'theme',
  'app.settings.theme.system': 'system',
  'app.settings.theme.light': 'light',
  'app.settings.theme.dark': 'dark',

  'app.settings.lang': 'language',
  'app.settings.lang.system': 'system',
  'app.settings.lang.fr': 'français',
  'app.settings.lang.en': 'english',

  'app.settings.firstDay': 'first day',
  'app.settings.firstDay.monday': 'monday',
  'app.settings.firstDay.sunday': 'sunday',

  'app.settings.colors': 'habit colours',
  'app.settings.colors.shown': 'shown',
  'app.settings.colors.hidden': 'hidden',

  'app.settings.weekends': 'mark weekends',
  'app.settings.weekends.distinct': 'yes',
  'app.settings.weekends.plain': 'no',

  'app.settings.summary': 'month summary',
  'app.settings.summary.shown': 'shown',
  'app.settings.summary.hidden': 'hidden',

  'app.settings.habits': 'habits',
  'app.settings.habitsValue.one': '{n} tracked',
  'app.settings.habitsValue.other': '{n} tracked',

  'app.settings.export': 'export',
  'app.settings.exportValue': '{file}',
  'app.settings.send': 'send to',
  'app.settings.sendValue': 'share the file',
  'app.settings.import': 'import',
  'app.settings.importValue': 'choose a file',
  'app.settings.importNote':
    'Import checks the schema and warns before any replacement.',
  'app.settings.importFound.one': '{file} — {n} habit',
  'app.settings.importFound.other': '{file} — {n} habits',
  'app.settings.importExplainEmpty':
    'Yours is empty: merging and replacing come to the same thing.',
  'app.settings.importExplain.one':
    'Merging adds what is missing to your habit; replacing erases yours.',
  'app.settings.importExplain.other':
    'Merging adds what is missing to your {n} habits; replacing erases them.',
  'app.settings.merge': 'merge',
  'app.settings.replace': 'replace',

  'app.settings.erase': 'erase everything',
  'app.settings.eraseValue.one': '{n} habit',
  'app.settings.eraseValue.other': '{n} habits',
  'app.settings.eraseAsk.one': 'Erase {n} habit and its history?',
  'app.settings.eraseAsk.other': 'Erase {n} habits and their history?',
  'app.settings.eraseBody':
    'This cannot be undone. Export first if you want to keep a trace.',
  'app.settings.eraseConfirm': 'erase everything',

  'app.settings.storageNote.one':
    '{n} habit saved on this device, and nowhere else.',
  'app.settings.storageNote.other':
    '{n} habits saved on this device, and nowhere else.',
  'app.settings.storageUnavailable':
    'This browser refuses local storage: the session works, but nothing will be found again next time. Export still works.',

  'app.settings.aboutApp': 'about',
  'app.settings.aboutValue': 'what habit. does',
  'app.settings.changelog': 'changelog',
  'app.settings.changelogValue': 'read',
  'app.settings.version': 'version',
  'app.settings.legal': 'legal and privacy',
  'app.settings.read': 'read',
  'app.settings.licence': 'licence',
  'app.settings.source': 'source code',
  'app.settings.sourceValue': 'github',
  'app.settings.offline': 'offline · installable',

  // ————— app · import —————
  'app.import.errorTitle': 'This file could not be read.',
  'app.import.errorUnreadable':
    'The contents are not JSON. Choose the habit.json file exported from the app.',
  'app.import.errorSchema':
    'The file is JSON, but not a habit export. Check it is the one you meant.',
  'app.import.errorVersion':
    'This file comes from another version of the format. Export it again from the app that produced it.',
  'app.import.errorEmpty': 'The file holds no habit to import.',
  'app.import.retry': 'choose another file',

  // ————— app · passing confirmations —————
  'app.flash.added': '{name} added',
  'app.flash.saved': '{name} saved',
  'app.flash.archived': '{name} archived',
  'app.flash.restored': '{name} restored',
  'app.flash.deleted': '{name} deleted',
  'app.flash.exported.one': '{n} habit exported',
  'app.flash.exported.other': '{n} habits exported',
  'app.flash.shared': 'file sent',
  'app.flash.imported.one': '{n} habit imported',
  'app.flash.imported.other': '{n} habits imported',
  'app.flash.importedNone': 'it was all there already',
  'app.flash.importedDays.one': '{n} day added',
  'app.flash.importedDays.other': '{n} days added',
  'app.flash.replaced.one': '{n} habit in place',
  'app.flash.replaced.other': '{n} habits in place',
  'app.flash.erased': 'everything erased',

  // ————— site · frame —————
  'site.nav.home': 'overview',
  'site.nav.about': 'about',
  'site.nav.changelog': 'changelog',
  'site.nav.app': 'open the app',
  'site.nav.source': 'source code',
  'site.nav.lang': 'FR',
  'site.nav.langAria': 'passer en français',
  'site.footer.project': 'project',
  'site.footer.repo': 'repository',
  'site.footer.releases': 'releases',
  'site.footer.issues': 'report an issue',
  'site.footer.about': 'about',
  'site.footer.changelog': 'changelog',
  'site.footer.licence': 'licence',
  'site.footer.licenceName': 'AGPL-3.0-or-later',
  'site.footer.contribute': 'contribute',
  'site.footer.licenceNote':
    'Open source. Any modified version made available must be too.',
  'site.footer.legal': 'legal',
  'site.footer.terms': 'terms of use',
  'site.footer.privacy': 'privacy',
  'site.footer.notice': 'legal notice',
  'site.footer.contact': 'contact',
  'site.footer.version': 'version {version}',

  // ————— site · home —————
  'site.home.metaTitle': 'habit. — one week, one grid',
  'site.home.metaDescription':
    'habit. answers a single question: what did I keep up this week? A local, offline habit tracker with no account.',
  'site.home.title': 'One week. One grid.',
  'site.home.lede':
    'habit. answers a single question: what did I keep up this week? Seven columns, one row per habit, a dot when it is done. Nothing to configure, nothing to win.',
  'site.home.cta': 'open the app',
  'site.home.ctaNote': 'no account — the app opens straight away',
  'site.home.demo': 'see a filled example',
  'site.home.demoNote': 'nothing is saved on your device',
  'site.home.previewCaption': 'The real app, with an example of six habits.',
  'site.home.app': 'the app',
  'site.home.appBody':
    'This is not a screenshot: it is the app, with an example of six habits. Tick, change week, open the settings — nothing you do here is saved.',
  'site.home.appHint.week': 'tapping a cell ticks or unticks it',
  'site.home.appHint.summary': 'tapping a band shows that week',
  'site.home.appHint.month': '“see the whole month” opens the day by day',
  'site.home.appHint.settings': 'settings change the theme and the language',
  'site.home.ready': 'Ready to start?',
  'site.home.readyNote': 'One habit is enough. You can add more later.',
  'site.home.start': 'open the app',

  'site.home.loop': 'the loop',
  'site.home.loop.define': 'name',
  'site.home.loop.defineBody': 'a habit, a word. The colour is optional.',
  'site.home.loop.check': 'tick',
  'site.home.loop.checkBody': 'one gesture a day per habit. Nothing to confirm.',
  'site.home.loop.look': 'look',
  'site.home.loop.lookBody':
    'the week in front of you, the month below it, in bands.',

  'site.home.rules': 'what habit. does not do',
  'site.home.rule.streak': 'no streak to keep unbroken',
  'site.home.rule.score': 'no percentage, no score',
  'site.home.rule.badge': 'no badge, no reward',
  'site.home.rule.notify': 'no notification, no reminder',
  'site.home.rule.account': 'no account, no sync',
  'site.home.rule.track': 'no tracker, no advertising',
  'site.home.rulesNote':
    'A day left unticked is not a failure. It is a day left unticked.',

  'site.home.facts': 'in short',
  'site.home.fact.unit': 'unit',
  'site.home.fact.unitValue': 'one habit, one day, ticked or not',
  'site.home.fact.views': 'views',
  'site.home.fact.viewsValue': 'the week · the month in bands · the whole month',
  'site.home.fact.data': 'data',
  'site.home.fact.dataValue': 'on your device, JSON export and import',
  'site.home.fact.langs': 'languages',
  'site.home.fact.langsValue': 'French, English, or the one your system asks for',
  'site.home.fact.install': 'install',
  'site.home.fact.installValue': 'progressive web app, offline once loaded',
  'site.home.fact.licence': 'licence',
  'site.home.fact.licenceValue': 'AGPL-3.0-or-later, open source',

  // ————— site · about —————
  'site.about.metaTitle': 'about — habit.',
  'site.about.metaDescription':
    'Why habit. stays a grid and turns down streaks, scores and notifications.',
  'site.about.title': 'About',
  'site.about.lede':
    'habit. belongs to a family of micro-apps, each answering one question and one only.',
  'site.about.whyTitle': 'Why the week',
  'site.about.whyBody':
    'A thirty-one-day month does not fit on a phone without shrinking every cell to a three-pixel dot, or scrolling the grid sideways — in which case you never see the whole of it. A week always fits: seven columns, whatever the number of habits. The month is not lost for that, it is read below, one band per week, and opens in full on demand.',
  'site.about.noTitle': 'What was left out',
  'site.about.noBody':
    'Streaks, percentages and badges turn a habit into a debt. You end up ticking to keep the chain unbroken rather than for the habit itself, and the day the chain breaks, you drop everything. habit. shows the month as it is. An empty day stays an empty day.',
  'site.about.dataTitle': 'Your data',
  'site.about.dataBody':
    'Everything is kept in your browser’s local storage. There is no server, no account, no sync — so there is nothing to intercept. The habit.json file you export holds everything the app knows about you, and you can read it in a text editor.',
  'site.about.familyTitle': 'The family',
  'site.about.familyBody':
    'Same design system, same principles: monospace, right angles, no illustration, no emoji. What matters is what is written.',
  'site.about.openTitle': 'Open source',
  'site.about.openBody':
    'habit. is published under the AGPL-3.0-or-later licence. The code can be read, modified and redistributed; any modified version made available to others must be too.',
  'site.about.contact': 'write',

  // ————— site · changelog —————
  'site.changelog.metaTitle': 'changelog — habit.',
  'site.changelog.metaDescription':
    'What changed in habit., version by version.',
  'site.changelog.title': 'Changelog',
  'site.changelog.lede':
    'Each version and what it brings. Published entries are never rewritten.',
  'site.changelog.type.added': 'added',
  'site.changelog.type.changed': 'changed',
  'site.changelog.type.fixed': 'fixed',
  'site.changelog.type.performance': 'performance',

  // ————— site · legal —————
  'site.legal.terms.metaTitle': 'terms of use — habit.',
  'site.legal.terms.metaDescription':
    'The terms of use for habit.: free software provided as is, with no account and no remote service.',
  'site.legal.terms.title': 'Terms of use',
  'site.legal.terms.updated': 'Last updated: {date}',
  'site.legal.terms.serviceTitle': 'What you are using',
  'site.legal.terms.serviceBody':
    'habit. is software that runs entirely in your browser. There is no account, no subscription, no remote service: nothing is transmitted, so there is nothing to rent and nothing to cancel.',
  'site.legal.terms.dataTitle': 'Your data is yours',
  'site.legal.terms.dataBody':
    'Your habits are kept in your browser’s local storage. Clearing the site data deletes them for good. Export the habit.json file regularly if you care about your history: nobody else holds a copy.',
  'site.legal.terms.warrantyTitle': 'No warranty',
  'site.legal.terms.warrantyBody':
    'The software is provided “as is”, without warranty of any kind, to the extent permitted by law. The authors cannot be held liable for any loss of data, whatever the cause.',
  'site.legal.terms.licenceTitle': 'Licence',
  'site.legal.terms.licenceBody':
    'habit. is distributed under the GNU AGPL version 3 or later. You may use, study, modify and redistribute it under the terms of that licence.',

  'site.legal.privacy.metaTitle': 'privacy — habit.',
  'site.legal.privacy.metaDescription':
    'habit. collects no data: no account, no server, no tracker, no analytics.',
  'site.legal.privacy.title': 'Privacy',
  'site.legal.privacy.updated': 'Last updated: {date}',
  'site.legal.privacy.shortTitle': 'In one sentence',
  'site.legal.privacy.shortBody':
    'habit. collects nothing, sends nothing and sets no tracker.',
  'site.legal.privacy.collectTitle': 'What is collected',
  'site.legal.privacy.collectBody':
    'Nothing. No account, no identifier, no address, no analytics, no advertising cookie. The app makes no network request in use: once the page is loaded, it works offline.',
  'site.legal.privacy.storedTitle': 'What is stored, and where',
  'site.legal.privacy.storedBody':
    'Your habits, your ticked days and your settings, in your browser’s local storage, on your device. That data only leaves the device if you export the file yourself.',
  'site.legal.privacy.hostTitle': 'Hosting',
  'site.legal.privacy.hostBody':
    'The app files are served by a static host, which may keep technical connection logs for the security of its service. Those logs are neither used nor consulted by the project.',
  'site.legal.privacy.rightsTitle': 'Your rights',
  'site.legal.privacy.rightsBody':
    'Since no personal data is collected by the project, there is nothing to request and nothing to have deleted. You keep control of your data at all times: Settings → export, or erase everything.',

  'site.legal.notice.metaTitle': 'legal notice — habit.',
  'site.legal.notice.metaDescription': 'Publisher, hosting and licence of habit.',
  'site.legal.notice.title': 'Legal notice',
  'site.legal.notice.editorTitle': 'Publisher',
  'site.legal.notice.editorBody':
    'habit. is a free software project, published by its authors with no commercial structure. Contact: {contact}.',
  'site.legal.notice.hostTitle': 'Hosting',
  'site.legal.notice.hostBody':
    'The site is published as a set of static files. The chosen host holds no database for the project.',
  'site.legal.notice.propertyTitle': 'Intellectual property',
  'site.legal.notice.propertyBody':
    'The source code is available under the AGPL-3.0-or-later licence. The data you enter stays yours and is never sent to the project.',

  // ————— site · not found —————
  'site.notfound.metaTitle': 'page not found — habit.',
  'site.notfound.metaDescription': 'This address matches no page.',
  // ————— update —————
  'update.available': 'A new version is ready.',
  'update.action': 'reload',

  'site.notfound.title': 'This page does not exist.',
  'site.notfound.body':
    'The address may be incomplete, or the page has been taken down.',
  'site.notfound.action': 'back to the overview',
}
