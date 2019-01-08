/*global define */
/*
 | Copyright 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
  "map": {
    "error": "Nelze vytvořit mapu",
    "licenseError": {
      "message": "Váš účet nevlastní licenci k používání konfigurovatelných aplikací, které nejsou veřejné. Požádejte prosím správce své organizace, aby vám přidělil typ uživatele, jehož součástí jsou základní aplikace nebo doplňková licence základních aplikací.",
      "title": "Chybí licence"
    }
  },
  "nav": {
    "close": "Zavřít"
  },
  "basemap": {
    "title": "Galerie podkladových map"
  },
  "operationalLayers": {
    "title": "Operační vrstvy",
    "error": "V mapě nejsou k dispozici žádné operační vrstvy."
  },
  "singleLayerViewer": {
    "title": "Nástroj pro výběr vrstev obrazových dat",
    "enable": "Vyhledat jednotlivé snímky",
    "tooltip": "Povolit vyhledávání konkrétních snímků.",
    "secondary": "Nastavit aktivní vrstvu jako srovnávací vrstvu.",
    "dropDown": "Zobrazit snímky v rozbalovacím seznamu.",
    "refresh": "Tlačítko pro obnovení",
    "refreshTooltip": "Obnovit dotaz podle aktuálního rozsahu.",
    "renderer": "Vykreslování",
    "layer": "Vrstva",
    "show": "Zobrazit",
    "age": "Rozsah hledání",
    "zoom": "Přiblížit pro volbu snímků.",
    "error": "V mapě nejsou viditelné žádné vrstvy imagery.",
    "error1": "Pole není specifikováno.",
    "error2": "Chybí pole OBJECTID.",
    "error3": "Chybí pole kategorie.",
    "error4": "Činnost pro vrstvu nelze provést.",
    "error5": "Služby ve verzi nižší než 10.2.1 nejsou podporovány.",
    "error6": "V aktuálním rozsahu nejsou žádné scény.",
    "error7": "Počet zvolených obrysů je větší než 20. Zobrazí se pouze prvních 20. Stiskněte OK pro ukončení zobrazování upozornění.",
    "slider": "Zobrazit snímky na posuvníku.",
    "ageOption1": "Dnů",
    "ageOption2": "týden/týdny",
    "ageOption3": "měsíc/měsíce",
    "ageOption4": "Rok(y)",
    "showOption1": "Snímek",
    "showOption2": "Obrys rastru",
    "date": "Datum (data)",
    "imageLabel": "Obrázek(y)",
    "default": "výchozí"
  },
  "twoLayerViewer": {
    "title": "Nástroj pro výběr vrstev",
    "enable": "Vyhledat jednotlivé snímky",
    "tooltip": "Povolit vyhledávání konkrétních snímků.",
    "secondary": "Nastavit aktivní vrstvu jako srovnávací vrstvu.",
    "dropDown": "Zobrazit snímky v rozbalovacím seznamu.",
    "refresh": "Tlačítko pro obnovení",
    "refreshTooltip": "Obnovit dotaz podle aktuálního rozsahu.",
    "renderer": "Vykreslování",
    "layer": "Vrstva",
    "show": "Zobrazit",
    "age": "Rozsah hledání",
    "zoom": "Přiblížit pro volbu snímků.",
    "error": "V mapě nejsou viditelné žádné vrstvy imagery.",
    "error1": "Pole není specifikováno.",
    "error2": "Chybí pole OBJECTID.",
    "error3": "Chybí pole kategorie.",
    "error4": "Činnost pro vrstvu nelze provést.",
    "error5": "Služby ve verzi nižší než 10.2.1 nejsou podporovány.",
    "error6": "V aktuálním rozsahu nejsou žádné scény.",
    "error7": "Počet zvolených obrysů je větší než 20. Zobrazí se pouze prvních 20. Stiskněte OK pro ukončení zobrazování upozornění.",
    "slider": "Zobrazit snímky na posuvníku.",
    "ageOption1": "Dnů",
    "ageOption2": "týden/týdny",
    "ageOption3": "měsíc/měsíce",
    "ageOption4": "Rok(y)",
    "showOption1": "Snímek",
    "showOption2": "Obrys rastru",
    "left": "Obrázek vlevo",
    "right": "Obrázek vpravo",
    "identicalLayerError": "Pravý a levý obrázek je shodný.",
    "date": "Datum (data)",
    "imageLabel": "Obrázek(y)",
    "default": "výchozí"
  },
  "editor": {
    "title": "Editor",
    "error": "Nenalezena žádná vrstva pro úpravu.",
    "error1": "Přístup byl odepřen. Vrstvy nelze upravit.",
    "text": "Vyberte symbol a klikněte na mapu."
  },
  "measurement": {
    "title": "Měření snímku",
    "error": "Funkcionalita měření není povolena."
  },
  "export": {
    "title": "Exportovat",
    "mode": "Uložit umístění",
    "titleText": "Název (povinné)",
    "description": "Popis",
    "tags": "Klíčová slova (povinné)",
    "preview": "Náhled",
    "submit": "Uložit",
    "cancel": "Storno",
    "pixel": "Velikost pixelu",
    "outsr": "Výstupní souřadnicový systém",
    "renderer": "Možnosti stahování souborů TIFF",
    "formatText1": "Dle zobrazení",
    "formatText2": "Surová data (všechna pásma)",
    "extent": "Nakreslete polygon a definujte tak rozsah.",
    "drawText": "(klikněte na snímek pro spuštění)",
    "text": "Surová data nelze zobrazit v běžných prohlížečích fotografií. Otevřít v ArcGIS Pro.",
    "error": "V mapě nejsou viditelné žádné vrstvy imagery.",
    "error1": "Je požadován název.",
    "error2": "Je požadován tag(tagy).",
    "error3": "Velikost pixelu pro export je omezena na",
    "error4": "pro tento rozsah.",
    "error5": "Zadejte platnou číselnou hodnotu.",
    "error6": "Váš snímek momentálně nelze exportovat.",
    "thumbnailError": "Miniatura není k dispozici",
    "advance": "Rozšířené možnosti ukládání",
    "modeOption1": "Uložit do portálu",
    "modeOption2": "Uložit na disk",
    "default": "výchozí",
    "utm": "Zóna UTM WGS84",
    "layer": "Vrstva",
    "mercator": "WebMercatorAS",
    "folder": "Vybrat složku"
  },
  "imageDate": {
    "label": "Datum snímku"
  },
  "about": {
    "title": "Informace o aplikaci"
  },
  "bookmark": {
    "title": "Záložky",
    "selectBookmark": "Vybrat záložky",
    "default": "výchozí",
    "add": "Přidat záložky",
    "addTitle": "Zadat název",
    "addBtn": "Přidat dočasný"
  }
});