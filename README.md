# Turborepo + Prisma ORM starter

This is a example designed to help you quickly set up a Turborepo monorepo with a Next.js app and Prisma ORM. This is a community-maintained example. If you experience a problem, please submit a pull request with a fix. GitHub Issues will be closed.

## What's inside?

This turborepo includes the following packages/apps:

### Apps and packages

- `web`: a [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/backend`: [Prisma ORM](https://prisma.io/) to manage & access your database — use `import { userSchema, userService } from "@repo/backend/user"` (no package root export)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma ORM](https://prisma.io/) for accessing the database
- [Docker Compose](https://docs.docker.com/compose/) for a local MySQL database

## Getting started

Follow these steps to set up and run your Turborepo project with Prisma ORM:

### 1. Create a Turborepo project

Start by creating a new Turborepo project using the following command:

```sh
npx create-turbo@latest -e with-prisma
```

Choose your desired package manager when prompted and a name for the app (e.g., `my-turborepo`). This will scaffold a new Turborepo project with Prisma ORM included and dependencies installed.

Navigate to your project directory:

```bash
cd ./my-turborepo
```

### 2. Setup a local database with Docker Compose

We use [Prisma ORM](https://prisma.io/) to manage and access our database. As such you will need a database for this project, either locally or hosted in the cloud.

To make this process easier, a [`docker-compose.yml` file](./docker-compose.yml) is included to setup a PostgreSQL server locally with a new database named `turborepo`:

Start the PostgreSQL database using Docker Compose:

```sh
docker-compose up -d
```

To change the default database name, update the `POSTGRES_DB` environment variable in the [`docker-compose.yml` file](/docker-compose.yml).

### 3. Setup environment variables

Once the database is ready, copy the `.env.example` file to the [`/packages/backend`](./packages/backend/) and [`/apps/backoffice`](./apps/backoffice/) directories as `.env`:

```bash
cp .env.example ./packages/backend/.env
cp .env.example ./apps/backoffice/.env
```

This ensures Prisma has access to the `DATABASE_URL` environment variable, which is required to connect to your database.

If you added a custom database name, or use a cloud based database, you will need to update the `DATABASE_URL` in your `.env` accordingly.

### 4. Migrate your database

Once your database is running, you’ll need to create and apply migrations to set up the necessary tables. Run the database migration command:

```bash
# Using npm
npm run db:migrate:dev
```

<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn run db:migrate:dev

# Using pnpm
pnpm run db:migrate:dev

# Using bun
bun run db:migrate:dev
```

</details>

You’ll be prompted to name the migration. Once you provide a name, Prisma will create and apply the migration to your database.

> Note: The `db:migrate:dev` script (located in [packages/backend/package.json](/packages/backend/package.json)) uses [Prisma Migrate](https://www.prisma.io/migrate) under the hood.

For production environments, always push schema changes to your database using the [`prisma migrate deploy` command](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate). You can find an example `db:migrate:deploy` script in the [`package.json` file](/packages/backend/package.json) of the `backend` package.

### 5. Seed your database

To populate your database with initial or fake data, use [Prisma's seeding functionality](https://www.prisma.io/docs/guides/database/seed-database).

Update the seed script located at [`packages/backend/src/seed.ts`](/packages/backend/src/seed.ts) to include any additional data that you want to seed. Once edited, run the seed command:

```bash
# Using npm
npm run db:seed
```

<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn run db:seed

# Using pnpm
pnpm run db:seed

# Using bun
bun run db:seed
```

</details>

### 6. Build your application

To build all apps and packages in the monorepo, run:

```bash
# Using npm
npm run build
```

<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn run build

# Using pnpm
pnpm run build

# Using bun
bun run build
```

</details>

### 7. Start the application

Finally, start your application with:

```bash
yarn run dev
```

<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn run dev

# Using pnpm
pnpm run dev

# Using bun
bun run dev
```

</details>

Your app will be running at `http://localhost:3000`. Open it in your browser to see it in action!

You can also read the official [detailed step-by-step guide from Prisma ORM](https://pris.ly/guide/turborepo?utm_campaign=turborepo-example) to build a project from scratch using Turborepo and Prisma ORM.

## Import kandidátů ze svazu

Import kandidátů ze svazu je v backoffice dostupný v evidenci `student-candidate` přes akci `Nahrát nejnovější data ze svazu`.

### UI flow

- Akce je v toolbaru tabulky `Import členů ze svazu`.
- Po kliknutí se otevře potvrzovací dialog s textem `Opravdu chcete nahrát nejnovější data ze svazu?`.
- Po potvrzení se zavolá endpoint `POST /api/studentCandidate/trigger-tkd-portal-sync`.
- Po úspěchu se zobrazí toast `Data byla úspěšně nahrána`.
- Následně se invaliduje evidence `student-candidate` a `student`.

### Server-side sekvence

Import use-case je implementovaný v `packages/backend/src/tkd-portal/service.ts` a zachovává stejnou sekvenci jako původní Turbo aplikace:

1. získá access token do portálu svazu
2. stáhne aktuální seznam členů klubu z externího API
3. načte všechny existující studenty z databáze
4. aktualizuje existující studenty, pokud se data liší
5. vytvoří nové `student-candidate` záznamy pro členy, kteří ještě nejsou ani studenti, ani kandidáti

### Externí API

- Base URL: `https://portal.taekwondo.cz/v2`
- Token endpoint: `/access/access-token`
- Team members endpoint: `/member/club-members`

Potřebné proměnné prostředí:

- `TKD_PORTAL_CLIENT_ID`
- `TKD_PORTAL_CLIENT_SECRET`

### Co se při importu děje v databázi

#### 1. Aktualizace existujících studentů

Pro každého člena ze svazu se hledá odpovídající student:

- primárně podle `nationalId`
- speciální fallback je podle `tkdid + firstName + lastName + birthDate`, pokud student používá `tkdid` jako náhradní identifikátor

Pokud se najde existující student s parentem:

- porovnají se importovaná pole proti lokálním datům
- při rozdílu se vytvoří záznamy v `tkd-portal-log`
- pokud vznikl alespoň jeden log, student a jeho parent data se aktualizují

Porovnávaná pole:

- `tkdid`
- `firstName`
- `lastName`
- `importActive`
- `technicalGrade`
- `technicalGradeStart`
- `parent.phoneNumber`
- `parent.email`
- `parent.street`
- `parent.streetNumber`
- `parent.city`
- `parent.registered`

#### 2. Vytvoření nových kandidátů

Pokud člen ze svazu:

- neodpovídá žádnému existujícímu studentovi
- a zároveň ještě neexistuje v `student-candidate` podle `nationalId`

tak se provede:

- vytvoření `CREATE` záznamu do `tkd-portal-log`
- vytvoření nového `student-candidate`

### Mapování dat z TKD portálu

Při transformaci vstupních dat se zachovává logika z Turbo:

- neaktivní členové (`active === "inactive"`) se vůbec neimportují
- `birth_number` fallbackuje na `id`, pokud chybí
- telefon a email se skládají z hlavního a odpovědné osoby; pokud se liší, spojí se do jednoho řetězce odděleného čárkou
- technické stupně `1 dan` až `9 dan` se převádějí na interní formát jako `I. dan`, `II. dan`, ...

### Důležitá poznámka

Tento import je záměrně implementovaný s 1:1 paritou vůči Turbo aplikaci. Při úpravách je potřeba zachovat:

- stejné UI textace
- stejný confirm flow
- stejnou sekvenci kroků importu
- stejná porovnávaná pole
- stejné vytváření `tkd-portal-log` záznamů
- stejné invalidace dat po dokončení

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
