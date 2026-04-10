---
name: migrate-turbo
description: Migrace staré codebase umístěné v tkdfm-turbo do nové codebase tkdfm-2026
---

## Cíl

Migrovat další agendu z legacy aplikace `tkdfm-turbo` do nové aplikace `tkdfm-2026` tak, aby výsledné chování bylo funkčně 1:1 vůči Turbo, ale implementace odpovídala nové architektuře `2026`.

## Kontext

- legacy zdroj je `@tkdfm-turbo/`
- nový cíl je `@tkdfm-2026/`
- migruje se z aplikace admin (Turbo) do backoffice (2026)
- v `2026` je nutné dodržovat novou strukturu backendu, service, repository, callerů, generic API route registry a FE modulů

## Hlavní pravidlo

Nejdřív přesně pochop legacy chování v Turbo a teprve potom navrhuj a implementuj řešení v `2026`.

Výsledek musí být funkčně 1:1 vůči Turbo:

- stejné business chování
- stejné textace
- stejné confirm flow
- stejné toolbar akce
- stejné invalidace query
- stejná sekvence kroků
- stejné filtry, defaulty, edge cases, komentáře a důležité `console.log`

Pokud si nejsi jistý 1:1 paritou, musíš na to výslovně upozornit.

## Architektonická pravidla

- backend logika patří do `packages/backend/src/...`
- app/backoffice vrstva má používat backend service přes per-module caller
- používej strukturu `schema -> repository -> service -> caller -> entity-callers -> module -> route`
- repository vrstva má používat Prisma generované typy, ne DTO schema typy
- service vrstva může používat repository jiných entit
- service vrstva by standardně neměla používat service jiné entity
- u integračních nebo cross-entity use-case preferuj orchestraci v jedné service vrstvě nad více repository
- pokud něco patří do samostatné integrační domény, nedávej to pod konkrétní FE modul, ale do správné backend oblasti
- pokud je doména samostatná, preferuj export jen service, interní helpery nech neveřejné

## Workflow

1. Projdi relevantní zdrojáky v Turbo opravdu detailně.
2. Zkontroluj i komentáře, `console.log`, invalidace query, helpery a drobné UX detaily.
3. Ověř, co už pro danou agendu existuje v `2026`.
4. Navrhni další vhodnou agendu nebo další fázi migrace.
5. Připrav plán a zapiš ho do `docs/plans`.
6. Implementuj po malých fázích.
7. Po každé větší změně stručně napiš:
   - co bylo uděláno
   - co ještě zbývá
   - jestli je chování stále 1:1
8. Pokud objevíš odchylku od Turbo, neopracuj ji potichu. Výslovně ji pojmenuj.

## Technické poznámky

- preferuj minimální změny scope
- neřeš další feature navíc, pokud není potřeba pro 1:1 paritu
- custom endpoint nebo custom akci použij jen tehdy, když to odpovídá use-case a nové architektuře
- pokud něco vypadá jako samostatná integrační logika, zvaž umístění do `packages/backend/src/<domain>`
- pokud je něco jen orchestrace, drž ji v service vrstvě

## Očekávaný výstup

Na konci vždy napiš:

- jestli je aktuální stav opravdu 1:1 s Turbo
- na jaké odchylky nebo rizika jsi narazil
- co ses naučil z případných uživatelských úprav a co máš příště udělat jinak
