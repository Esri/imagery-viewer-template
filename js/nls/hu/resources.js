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
    "error": "Nem sikerült létrehozni a térképet",
    "licenseError": {
      "message": "Az Ön fiókjának licence nem terjed ki a nem nyilvános konfigurálható alkalmazásokra. Igényelje a szervezete adminisztrátorától, hogy rendeljen Önhöz olyan felhasználótípust, amely tartalmazza az alapvető alkalmazásokat, vagy egy kiegészítő alapvető alkalmazásokra vonatkozó licencet.",
      "title": "Nincs licence"
    }
  },
  "nav": {
    "close": "Bezárás"
  },
  "basemap": {
    "title": "Alaptérkép-galéria"
  },
  "operationalLayers": {
    "title": "Operatív rétegek",
    "error": "Nincsenek operatív rétegek a térképen."
  },
  "singleLayerViewer": {
    "title": "Távérzékelésiréteg-választó",
    "enable": "Egyedi képek keresése",
    "tooltip": "Nem lehet konkrét képekre keresni.",
    "secondary": "Aktív réteg beállítás összehasonlítási rétegként",
    "dropDown": "Képek megjelenítése a legördülő listán.",
    "refresh": "Frissítés gomb",
    "refreshTooltip": "Lekérdezés frissítése az aktuális kiterjedés alapján.",
    "renderer": "Renderelés",
    "layer": "Réteg",
    "show": "Megjelenítés",
    "age": "Keresési tartomány",
    "zoom": "Nagyítás a képek kiválasztásához.",
    "error": "Nincsenek látható távérzékelési rétegek a térképen.",
    "error1": "A mező nincs megadva.",
    "error2": "Nincs OBJECTID mező.",
    "error3": "Nincs Kategória mező.",
    "error4": "Nem hajtható végre művelet a rétegre vonatkozóan.",
    "error5": "A 10.2.1-es verzió előtti szolgáltatások nem támogatottak.",
    "error6": "Nincsenek 3D térképek az aktuális kiterjedésben.",
    "error7": "A kiválasztott lenyomatok száma meghaladja a 20-at. Csak az első 20 lesz megjelenítve. Kattintson az OK gombra, ha nem szeretne több ilyen figyelmeztetést kapni.",
    "slider": "Képek megjelenítése a csúszkán.",
    "ageOption1": "Nap",
    "ageOption2": "Hét",
    "ageOption3": "Hónap",
    "ageOption4": "Év",
    "showOption1": "Kép",
    "showOption2": "Lenyomat",
    "date": "Dátum",
    "imageLabel": "kép",
    "default": "Alapértelmezett"
  },
  "twoLayerViewer": {
    "title": "Rétegválasztó",
    "enable": "Egyedi képek keresése",
    "tooltip": "Nem lehet konkrét képekre keresni.",
    "secondary": "Aktív réteg beállítás összehasonlítási rétegként",
    "dropDown": "Képek megjelenítése a legördülő listán.",
    "refresh": "Frissítés gomb",
    "refreshTooltip": "Lekérdezés frissítése az aktuális kiterjedés alapján.",
    "renderer": "Renderelés",
    "layer": "Réteg",
    "show": "Megjelenítés",
    "age": "Keresési tartomány",
    "zoom": "Nagyítás a képek kiválasztásához.",
    "error": "Nincsenek látható távérzékelési rétegek a térképen.",
    "error1": "A mező nincs megadva.",
    "error2": "Nincs OBJECTID mező.",
    "error3": "Nincs Kategória mező.",
    "error4": "Nem hajtható végre művelet a rétegre vonatkozóan.",
    "error5": "A 10.2.1-es verzió előtti szolgáltatások nem támogatottak.",
    "error6": "Nincsenek 3D térképek az aktuális kiterjedésben.",
    "error7": "A kiválasztott lenyomatok száma meghaladja a 20-at. Csak az első 20 lesz megjelenítve. Kattintson az OK gombra, ha nem szeretne több ilyen figyelmeztetést kapni.",
    "slider": "Képek megjelenítése a csúszkán.",
    "ageOption1": "Nap",
    "ageOption2": "Hét",
    "ageOption3": "Hónap",
    "ageOption4": "Év",
    "showOption1": "Kép",
    "showOption2": "Lenyomat",
    "left": "Bal oldali kép",
    "right": "Jobb oldali kép",
    "identicalLayerError": "A bal és jobb oldali kép azonos.",
    "date": "Dátum",
    "imageLabel": "kép",
    "default": "Alapértelmezett"
  },
  "editor": {
    "title": "Szerkesztő",
    "error": "Nem található szerkesztési réteg.",
    "error1": "A hozzáférés megtagadva. A rétegek nem szerkeszthetők.",
    "text": "Válasszon egy szimbólumot, és kattintson a térképre."
  },
  "measurement": {
    "title": "Képmérés",
    "error": "A mérési lehetőségek nem támogatottak."
  },
  "export": {
    "title": "Exportálás",
    "mode": "Hely mentése",
    "titleText": "Cím (kötelező)",
    "description": "Leírás",
    "tags": "Címkék (kötelező)",
    "preview": "Előnézet",
    "submit": "Mentés",
    "cancel": "Mégse",
    "pixel": "Képpontméret",
    "outsr": "Kimeneti koordináta-rendszer",
    "renderer": "TIFF-letöltési beállítások",
    "formatText1": "Ahogy megjelenik",
    "formatText2": "Nyers adat (összes sáv)",
    "extent": "Polygon rajzolása kiterjedés meghatározására",
    "drawText": "(az indításhoz kattintson a képre)",
    "text": "A nyers adat nem jeleníthető meg szabványos fényképmegtekintővel. Megnyitás ArcGIS Pro-val.",
    "error": "Nincsenek látható távérzékelési rétegek a térképen.",
    "error1": "A címet meg kell adni.",
    "error2": "A címké(ke)t meg kell adni.",
    "error3": "Az export pixelmérete korlátozva erre:",
    "error4": "ehhez a kiterjedéshez.",
    "error5": "Érvényes numerikus értéket adjon meg",
    "error6": "A képe jelenleg nem exportálható.",
    "thumbnailError": "Bélyegkép nem áll rendelkezésre",
    "advance": "Speciális mentési beállítások",
    "modeOption1": "Mentés portálra",
    "modeOption2": "Mentés lemezre",
    "default": "Alapértelmezett",
    "utm": "WGS84 UTM zóna",
    "layer": "Réteg",
    "mercator": "WebMercatorAS",
    "folder": "Válassza ki a mappát"
  },
  "imageDate": {
    "label": "Kép dátuma"
  },
  "about": {
    "title": "További információ"
  },
  "bookmark": {
    "title": "Könyvjelzők",
    "selectBookmark": "Könyvjelzők kiválasztása",
    "default": "Alapértelmezett",
    "add": "Könyvjelzők hozzáadása",
    "addTitle": "Cím megadása",
    "addBtn": "Ideiglenes hozzáadás"
  }
});