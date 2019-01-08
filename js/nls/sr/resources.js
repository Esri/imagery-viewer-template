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
    "error": "Kreiranje mape nije moguće",
    "licenseError": {
      "message": "Vaš nalog nema licencu za korišćenje aplikacija koje mogu da se konfigurišu i nisu javne. Zatražite od administratora organizacije da vam dodeli onaj tip korisnika koji uključuje osnovne aplikacije ili licencu za dodatne osnovne aplikacije.",
      "title": "Nema licencu"
    }
  },
  "nav": {
    "close": "Zatvori"
  },
  "basemap": {
    "title": "Galerija pozadinskih mapa"
  },
  "operationalLayers": {
    "title": "Operativni slojevi",
    "error": "Nema operativnih slojeva u mapi."
  },
  "singleLayerViewer": {
    "title": "Birač sloja snimaka",
    "enable": "Potraži pojedinačne slike",
    "tooltip": "Omogući pretraživanje određenih snimaka.",
    "secondary": "Postavite da aktivan sloj bude sloj poređenja.",
    "dropDown": "Prikaži snimke u padajućoj listi.",
    "refresh": "Dugme za osvežavanje",
    "refreshTooltip": "Osvežite upit na osnovu trenutnog obuhvata.",
    "renderer": "Prikazivanje",
    "layer": "Sloj",
    "show": "Prikaži",
    "age": "Opseg pretrage",
    "zoom": "Uvećajte za izbor snimaka.",
    "error": "Na mapi nema vidljivih slojeva snimka.",
    "error1": "Polje nije navedeno.",
    "error2": "Nema OBJECTID polja.",
    "error3": "Nema polja kategorije.",
    "error4": "Nije moguće izvršiti radnju za sloj.",
    "error5": "Servisi pre 10.2.1 nisu podržani.",
    "error6": "Nema scena u trenutnom obuhvatu.",
    "error7": "Broj izabranih otisaka premašuje 20. Samo prvih 20 će biti prikazano. Pritisnite „U redu“ da ne dobijete ponovo upozorenje.",
    "slider": "Prikažite snimke na klizaču.",
    "ageOption1": "Dan(i)",
    "ageOption2": "Sedmica(e)",
    "ageOption3": "Mesec(i)",
    "ageOption4": "Godina(e)",
    "showOption1": "Snimak",
    "showOption2": "Otisak",
    "date": "Datum(i)",
    "imageLabel": "snimak(-ci)",
    "default": "Podrazumevano"
  },
  "twoLayerViewer": {
    "title": "Izbornik sloja",
    "enable": "Potraži pojedinačne slike",
    "tooltip": "Omogući pretraživanje određenih snimaka.",
    "secondary": "Postavite da aktivan sloj bude sloj poređenja.",
    "dropDown": "Prikaži snimke u padajućoj listi.",
    "refresh": "Dugme za osvežavanje",
    "refreshTooltip": "Osvežite upit na osnovu trenutnog obuhvata.",
    "renderer": "Prikazivanje",
    "layer": "Sloj",
    "show": "Prikaži",
    "age": "Opseg pretrage",
    "zoom": "Uvećajte za izbor snimaka.",
    "error": "Na mapi nema vidljivih slojeva snimka.",
    "error1": "Polje nije navedeno.",
    "error2": "Nema OBJECTID polja.",
    "error3": "Nema polja kategorije.",
    "error4": "Nije moguće izvršiti radnju za sloj.",
    "error5": "Servisi pre 10.2.1 nisu podržani.",
    "error6": "Nema scena u trenutnom obuhvatu.",
    "error7": "Broj izabranih otisaka premašuje 20. Samo prvih 20 će biti prikazano. Pritisnite „U redu“ da ne dobijete ponovo upozorenje.",
    "slider": "Prikažite snimke na klizaču.",
    "ageOption1": "Dan(i)",
    "ageOption2": "Sedmica(e)",
    "ageOption3": "Mesec(i)",
    "ageOption4": "Godina(e)",
    "showOption1": "Snimak",
    "showOption2": "Otisak",
    "left": "Levi snimak",
    "right": "Desni snimak",
    "identicalLayerError": "Levi i desni snimak su identični.",
    "date": "Datum(i)",
    "imageLabel": "snimak(-ci)",
    "default": "Podrazumevano"
  },
  "editor": {
    "title": "Uređivač",
    "error": "„Uredi sloj“ nije pronađeno.",
    "error1": "Pristup je odbijen. Slojevi ne mogu da se uređuju.",
    "text": "Odaberite simbol i kliknite na mapu."
  },
  "measurement": {
    "title": "Mere snimka",
    "error": "Mogućnosti merenja nisu podržane."
  },
  "export": {
    "title": "Izvezi",
    "mode": "Sačuvaj lokaciju",
    "titleText": "Naslov (obavezno)",
    "description": "Opis",
    "tags": "Oznake (obavezno)",
    "preview": "Prikaži",
    "submit": "Sačuvaj",
    "cancel": "Otkaži",
    "pixel": "Veličina piksela",
    "outsr": "Izlazna prostorna referenca",
    "renderer": "Opcije za TIFF preuzimanje",
    "formatText1": "Kao što je prikazano",
    "formatText2": "Sirovi podaci (svi opsezi)",
    "extent": "Nacrtajte poligon za definisanje obuhvata",
    "drawText": "(kliknite na sliku da biste započeli)",
    "text": "Sirovi podaci ne mogu da se prikažu pomoću standardnih pregledača slika. Otvorite pomoću ArcGIS Pro.",
    "error": "Na mapi nema vidljivih slojeva snimka.",
    "error1": "Naslov je obavezan.",
    "error2": "Oznaka/oznake je/su obavezni.",
    "error3": "Veličina piksela izvoza je ograničena na",
    "error4": "za ovaj obuhvat.",
    "error5": "Unesite važeću numeričku vrednost.",
    "error6": "Trenutno nije moguće izvesti sliku.",
    "thumbnailError": "Nema dostupnih sličica",
    "advance": "Napredne opcije čuvanja",
    "modeOption1": "Sačuvaj na portal",
    "modeOption2": "Sačuvaj na disk",
    "default": "Podrazumevano",
    "utm": "WGS84 UTM Zone",
    "layer": "Sloj",
    "mercator": "WebMercatorAS",
    "folder": "Selektujte fasciklu"
  },
  "imageDate": {
    "label": "Datum snimka"
  },
  "about": {
    "title": "Osnovni podaci"
  },
  "bookmark": {
    "title": "Obeleživači",
    "selectBookmark": "Izaberi obeleživače",
    "default": "Podrazumevano",
    "add": "Dodaj obeleživače",
    "addTitle": "Unesite naslov",
    "addBtn": "Dodaj privremeno"
  }
});