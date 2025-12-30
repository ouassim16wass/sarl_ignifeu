# IGNIFEU - Site Vitrine

Site vitrine pour **SARL IGNIFEU**, entreprise de sécurité incendie et électricité basée à Rouiba, Alger.

## Structure du projet

```
ignifeu-website/
├── index.html          # Page d'accueil
├── services.html       # Page des services
├── apropos.html        # Page À propos
├── contact.html        # Page de contact
├── merci.html          # Page de confirmation après envoi du formulaire
├── css/
│   └── style.css       # Styles personnalisés
├── js/
│   └── main.js         # JavaScript (animations, menu, carte)
├── images/
│   └── logo/           # Logos des partenaires
└── README.md           # Ce fichier
```

## Technologies utilisées

- **HTML5** sémantique
- **Tailwind CSS** (via CDN)
- **JavaScript** vanilla (ES6+)
- **Leaflet.js** pour la carte interactive
- **Google Material Symbols** pour les icônes
- **Web3Forms** pour le formulaire de contact

---

## Déploiement sur Netlify via GitHub

### Étape 1 : Préparer le projet pour GitHub

1. **Créer un compte GitHub** (si vous n'en avez pas)
   - Allez sur [https://github.com](https://github.com)
   - Cliquez sur **Sign up** et suivez les instructions

2. **Installer Git** (si pas encore installé)
   - Téléchargez Git sur [https://git-scm.com/downloads](https://git-scm.com/downloads)
   - Installez-le avec les options par défaut

### Étape 2 : Créer un repository GitHub

1. Connectez-vous à GitHub
2. Cliquez sur le bouton **+** en haut à droite, puis **New repository**
3. Configurez le repository :
   - **Repository name** : `ignifeu-website`
   - **Description** : `Site vitrine SARL IGNIFEU - Sécurité Incendie`
   - **Visibility** : Public ou Private (au choix)
   - Ne cochez PAS "Add a README file" (on a déjà le nôtre)
4. Cliquez sur **Create repository**

### Étape 3 : Pousser le code sur GitHub

Ouvrez un terminal (CMD ou PowerShell) dans le dossier du projet et exécutez ces commandes :

```bash
# Initialiser Git dans le projet
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Site IGNIFEU"

# Ajouter le repository GitHub comme origine (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/ignifeu-website.git

# Renommer la branche en main
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

**Note** : Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

### Étape 4 : Déployer sur Netlify

1. **Créer un compte Netlify**
   - Allez sur [https://www.netlify.com](https://www.netlify.com)
   - Cliquez sur **Sign up**
   - Choisissez **Sign up with GitHub** (recommandé pour lier facilement vos repos)

2. **Importer le projet depuis GitHub**
   - Une fois connecté, cliquez sur **Add new site** > **Import an existing project**
   - Cliquez sur **Deploy with GitHub**
   - Autorisez Netlify à accéder à vos repositories si demandé
   - Sélectionnez le repository `ignifeu-website`

3. **Configurer le déploiement**
   - **Branch to deploy** : `main`
   - **Build command** : laisser vide (pas besoin, c'est du HTML statique)
   - **Publish directory** : `.` ou laisser vide
   - Cliquez sur **Deploy site**

4. **Attendre le déploiement**
   - Netlify va automatiquement construire et déployer votre site
   - Cela prend généralement 30 secondes à 2 minutes

5. **Votre site est en ligne !**
   - Netlify vous donne une URL automatique du type : `https://random-name-123456.netlify.app`
   - Vous pouvez la personnaliser (voir ci-dessous)

### Étape 5 : Personnaliser l'URL Netlify

1. Dans le dashboard Netlify, cliquez sur **Site configuration** > **Change site name**
2. Entrez un nom personnalisé, par exemple : `ignifeu`
3. Votre site sera accessible à : `https://ignifeu.netlify.app`

### Étape 6 : Configurer un domaine personnalisé (optionnel)

Si vous avez un nom de domaine (ex: `ignifeu.dz`) :

1. Dans Netlify, allez dans **Domain settings** > **Add custom domain**
2. Entrez votre domaine (ex: `www.ignifeu.dz`)
3. Suivez les instructions pour configurer les DNS :
   - **Option A (recommandée)** : Utilisez les DNS de Netlify
   - **Option B** : Ajoutez un enregistrement CNAME pointant vers votre site Netlify

---

## Mises à jour du site

### Déploiement automatique

Une fois configuré, **chaque push sur GitHub déclenche automatiquement un nouveau déploiement** sur Netlify.

Pour mettre à jour le site :

```bash
# Ajouter les modifications
git add .

# Créer un commit avec un message descriptif
git commit -m "Description de la modification"

# Pousser sur GitHub
git push
```

Netlify détectera automatiquement les changements et redéploiera le site en quelques secondes.

---

## Configuration Web3Forms

Le formulaire de contact utilise Web3Forms. La clé API est déjà configurée :
- **Access Key** : `2975cd9d-5b47-49fc-a267-134cb2970d34`
- **Email de réception** : `ignifeusarl@gmail.com`

Si vous souhaitez changer l'email de réception :
1. Allez sur [https://web3forms.com](https://web3forms.com)
2. Connectez-vous et accédez à votre dashboard
3. Modifiez l'email associé à votre clé API

---

## Informations de contact

- **Email** : ignifeusarl@gmail.com
- **Téléphones** :
  - 0550 31 21 26
  - 0550 69 88 28
  - 0550 65 79 09
- **Adresse** : Cité 75 EPLF, BT 02 N°04 RDC, Rouiba 16039, Alger

---

## Support navigateurs

- Chrome (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Edge (dernières versions)
- Mobile iOS/Android

---

## Licence

Ce site est la propriété de SARL IGNIFEU.

---

Développé avec passion pour SARL IGNIFEU - Sécurité Incendie depuis 2012
