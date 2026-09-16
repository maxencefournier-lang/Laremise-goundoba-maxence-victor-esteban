# La Remise

Application de gestion pour la ressourcerie associative La Remise.
Projet fullstack — Ada Tech School.

Elle remplace le cahier de la boutique et le tableur de fin d'année :
enregistrer les objets qui arrivent, suivre leur parcours jusqu'à la vente
ou au recyclage, et sortir les chiffres réclamés par la mairie.

## Stack

- PostgreSQL 16, dans Docker
- Node.js et Express, avec `pg` — SQL écrit à la main, sans ORM
- React avec React Router, projet créé avec Vite

## Démarrage sur une machine neuve

Prérequis : Docker et Node.js installés.

```bash
cp .env.example .env        # puis remplacer DB_PASSWORD
docker compose up -d
cd server && npm install && npm run dev
```

Dans un second terminal :

```bash
cd front-react && npm install && npm run dev
```

L'API tourne sur `http://localhost:3000`, le front sur `http://localhost:5173`.

La base est créée et remplie automatiquement au premier lancement, par les
scripts `db/migration_up.sql` et `db/seed.sql`.

## Variables d'environnement

Le fichier `.env` reste à la racine et n'est jamais versionné. Voir
`.env.example` pour la liste des variables.

## Structure

```text
db/            migrations et jeu de données
server/        API Express
  routes/      une route par ressource
  db.js        connexion PostgreSQL
front-react/   application React
  src/pages/       les écrans
  src/components/  les morceaux réutilisables
  src/api/         appels à l'API
```

## Fonctionnalités (V1)

- Identification de la bénévole
- Création d'un dépôt et ajout de ses objets
- Consultation du stock, avec filtres par statut et catégorie
- Changement de statut d'un objet
- Tableau de bord : poids reçu, poids détourné, objets par statut

## Conventions

- Le domaine métier reste en français : `objet`, `depot`, `benevole`.
  Le reste du code est en anglais.
- Une branche par fonctionnalité, une pull request relue avant merge.
  Personne ne pousse sur `main`.

## Équipe

| Domaine | Qui |
|---|---|
| A — Consulter le stock | Goundoba Diaby |
| B — Faire entrer les objets | Victor Metral |
| C — Suivre la vie d'un objet | Maxence Fournier |
| D — Sortir les chiffres | Esteban Perez |