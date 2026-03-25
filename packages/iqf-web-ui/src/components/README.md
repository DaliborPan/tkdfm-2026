# IQF - iqf-web-ui

## Seznam komponent

### Atomy

- breadcrumb
- button
- checkbox
- chip
- icon - knihovna lucide-react
- infobar
- input - text/number/file/date/datetime
- link
- message - nejčastěji varianta s levým pruhem
- radio
- select/autocomplete(combobox) - implementováno se stejným UI
- table
- tag
- toast - varianta s levým pruhem
- tooltip

### Molekuly

- accordion
- dialog
  - alert - akcni tlacitko zavrit
  - confirm - akcni tlacitko na povrdit/zrusit
  - prompt - obsahem je formular, akcni tlacitka na potvrzeni/zruseni
- dropdown
- pagination
- tabs

### Organisms

- sidebar (shadcn)

### Extra

Nějaké další typické komponenty, které využíváme, ale nejsou vyloženě součástí GOV DS.

- Form

  - LayoutGroup - skupina fieldů, může obsahovat nadpis skupiny
  - LayoutGroupItem - použit v rámci LayoutGroup. Jeden řádek = jeden field. V první polovině je label fieldu, v druhé polovině samotný field (input/select/...)

- DataForm

  - Komponenta, který se renderuje ve variantě zobrazení, kdy v polovině obrazovky je tabulka, v druhé polovině je detail záznamu.
  - header DataFormu obsahuje tlačítko "Zavřit" (zavře detail), nadpis detailu a akční tlačítka (toolbar)
  - toolbar - akční tlačítka. V základu se objevuje (v závislosti na módu formuláře - editing true/false)
    - editing: true - zrušit, uložit
    - editing: false - editovat, smazat

- DataTable
  - Komponenta, která renderuje hlavní tabulku (seznam záznamů)
    - header DataTable obsahuje nadpis tabulky, akční tlačítka (toolbar) a defaultní tlačítka
      - toolbar - tlačítka, která můžou sloužit jako odkazy na jinou stránku, nebo (typicky) vyvolávají dialog
      - defaultní tlačítka - zobrazit filtry, nastavení sloupců (pořadí, viditelnost), nastavení (dropdown - variabilně se může cokoli objevit)
