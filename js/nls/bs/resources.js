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
    "error": "Nije moguće stvoriti kartu",
    "licenseError": {
      "message": "Vaš račun nije licenciran za upotrebu konfigurabilnih appova koji nisu javni. Obratite se administratoru svoje organizacije da vam dodijeli vrstu korisnika koja sadrži licencu za osnovne appove ili za dodatke za osnovne appove.",
      "title": "Nema licence"
    }
  },
  "nav": {
    "close": "Zatvori"
  },
  "basemap": {
    "title": "Kartografskih podloga"
  },
  "operationalLayers": {
    "title": "Operativni slojevi",
    "error": "Nema operativnih slojeva na karti."
  },
  "singleLayerViewer": {
    "title": "Odabirač slojeva snimke",
    "enable": "Pretraživanje pojedinačnih snimki",
    "tooltip": "Omogući za traženje određenih slika.",
    "secondary": "Postavi aktivni kao sloj za usporedbu.",
    "dropDown": "Prikaži slike u padajućem izborniku.",
    "refresh": "Gumb osvježi",
    "refreshTooltip": "Osvježi upit na temelju trenutačnog obuhvata.",
    "renderer": "Renderiranje",
    "layer": "Sloj",
    "show": "Prikaži",
    "age": "Pretraži raspon",
    "zoom": "Uvećajte za odabir slika.",
    "error": "Nema vidljivih slojeva slika na karti.",
    "error1": "Polje nije određeno.",
    "error2": "Nema polja OBJECTID.",
    "error3": "Nema polja kategorije.",
    "error4": "Ne može se izvršiti radnja za sloj.",
    "error5": "Usluge prije 10.2.1 nisu podržane.",
    "error6": "Nema scena u trenutačnom obuhvatu.",
    "error7": "Broj odabranih otisaka premašuje 20. Prikazat će se samo prvih 20. Pritisnite U redu da biste isključili upozorenje.",
    "error8": "Podaci o slici dostupni su samo između ",
    "error9": "Nevažeći raspon datuma: Datum početka mora biti prije datuma završetka.",
    "slider": "Prikaži slike na klizaču.",
    "ageOption1": "Dan(i)",
    "ageOption2": "Tjedan(i)",
    "ageOption3": "Mjesec(i)",
    "ageOption4": "Godina(e)",
    "showOption1": "Slika",
    "showOption2": "Trag",
    "date": "Datum(i)",
    "imageLabel": "slika(e)",
    "default": "Zadano"
  },
  "twoLayerViewer": {
    "title": "Odabirač slojeva",
    "enable": "Pretraživanje pojedinačnih snimki",
    "tooltip": "Omogući za traženje određenih slika.",
    "secondary": "Postavi aktivni kao sloj za usporedbu.",
    "dropDown": "Prikaži slike u padajućem izborniku.",
    "refresh": "Gumb osvježi",
    "refreshTooltip": "Osvježi upit na temelju trenutačnog obuhvata.",
    "renderer": "Renderiranje",
    "layer": "Sloj",
    "show": "Prikaži",
    "age": "Pretraži raspon",
    "zoom": "Uvećajte za odabir slika.",
    "error": "Nema vidljivih slojeva slika na karti.",
    "error1": "Polje nije određeno.",
    "error2": "Nema polja OBJECTID.",
    "error3": "Nema polja kategorije.",
    "error4": "Ne može se izvršiti radnja za sloj.",
    "error5": "Usluge prije 10.2.1 nisu podržane.",
    "error6": "Nema scena u trenutačnom obuhvatu.",
    "error7": "Broj odabranih otisaka premašuje 20. Prikazat će se samo prvih 20. Pritisnite U redu da biste isključili upozorenje.",
    "error8": "Podaci o slici dostupni su samo između ",
    "error9": "Nevažeći raspon datuma: Datum početka mora biti prije datuma završetka.",
    "slider": "Prikaži slike na klizaču.",
    "ageOption1": "Dan(i)",
    "ageOption2": "Tjedan(i)",
    "ageOption3": "Mjesec(i)",
    "ageOption4": "Godina(e)",
    "showOption1": "Slika",
    "showOption2": "Trag",
    "left": "Lijeva slika",
    "right": "Desna slika",
    "identicalLayerError": "Lijeva i desna slika su identične.",
    "date": "Datum(i)",
    "imageLabel": "slika(e)",
    "default": "Zadano"
  },
  "editor": {
    "title": "Uređivač",
    "error": "Nije pronađen sloj za uređivanje.",
    "error1": "Pristup odbijen. Slojevi se ne mogu uređivati.",
    "text": "Odaberite simbol i kliknite na kartu."
  },
  "measurement": {
    "title": "Izmjere slike",
    "error": "Mogućnosti mjerenja nisu podržane."
  },
  "export": {
    "title": "Izvezi",
    "mode": "Spremi lokaciju",
    "titleText": "Naslov (obavezno)",
    "description": "Opis",
    "tags": "Oznake (obavezno)",
    "preview": "Pretpregled",
    "submit": "Spremi",
    "cancel": "Odustani",
    "pixel": "Veličina piksela",
    "outsr": "Izvoz prostorne reference",
    "renderer": "Opcije preuzimanja TIFF-a",
    "formatText1": "Kao što je prikazano",
    "formatText2": "Neobrađeni podaci (svi kanali)",
    "extent": "Nacrtajte poligon za definiranje obuhvata",
    "drawText": "(kliknite na sliku za početak)",
    "text": "Neobrađeni podaci ne mogu se prikazati sa standardnim preglednicima fotografija. Otvori s ArcGIS Pro.",
    "error": "Nema vidljivih slojeva slika na karti.",
    "error1": "Potreban je naslov.",
    "error2": "Potrebne su oznake.",
    "error3": "Veličina piksela za izvoz ograničena je na",
    "error4": "za ovaj obuhvat.",
    "error5": "Unesite valjanu brojčanu vrijednost.",
    "error6": "Vaša se slika trenutno ne može izvesti.",
    "thumbnailError": "Nema dostupnih sličica",
    "advance": "Napredne opcije spremanja",
    "modeOption1": "Spremi na portal",
    "modeOption2": "Spremi na disk",
    "default": "Zadano",
    "utm": "Zona WGS84 UTM",
    "layer": "Sloj",
    "mercator": "WebMercatorAS",
    "folder": "Odaberi mapu"
  },
  "imageDate": {
    "label": "Datum slike"
  },
  "about": {
    "title": "Informacije"
  },
  "bookmark": {
    "title": "Knjižne oznake",
    "selectBookmark": "Odaberi knjižne oznake",
    "default": "Zadano",
    "add": "Dodaj knjižne oznake",
    "addTitle": "Unesite naslov",
    "addBtn": "Dodaj privremeno"
  },
  "coordinate": {
    "_widgetLabel": "Koordinata",
    "hintMessage": "Kliknite na kartu za dobivanje koordinata",
    "defaultLabel": "Zadano",
    "realtimeLabel": "Pomaknite miš za dobivanje koordinata",
    "computing": "Izračunavanje...",
    "latitudeLabel": "Geografska širina",
    "longitudeLabel": "Geografska dužina",
    "loading": "učitavanje...",
    "enableClick": "Kliknite da omogućite dobivanje koordinata klikom na kartu",
    "disableClick": "Kliknite da onemogućite dobivanje koordinata klikom na kartu",
    "Default": "Zadano",
    "Inches": "Inči",
    "Foot": "Stope",
    "Foot_US": "Stopa_SAD",
    "Yards": "Jardi",
    "Miles": "Milje",
    "Nautical_Miles": "Nautičke milje",
    "Millimeters": "Milimetri",
    "Centimeters": "Centimetri",
    "Meter": "Metri",
    "Kilometers": "Kilometri",
    "Decimeters": "Decimetri",
    "Decimal_Degrees": "Stupnjevi",
    "Degree_Minutes_Seconds": "Stupnjevi minute sekunde",
    "MGRS": "MGRS",
    "USNG": "USNG"
  }
});