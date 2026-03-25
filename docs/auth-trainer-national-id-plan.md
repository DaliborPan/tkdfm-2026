# Plan: auth trenera pres rodne cislo

## Cil

Zavest custom autentizaci s Better Auth tak, aby se trener prihlasoval pouze pres `rodne cislo` a prihlaseni proslo jen tehdy, kdyz existuje odpovidajici `Trainer`.

## Rozhodnuti

- `Trainer` zustava zdroj pravdy pro pristup.
- Better Auth bude pouzity jen pro `user`, `session`, cookies a `getSession()`.
- Login bude bez hesla a bez dalsiho faktoru.
- Ochrana stranek bude v server komponentach, ne pres middleware/proxy.

## Implementacni navrh

### Datovy model

- Do `packages/backend/prisma/schema.prisma` pridat Better Auth modely:
  - `User`
  - `Session`
  - `Account`
  - `Verification`
- Do `User` pridat custom pole:
  - `trainerId` - vazba na `Trainer.id`, unikatni
  - `role` - napr. `TRAINER`
- `nationalId` nebude duplikovane v `User`; zdrojem pravdy zustava `Trainer.nationalId`.

### Backend

- Do `packages/backend/src/trainer/repository.ts` pridat `findByNationalId()`.
- Do `packages/backend/src/trainer/service.ts` pridat `findByNationalId()`.
- Pridat novy modul `packages/backend/src/auth/` pro Better Auth konfiguraci a custom login logiku.
- Exportovat auth z `packages/backend` jako verejne API modulu.

### Better Auth

- Pouzit Prisma adapter nad existujicim Prisma clientem z `packages/backend/src/client.ts`.
- Vytvorit auth instanci v backend balicku.
- Vytvorit custom Better Auth plugin s `POST` endpointem pro login pres rodne cislo.
- Endpoint bude:
  1. prijimat `nationalId`
  2. normalizovat ho
  3. hledat `Trainer` podle `nationalId`
  4. pokud trainer neexistuje, vratit obecnou chybu prihlaseni
  5. pokud existuje, najit `User` podle `trainerId`
  6. kdyz `User` neexistuje, zalozit ho z dat trainera
  7. kdyz existuje, syncnout `name` a `email`
  8. vytvorit Better Auth session a nastavit cookie

### Web

- Do `apps/backoffice` pridat Better Auth klienta.
- Vytvorit route handler `apps/backoffice/app/api/auth/[...all]/route.ts`.
- Vytvorit `apps/backoffice/app/sign-in/page.tsx` s jednim inputem pro rodne cislo.
- Formular bude volat custom auth endpoint a po uspechu presmeruje na `/`.
- `apps/backoffice/app/page.tsx` bude chranena stranka s kontrolou pres `auth.api.getSession({ headers: await headers() })`.

## Normalizace rodneho cisla

- Akceptovat hodnotu s lomitkem i bez.
- Odstranit mezery a `/`.
- Porovnavat jen normalizovanou hodnotu.
- Normalizaci drzet na jednom miste, aby ji pouzival login i lookup trainera.

## Chovani loginu

- Prvni login vytvori Better Auth `User` navazany na trainera.
- Dalsi login pouzije existujici `User`.
- Chyba bude vzdy obecna, bez prozrazeni, zda trener existuje.

## Bezpecnostni minimum

- Nevracet detailni informace o neuspechu prihlaseni.
- Pocitat s tim, ze znalost rodneho cisla sama o sobe staci k pristupu.
- Rate limiting zatim neimplementovat.

## Predpokladane soubory ke zmene

- `packages/backend/prisma/schema.prisma`
- `packages/backend/package.json`
- `packages/backend/src/trainer/repository.ts`
- `packages/backend/src/trainer/service.ts`
- `packages/backend/src/trainer/index.ts`
- `packages/backend/src/auth/index.ts`
- `packages/backend/src/auth/trainer-national-id-plugin.ts`
- `apps/backoffice/package.json`
- `apps/backoffice/lib/auth-client.ts`
- `apps/backoffice/app/api/auth/[...all]/route.ts`
- `apps/backoffice/app/sign-in/page.tsx`
- `apps/backoffice/app/page.tsx`

## Overeni po implementaci

- Existujici trener + rodne cislo -> login OK
- Neexistujici rodne cislo -> login fail
- Rodne cislo s `/` i bez `/` -> stejne chovani
- Neprihlaseny pristup na `/` -> redirect na `/sign-in`
- Prihlaseny pristup na `/` -> stranka se vykresli
