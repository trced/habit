/** Dictionnaire français — référence. en.ts en est le miroir typé :
 *  une clé manquante ou en trop échoue à la compilation.
 *  Convention de clé : domaine.composant.clé. */

export const fr = {
  // ————— commun —————
  'common.brand': 'habit.',
  'common.tagline': 'une chose. bien faite.',
  'common.close': 'fermer',
  'common.cancel': 'annuler',
  'common.skipToContent': 'aller au contenu',

  // ————— application · navigation —————
  'app.nav.home': "revenir à la semaine en cours",
  'app.nav.settings': 'réglages',
  'app.nav.habits': 'habitudes',
  'app.nav.views': 'Vues',
  'app.nav.add': '+ ajouter',
  'app.nav.addLong': '+ ajouter une habitude',
  'app.nav.autosave': 'enregistré automatiquement',

  // ————— application · mode exemple —————
  'app.demo.label': 'exemple',
  'app.demo.note': "rien n'est enregistré sur cet appareil",
  'app.demo.leave': 'ouvrir mon suivi',
  // Les habitudes de la démonstration : des mots courants, rien de prescrit.
  'app.demo.habits': 'marche,lecture,eau,étirements,piano,journal',

  // ————— application · semaine —————
  'app.week.prevAria': 'semaine précédente',
  'app.week.nextAria': 'semaine suivante',
  'app.week.today': 'cette semaine',
  'app.week.backToToday': 'revenir à cette semaine',
  'app.week.hint': 'revenir à la semaine du {date}',
  // Le numéro ISO ne vaut que pour une semaine qui commence le lundi ; en
  // semaine dimanche, la légende ne porte que l'année plutôt qu'un numéro faux.
  'app.week.caption': 'semaine {week} · {year}',
  'app.week.captionYear': '{year}',
  // Hors semaine courante, la légende garde le repère et offre la sortie,
  // sur une seule ligne : rien ne se décale d'une semaine à l'autre.
  'app.week.captionAway': 'semaine {week} · revenir',
  'app.week.captionAwayYear': '{year} · revenir',
  'app.week.columnHabit': 'habitude',
  'app.week.grid': 'Semaine du {start} au {end}',

  // ————— application · cellule —————
  // « marche, 12 août 2026, effectué » — le nom accessible dit tout ce que
  // le point montre, et rien de plus.
  'app.cell.done': '{habit}, {date}, effectué',
  'app.cell.todo': '{habit}, {date}, non effectué',

  // ————— application · résumé du mois —————
  'app.summary.heading': '{month} {year}',
  'app.summary.byWeek': '{month} {year} — par semaine',
  'app.summary.openMonth': 'voir le mois entier',
  'app.summary.legend':
    'hauteur = jours cochés dans la semaine · toucher une bande ouvre cette semaine',
  'app.summary.legendWide':
    'Hauteur = jours cochés dans la semaine. Cliquer une bande affiche cette semaine à gauche.',
  'app.summary.current': 'la semaine affichée est en gras',
  'app.summary.bandAria': 'semaine du {start} au {end}, afficher',
  'app.summary.bandAriaCurrent': 'semaine du {start} au {end}, affichée',

  // ————— application · mois entier —————
  'app.month.title': '{month} {year}',
  'app.month.byDay': '{month} {year} — jour par jour',
  'app.month.back': 'retour à la semaine',
  'app.month.note': "ouverture calée sur aujourd'hui · modifiable ici aussi",
  'app.month.noteWide':
    'consultable et modifiable · sur mobile, derrière « voir le mois entier »',
  'app.month.grid': 'Mois de {month} {year}',
  'app.month.prevAria': 'mois précédent',
  'app.month.nextAria': 'mois suivant',

  // ————— application · état vide —————
  'app.empty.title': 'Aucune habitude.',
  'app.empty.body': 'Une ligne vide, un bouton. Aucune suggestion imposée.',
  'app.empty.action': 'nommer la première habitude',
  'app.empty.note': 'Vous avez déjà un fichier habit.json ? Réglages → importer.',
  'app.empty.rowName': '—',
  'app.empty.allArchived':
    'Toutes vos habitudes sont archivées. Réglages → habitudes pour en restaurer une.',

  // ————— application · feuille habitude —————
  'app.habit.addTitle': 'ajouter une habitude',
  'app.habit.editTitle': 'modifier une habitude',
  'app.habit.name': 'Nom',
  'app.habit.namePlaceholder': 'marche',
  'app.habit.nameHint':
    '{max} caractères maximum · les noms longs sont tronqués dans la grille',
  'app.habit.nameError': 'Un nom est nécessaire.',
  'app.habit.nameTaken': 'Une habitude porte déjà ce nom.',
  'app.habit.color': 'Couleur — facultative',
  'app.habit.colorNote': 'La grille se lit sans elle.',
  'app.habit.colorAria': 'couleur {name}',
  'app.habit.color.none': 'aucune',
  'app.habit.color.moss': 'mousse',
  'app.habit.color.slate': 'ardoise',
  'app.habit.color.sand': 'sable',
  'app.habit.color.clay': 'terre',
  'app.habit.add': 'ajouter',
  'app.habit.save': 'enregistrer',

  // ————— application · gérer les habitudes —————
  'app.manage.title': 'habitudes',
  'app.manage.note':
    "L'ordre est un affichage : il ne modifie aucune donnée passée.",
  'app.manage.up': 'monter {name}',
  'app.manage.down': 'descendre {name}',
  'app.manage.rename': 'renommer {name}',
  'app.manage.archive': 'archiver',
  'app.manage.archiveAria': 'archiver {name}',
  'app.manage.empty': 'Aucune habitude dans le suivi.',
  'app.manage.archived.one': 'archivée — {n} · l’historique est conservé',
  'app.manage.archived.other': 'archivées — {n} · l’historique est conservé',
  'app.manage.restore': 'restaurer',
  'app.manage.restoreAria': 'restaurer {name}',
  'app.manage.delete': 'supprimer',
  'app.manage.deleteAria': 'supprimer {name}',
  'app.manage.deleteNote':
    "La suppression efface aussi l'historique et demande confirmation.",
  'app.manage.deleteAsk': 'Supprimer {name} ?',
  'app.manage.deleteBody.one':
    'Son historique — {n} jour coché — sera effacé. Archiver le conserve.',
  'app.manage.deleteBody.other':
    'Son historique — {n} jours cochés — sera effacé. Archiver le conserve.',
  'app.manage.deleteConfirm': 'supprimer définitivement',

  // ————— application · réglages —————
  'app.settings.title': 'réglages',
  'app.settings.display': 'affichage',
  'app.settings.data': 'données — locales, jamais envoyées',
  'app.settings.about': 'à propos',
  'app.settings.cycleAria': '{name} : {value}, changer',
  'app.settings.displayNote':
    "Chaque ligne fait défiler ses valeurs. Le changement s'applique immédiatement.",

  'app.settings.theme': 'thème',
  'app.settings.theme.system': 'système',
  'app.settings.theme.light': 'clair',
  'app.settings.theme.dark': 'sombre',

  'app.settings.lang': 'langue',
  'app.settings.lang.system': 'système',
  'app.settings.lang.fr': 'français',
  'app.settings.lang.en': 'english',

  'app.settings.firstDay': 'premier jour',
  'app.settings.firstDay.monday': 'lundi',
  'app.settings.firstDay.sunday': 'dimanche',

  'app.settings.colors': 'couleurs des habitudes',
  'app.settings.colors.shown': 'affichées',
  'app.settings.colors.hidden': 'masquées',

  'app.settings.weekends': 'distinguer les week-ends',
  'app.settings.weekends.distinct': 'oui',
  'app.settings.weekends.plain': 'non',

  'app.settings.summary': 'résumé mensuel',
  'app.settings.summary.shown': 'affiché',
  'app.settings.summary.hidden': 'masqué',

  'app.settings.habits': 'habitudes',
  'app.settings.habitsValue.one': '{n} suivie',
  'app.settings.habitsValue.other': '{n} suivies',

  'app.settings.export': 'exporter',
  'app.settings.exportValue': '{file}',
  'app.settings.send': 'envoyer vers',
  'app.settings.sendValue': 'partager le fichier',
  'app.settings.import': 'importer',
  'app.settings.importValue': 'choisir un fichier',
  'app.settings.importNote':
    "L'import vérifie le schéma et prévient avant tout remplacement.",
  'app.settings.importFound.one': '{file} — {n} habitude',
  'app.settings.importFound.other': '{file} — {n} habitudes',
  'app.settings.importExplainEmpty':
    "Votre suivi est vide : fusionner et remplacer donnent le même résultat.",
  'app.settings.importExplain.one':
    'Fusionner ajoute ce qui manque à votre habitude ; remplacer efface la vôtre.',
  'app.settings.importExplain.other':
    'Fusionner ajoute ce qui manque à vos {n} habitudes ; remplacer les efface.',
  'app.settings.merge': 'fusionner',
  'app.settings.replace': 'remplacer',

  'app.settings.erase': 'tout effacer',
  'app.settings.eraseValue.one': '{n} habitude',
  'app.settings.eraseValue.other': '{n} habitudes',
  'app.settings.eraseAsk.one': 'Effacer {n} habitude et son historique ?',
  'app.settings.eraseAsk.other': 'Effacer {n} habitudes et leur historique ?',
  'app.settings.eraseBody':
    "Cette action est définitive. Exportez d'abord si vous voulez en garder une trace.",
  'app.settings.eraseConfirm': 'tout effacer',

  'app.settings.storageNote.one':
    '{n} habitude enregistrée sur cet appareil, et nulle part ailleurs.',
  'app.settings.storageNote.other':
    '{n} habitudes enregistrées sur cet appareil, et nulle part ailleurs.',
  'app.settings.storageUnavailable':
    "Ce navigateur refuse le stockage local : la session fonctionne, mais rien ne sera retrouvé au prochain lancement. L'export reste possible.",

  'app.settings.aboutApp': 'à propos',
  'app.settings.aboutValue': 'ce que fait habit.',
  'app.settings.changelog': 'journal des changements',
  'app.settings.changelogValue': 'voir',
  'app.settings.version': 'version',
  'app.settings.legal': 'mentions et confidentialité',
  'app.settings.read': 'lire',
  'app.settings.licence': 'licence',
  'app.settings.source': 'code source',
  'app.settings.sourceValue': 'github',
  'app.settings.offline': 'hors ligne · installable',

  // ————— application · import —————
  'app.import.errorTitle': "Ce fichier n'a pas pu être lu.",
  'app.import.errorUnreadable':
    "Le contenu n'est pas du JSON. Choisissez le fichier habit.json exporté depuis l'application.",
  'app.import.errorSchema':
    "Le fichier est du JSON, mais pas un export habit. Vérifiez que c'est bien celui que vous vouliez.",
  'app.import.errorVersion':
    "Ce fichier vient d'une autre version du format. Exportez-le à nouveau depuis l'application qui l'a produit.",
  'app.import.errorEmpty': "Le fichier ne contient aucune habitude à importer.",
  'app.import.retry': 'choisir un autre fichier',

  // ————— application · confirmations passagères —————
  'app.flash.added': '{name} ajoutée',
  'app.flash.saved': '{name} enregistrée',
  'app.flash.archived': '{name} archivée',
  'app.flash.restored': '{name} restaurée',
  'app.flash.deleted': '{name} supprimée',
  'app.flash.exported.one': '{n} habitude exportée',
  'app.flash.exported.other': '{n} habitudes exportées',
  'app.flash.shared': 'fichier envoyé',
  'app.flash.imported.one': '{n} habitude importée',
  'app.flash.imported.other': '{n} habitudes importées',
  'app.flash.importedNone': 'tout était déjà là',
  'app.flash.importedDays.one': '{n} jour ajouté',
  'app.flash.importedDays.other': '{n} jours ajoutés',
  'app.flash.replaced.one': '{n} habitude en place',
  'app.flash.replaced.other': '{n} habitudes en place',
  'app.flash.erased': 'suivi effacé',

  // ————— site · charpente —————
  'site.nav.home': 'présentation',
  'site.nav.about': 'à propos',
  'site.nav.changelog': 'journal',
  'site.nav.app': "ouvrir l'application",
  'site.nav.source': 'code source',
  'site.nav.lang': 'EN',
  'site.nav.langAria': 'switch to English',
  'site.footer.project': 'projet',
  'site.footer.repo': 'dépôt',
  'site.footer.releases': 'versions',
  'site.footer.issues': 'signaler',
  'site.footer.about': 'à propos',
  'site.footer.changelog': 'journal des changements',
  'site.footer.licence': 'licence',
  'site.footer.licenceName': 'AGPL-3.0-or-later',
  'site.footer.contribute': 'contribuer',
  'site.footer.licenceNote':
    'Code ouvert. Toute version modifiée mise à disposition doit l’être aussi.',
  'site.footer.legal': 'légal',
  'site.footer.terms': "conditions d'utilisation",
  'site.footer.privacy': 'confidentialité',
  'site.footer.notice': 'mentions légales',
  'site.footer.contact': 'contact',
  'site.footer.version': 'version {version}',

  // ————— site · accueil —————
  'site.home.metaTitle': 'habit. — une semaine, une grille',
  'site.home.metaDescription':
    "habit. répond à une seule question : qu'est-ce que j'ai tenu cette semaine ? Suivi d'habitudes local, hors ligne, sans compte.",
  'site.home.title': 'Une semaine. Une grille.',
  'site.home.lede':
    "habit. répond à une seule question : qu'est-ce que j'ai tenu cette semaine ? Sept colonnes, une ligne par habitude, un point quand c'est fait. Rien à configurer, rien à gagner.",
  'site.home.cta': "ouvrir l'application",
  'site.home.ctaNote': "aucun compte — l'application s'ouvre directement",
  'site.home.demo': 'voir un exemple rempli',
  'site.home.demoNote': "rien n'est enregistré sur votre appareil",
  'site.home.previewCaption':
    "L'application réelle, avec un exemple de six habitudes.",
  'site.home.app': "l'application",
  'site.home.appBody':
    "Ce n'est pas une capture d'écran : c'est l'application, avec un exemple de six habitudes. Cochez, changez de semaine, ouvrez les réglages — rien de ce que vous ferez ici n'est enregistré.",
  'site.home.appHint.week': 'toucher une case la coche ou la décoche',
  'site.home.appHint.summary': 'toucher une bande affiche cette semaine',
  'site.home.appHint.month': '« voir le mois entier » ouvre le jour par jour',
  'site.home.appHint.settings': 'les réglages changent le thème et la langue',
  'site.home.ready': 'Prêt à commencer ?',
  'site.home.readyNote': 'Une habitude suffit. Vous en ajouterez d’autres plus tard.',
  'site.home.start': "ouvrir l'application",

  'site.home.loop': 'la boucle',
  'site.home.loop.define': 'nommer',
  'site.home.loop.defineBody': 'une habitude, un mot. La couleur est facultative.',
  'site.home.loop.check': 'cocher',
  'site.home.loop.checkBody': 'un geste par jour et par habitude. Rien à valider.',
  'site.home.loop.look': 'regarder',
  'site.home.loop.lookBody':
    'la semaine sous les yeux, le mois en dessous, en bandes.',

  'site.home.rules': 'ce que habit. ne fait pas',
  'site.home.rule.streak': 'aucune série à ne pas rompre',
  'site.home.rule.score': 'aucun pourcentage, aucun score',
  'site.home.rule.badge': 'aucun badge, aucune récompense',
  'site.home.rule.notify': 'aucune notification, aucun rappel',
  'site.home.rule.account': 'aucun compte, aucune synchronisation',
  'site.home.rule.track': 'aucun traceur, aucune publicité',
  'site.home.rulesNote':
    "Un jour non coché n'est pas un échec. C'est un jour non coché.",

  'site.home.facts': 'en bref',
  'site.home.fact.unit': 'unité',
  'site.home.fact.unitValue': 'une habitude, un jour, coché ou non',
  'site.home.fact.views': 'vues',
  'site.home.fact.viewsValue': 'la semaine · le mois en bandes · le mois entier',
  'site.home.fact.data': 'données',
  'site.home.fact.dataValue': 'sur votre appareil, export et import en JSON',
  'site.home.fact.langs': 'langues',
  'site.home.fact.langsValue': 'français, anglais, ou celle du système',
  'site.home.fact.install': 'installation',
  'site.home.fact.installValue': 'application web, hors ligne une fois chargée',
  'site.home.fact.licence': 'licence',
  'site.home.fact.licenceValue': 'AGPL-3.0-or-later, code source ouvert',

  // ————— site · à propos —————
  'site.about.metaTitle': 'à propos — habit.',
  'site.about.metaDescription':
    "Pourquoi habit. reste un tableau et refuse les séries, les scores et les notifications.",
  'site.about.title': 'À propos',
  'site.about.lede':
    "habit. fait partie d'une famille de micro-applications qui répondent chacune à une question, et à une seule.",
  'site.about.whyTitle': 'Pourquoi la semaine',
  'site.about.whyBody':
    "Un mois de trente et un jours ne tient pas sur un téléphone sans réduire chaque case à un point de trois pixels, ou sans faire défiler la grille latéralement — auquel cas on ne voit jamais l'ensemble. La semaine, elle, tient toujours : sept colonnes, quel que soit le nombre d'habitudes. Le mois n'est pas perdu pour autant, il est lu en dessous, une bande par semaine, et s'ouvre en entier à la demande.",
  'site.about.noTitle': "Ce qui a été laissé de côté",
  'site.about.noBody':
    "Les séries, les pourcentages et les badges transforment une habitude en dette. On finit par cocher pour ne pas rompre la chaîne plutôt que pour l'habitude elle-même, et le jour où la chaîne casse, on abandonne tout. habit. montre le mois tel qu'il est. Un jour vide reste un jour vide.",
  'site.about.dataTitle': 'Vos données',
  'site.about.dataBody':
    "Tout est enregistré dans le stockage local de votre navigateur. Il n'y a pas de serveur, pas de compte, pas de synchronisation — donc rien à intercepter. Le fichier habit.json que vous exportez contient l'intégralité de ce que l'application sait de vous, et vous pouvez le relire dans un éditeur de texte.",
  'site.about.familyTitle': 'La famille',
  'site.about.familyBody':
    "Même design system, mêmes principes : monospace, angles droits, aucune illustration, aucun emoji. Ce qui compte est ce qui est écrit.",
  'site.about.openTitle': 'Code ouvert',
  'site.about.openBody':
    "habit. est publié sous licence AGPL-3.0-or-later. Le code est lisible, modifiable et redistribuable ; toute version modifiée mise à disposition d'autrui doit l'être aussi.",
  'site.about.contact': 'écrire',

  // ————— site · journal des changements —————
  'site.changelog.metaTitle': 'journal des changements — habit.',
  'site.changelog.metaDescription':
    'Ce qui a changé dans habit., version par version.',
  'site.changelog.title': 'Journal des changements',
  'site.changelog.lede':
    "Chaque version et ce qu'elle apporte. Les entrées publiées ne sont jamais réécrites.",
  'site.changelog.type.added': 'ajouté',
  'site.changelog.type.changed': 'modifié',
  'site.changelog.type.fixed': 'corrigé',
  'site.changelog.type.performance': 'performance',

  // ————— site · pages légales —————
  'site.legal.terms.metaTitle': "conditions d'utilisation — habit.",
  'site.legal.terms.metaDescription':
    "Les conditions d'utilisation de habit. : un logiciel libre fourni tel quel, sans compte ni service distant.",
  'site.legal.terms.title': "Conditions d'utilisation",
  'site.legal.terms.updated': 'Dernière mise à jour : {date}',
  'site.legal.terms.serviceTitle': 'Ce que vous utilisez',
  'site.legal.terms.serviceBody':
    "habit. est un logiciel qui s'exécute entièrement dans votre navigateur. Il n'y a ni compte, ni abonnement, ni service distant : rien n'est transmis, donc il n'y a rien à louer et rien à résilier.",
  'site.legal.terms.dataTitle': 'Vos données vous appartiennent',
  'site.legal.terms.dataBody':
    "Vos habitudes sont enregistrées dans le stockage local de votre navigateur. Effacer les données du site les supprime définitivement. Exportez régulièrement le fichier habit.json si vous tenez à votre historique : personne d'autre n'en détient de copie.",
  'site.legal.terms.warrantyTitle': 'Aucune garantie',
  'site.legal.terms.warrantyBody':
    "Le logiciel est fourni « tel quel », sans garantie d'aucune sorte, dans les limites permises par la loi. Les auteurs ne peuvent être tenus responsables d'une perte de données, quelle qu'en soit la cause.",
  'site.legal.terms.licenceTitle': 'Licence',
  'site.legal.terms.licenceBody':
    "habit. est distribué sous licence GNU AGPL version 3 ou ultérieure. Vous pouvez l'utiliser, l'étudier, le modifier et le redistribuer dans le respect de cette licence.",

  'site.legal.privacy.metaTitle': 'confidentialité — habit.',
  'site.legal.privacy.metaDescription':
    "habit. ne collecte aucune donnée : ni compte, ni serveur, ni traceur, ni mesure d'audience.",
  'site.legal.privacy.title': 'Confidentialité',
  'site.legal.privacy.updated': 'Dernière mise à jour : {date}',
  'site.legal.privacy.shortTitle': 'En une phrase',
  'site.legal.privacy.shortBody':
    "habit. ne collecte rien, n'envoie rien et ne dépose aucun traceur.",
  'site.legal.privacy.collectTitle': 'Ce qui est collecté',
  'site.legal.privacy.collectBody':
    "Rien. Aucun compte, aucun identifiant, aucune adresse, aucune mesure d'audience, aucun cookie publicitaire. L'application ne fait aucune requête réseau à l'usage : une fois la page chargée, elle fonctionne hors ligne.",
  'site.legal.privacy.storedTitle': 'Ce qui est enregistré, et où',
  'site.legal.privacy.storedBody':
    "Vos habitudes, vos jours cochés et vos réglages, dans le stockage local de votre navigateur, sur votre appareil. Ces données ne quittent l'appareil que si vous exportez le fichier vous-même.",
  'site.legal.privacy.hostTitle': 'Hébergement',
  'site.legal.privacy.hostBody':
    "Les fichiers de l'application sont servis par un hébergeur statique, qui peut conserver des journaux techniques de connexion pour la sécurité de son service. Ces journaux ne sont ni exploités ni consultés par le projet.",
  'site.legal.privacy.rightsTitle': 'Vos droits',
  'site.legal.privacy.rightsBody':
    "Puisqu'aucune donnée personnelle n'est collectée par le projet, il n'y a rien à demander ni à faire supprimer. Vous gardez à tout moment la maîtrise de vos données : Réglages → exporter, ou tout effacer.",

  'site.legal.notice.metaTitle': 'mentions légales — habit.',
  'site.legal.notice.metaDescription':
    'Éditeur, hébergement et licence de habit.',
  'site.legal.notice.title': 'Mentions légales',
  'site.legal.notice.editorTitle': 'Éditeur',
  'site.legal.notice.editorBody':
    "habit. est un projet libre, publié par ses auteurs sans structure commerciale. Contact : {contact}.",
  'site.legal.notice.hostTitle': 'Hébergement',
  'site.legal.notice.hostBody':
    "Le site est publié comme un ensemble de fichiers statiques. L'hébergeur retenu ne dispose d'aucune base de données du projet.",
  'site.legal.notice.propertyTitle': 'Propriété intellectuelle',
  'site.legal.notice.propertyBody':
    "Le code source est disponible sous licence AGPL-3.0-or-later. Les données que vous saisissez restent les vôtres et ne sont jamais transmises au projet.",

  // ————— site · page absente —————
  'site.notfound.metaTitle': 'page introuvable — habit.',
  'site.notfound.metaDescription': "Cette adresse ne correspond à aucune page.",
  // ————— mise à jour —————
  // La version en attente ne s'installe pas d'elle-même : le bandeau annonce,
  // il ne prévient pas d'un fait accompli.
  'update.available': 'Une nouvelle version est prête.',
  'update.action': 'recharger',

  'site.notfound.title': 'Cette page n’existe pas.',
  'site.notfound.body':
    "L'adresse est peut-être incomplète, ou la page a été retirée.",
  'site.notfound.action': 'revenir à la présentation',
} as const

export type MessageKey = keyof typeof fr
