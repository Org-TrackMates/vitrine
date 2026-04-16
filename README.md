# TrackMates — Site vitrine

Next.js 16 · Tailwind CSS · Vercel Postgres

---

## Stack

| Couche      | Techno                        |
|-------------|-------------------------------|
| Framework   | Next.js 16 (App Router)       |
| Style       | Tailwind CSS + CSS variables  |
| Base de données | Vercel Postgres (Neon)    |
| Hébergement | Vercel (plan Hobby gratuit)   |

---

## Lancer en local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine (copier depuis `.env.example`) :

```bash
cp .env.example .env.local
```

Pour le développement local avec une vraie base Neon :
- Va sur [neon.tech](https://neon.tech) → crée un projet gratuit
- Récupère la connection string et remplis `.env.local`

> En local sans BDD, le compteur affichera `0` et l'inscription renverra une erreur 500 — c'est normal.

### 3. Démarrer

```bash
npm run dev
```

Le site est dispo sur [http://localhost:3000](http://localhost:3000)

---

## Déployer sur Vercel

### Étape 1 — Pousser le code sur GitHub

```bash
git init
git add .
git commit -m "init: TrackMates site vitrine"
git remote add origin https://github.com/TON_USER/trackmates.git
git push -u origin main
```

### Étape 2 — Créer le projet sur Vercel

1. Va sur [vercel.com](https://vercel.com) → **New Project**
2. Importe ton repo GitHub `trackmates`
3. Framework preset : **Next.js** (détecté automatiquement)
4. Clique **Deploy** — le premier déploiement se fait sans BDD (le formulaire sera non fonctionnel)

### Étape 3 — Créer la base Vercel Postgres

1. Dans le dashboard Vercel → onglet **Storage**
2. **Create Database** → **Postgres** (propulsé par Neon)
3. Nom : `trackmates-db` · Région : `fra1` (Frankfurt, proche de Paris)
4. Clique **Create**
5. Vercel injecte automatiquement les variables d'environnement dans ton projet

### Étape 4 — Redéployer

```bash
git commit --allow-empty -m "chore: trigger redeploy with db"
git push
```

Ou depuis le dashboard Vercel → **Redeploy**.

La table `waitlist` est créée automatiquement au premier appel API grâce à `initDb()`.

---

## Structure du projet

```
trackmates/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # POST inscription / GET compteur
│   ├── globals.css            # Design tokens CSS + keyframes
│   ├── layout.tsx             # Fonts Google + metadata SEO
│   └── page.tsx               # Page principale (Server Component)
├── components/
│   ├── Nav.tsx                # Navigation sticky + hamburger mobile
│   ├── Hero.tsx               # Section hero
│   ├── Countdown.tsx          # Compte à rebours live (Client Component)
│   ├── Concept.tsx            # 4 cartes concept + helpers typography
│   ├── Saison.tsx             # 6 cartes circuits ELMS 2027
│   ├── Roadmap.tsx            # Phases 2027 → 2030
│   ├── Waitlist.tsx           # Formulaire avec appel API (Client Component)
│   └── Footer.tsx
├── lib/
│   └── db.ts                  # Helper Vercel Postgres
├── .env.example
└── README.md
```

---

## API Waitlist

### `GET /api/waitlist`
Retourne le nombre d'inscrits.

```json
{ "count": 42 }
```

### `POST /api/waitlist`
Inscrit une personne.

**Body**
```json
{ "name": "Lucas", "email": "lucas@example.fr" }
```

**Réponse succès**
```json
{ "success": true, "count": 43 }
```

**Réponse erreur**
```json
{ "error": "Email invalide" }
```

> Les doublons (même email) sont ignorés silencieusement grâce au `ON CONFLICT DO NOTHING`.

---

## Variables d'environnement

Toutes injectées automatiquement par Vercel lors de la connexion de la base :

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | URL de connexion poolée |
| `POSTGRES_URL_NON_POOLING` | URL directe (migrations) |
| `POSTGRES_USER` | Utilisateur |
| `POSTGRES_HOST` | Hôte |
| `POSTGRES_PASSWORD` | Mot de passe |
| `POSTGRES_DATABASE` | Nom de la base |

---

## Domaine custom (trackmates.fr)

1. Vercel dashboard → ton projet → **Settings** → **Domains**
2. Ajoute `trackmates.fr` et `www.trackmates.fr`
3. Chez ton registrar, configure les DNS :
   - `A` record → `76.76.21.21`
   - `CNAME www` → `cname.vercel-dns.com`
4. Le certificat SSL est généré automatiquement par Vercel (Let's Encrypt)
