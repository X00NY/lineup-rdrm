# Line-Up RDRM

Web app installable (PWA) pour faire les line-ups d'un match de roller derby : rotation des joueuses, prisons, star pass, faucheuses.
Elle fonctionne hors-ligne une fois ouverte une première fois, et ne demande aucun compte.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'appli entière (interface + logique) |
| `sw.js` | Service worker : met l'appli en cache pour qu'elle marche sans réseau |
| `manifest.webmanifest` | Nom, icône et couleurs quand on l'installe sur l'écran d'accueil |
| `qrcode.js` | Génération des QR codes de transfert (qrcode-generator, licence MIT) |
| `fonts/` | Polices Archivo (licence OFL), embarquées pour le hors-ligne |
| `icons/` | Icônes de l'appli |

## Mise en ligne sur GitHub Pages

1. Sur github.com, crée un dépôt **public** nommé `lineup-rdrm`.
2. Dans le dépôt : **Add file → Upload files**, puis glisse tout le contenu du dossier (y compris les dossiers `fonts` et `icons`). Valide avec **Commit changes**.
   En ligne de commande, c'est l'équivalent de :
   ```bash
   git init && git add . && git commit -m "Line-Up RDRM"
   git branch -M main
   git remote add origin git@github.com:<ton-compte>/lineup-rdrm.git
   git push -u origin main
   ```
3. **Settings → Pages** : Source = *Deploy from a branch*, Branch = `main`, dossier `/ (root)`, puis **Save**.
4. Une à deux minutes plus tard, l'appli est en ligne sur `https://<ton-compte>.github.io/lineup-rdrm/`.

### Avec ton nom de domaine (facultatif)

Pour une adresse du type `lineup.ton-domaine.fr` :

1. Chez ton registrar (OVH, Gandi, IONOS…), ajoute un enregistrement DNS **CNAME** : nom `lineup`, cible `<ton-compte>.github.io.`
2. Dans GitHub, **Settings → Pages → Custom domain** : saisis `lineup.ton-domaine.fr` et enregistre. GitHub ajoute alors un fichier `CNAME` au dépôt.
3. Quand le DNS est pris en compte (de quelques minutes à quelques heures), coche **Enforce HTTPS**.

Autre possibilité : l'hébergement fourni avec le domaine. Dépose les fichiers dans un dossier par FTP. Le site doit être servi en **HTTPS**, sinon le mode hors-ligne et l'installation ne fonctionnent pas.

## Installer sur un téléphone

- **iPhone** : ouvre le lien dans **Safari** → bouton Partager → **Sur l'écran d'accueil**.
- **Android** : ouvre le lien dans **Chrome** → menu ⋮ → **Installer l'application** (ou *Ajouter à l'écran d'accueil*).

Ouvre-la une fois avec du réseau : elle reste ensuite utilisable hors-ligne.

## Passer le relais à un autre téléphone

Dans **Préparer le match → Passer le relais** :

- **Roster seul** : envoie les joueuses, leurs postes et le nom du match.
- **Roster + match en cours** : envoie aussi les jams déjà joués, pour garder l'équilibre du temps de jeu.

L'autre téléphone scanne le QR code avec son appareil photo, ou reçoit le lien par message.
Sur iPhone, l'appli installée sur l'écran d'accueil n'a pas les mêmes données que Safari. Il faut alors **coller le lien** dans le champ « Importer » de l'appli installée.

Les données restent dans chaque téléphone : rien n'est envoyé sur un serveur.

## Mettre à jour l'appli

1. Remplace les fichiers modifiés dans le dépôt.
2. Dans `sw.js`, change le numéro de version (`lineup-rdrm-v1` → `lineup-rdrm-v2`…). Sinon, les téléphones gardent l'ancienne version en cache.
3. Les téléphones récupèrent la nouvelle version à leur prochaine ouverture avec du réseau. Les rosters et les matchs déjà saisis sont conservés.
