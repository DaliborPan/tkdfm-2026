# Schema review notes

Poznamky k puvodnimu `schema.prisma` pred pripadnym refaktorem. Aktualne ponechavame stavajici strukturu, protoze na ni navazuje business logika, ale tyto body dava smysl pozdeji projit.

## Co zachovat prozatim

- Stavajici domenovy rozklad neni katastrofa a da se na nem bezpecne stavet dal.
- Rozdeleni `Student` + 1:1 doplnkova tabulka dava smysl, pokud doplnkova data maji jiny lifecycle nebo jinou citlivost.
- Nejvetsi technicky dluh nejsou samotne relace, ale typy sloupcu a specializovany navrh plateb.

## Doporucene zmeny do budoucna

### Nazvoslovi domeny

- Prejmenovat `Parent` na neco, co odpovida realite, napr. `StudentProfile`, `StudentRegistration` nebo `StudentDetails`.
- Prejmenovat `ParentEvent` na `EventRegistration`.
- Prejmenovat navazne cizi klice typu `parentId` na `studentProfileId` nebo podobny presnejsi nazev.

### Typovani dat

- Nahradit string datumy za `DateTime` tam, kde jde o skutecne datumy:
  - `birthDate`
  - `registered`
  - `technicalGradeStart`
  - `inactive` -> idealne `inactiveAt DateTime?`
  - `cancelled` -> idealne `cancelledAt DateTime?`
  - `deleted` -> idealne `deletedAt DateTime?`
- Nahradit string stavy za `Boolean` tam, kde jde o ano/ne:
  - `importActive` -> `isImportActive Boolean`
  - `active` -> `isActive Boolean`
- Omezit pouzivani prazdnych stringu a sentinel hodnot typu `9999-01-01` jako nahrady za `null`.

### Enumy

- Zavest Prisma `enum` pro hodnoty s konecnou mnozinou:
  - `role`
  - `gender`
  - `status`
  - `createdBy`
  - `Event.type`
  - `dayOfWeek`
- Zvážit enum i pro `technicalGrade`, pokud existuje pevny seznam hodnot.

### Unikaty a integrita

- Pridat composite unique na `StudentGroup(studentId, groupId)`.
- Pridat composite unique na `Attendance(studentId, trainingId)`.
- Zvážit `@unique` pro `Group.shortcut`, pokud ma fungovat jako jednoznacny identifikator.
- U `PendingPaymentPayment` zvazit povinne oba foreign keys, pokud ma jit vzdy o plnohodnotnou vazbu mezi `PendingPayment` a `Payment`.

### Platby

- Zjednodusit `Payment` model, ktery je ted navazany pres vice specialnich nullable foreign keys.
- Doporucena budouci varianta:
  - jeden owner foreign key
  - `Payment.type` jako enum
  - optional vazba na event registraci
- Tohle odstrani potrebu sloupcu typu `parentFirstHalfId`, `parentSecondHalfId`, `parentTeamId` a usnadni budouci rozsireni.

### Dalsi cisteni

- Sjednotit strategii generovani ID (`uuid()` vs `cuid()`), pokud pro kombinaci neni vedomy duvod.
- U event subtype modelu (`EventSeminar`, `EventCompetition`, `EventCamp`, `EventExam`) ponechat stavajici pristup, ale v aplikaci hlidat konzistenci mezi `Event.type` a odpovidajici detail tabulkou.

## Prakticky zaver

- Pro ted ponechat aktualni schema kvuli navazane business logice.
- Pri budoucim refaktoru zacit typovanim (`DateTime`, `Boolean`, `enum`) a doplnenim unikatu.
- Az potom resit domenove prejmenovani a refaktor `Payment`.
