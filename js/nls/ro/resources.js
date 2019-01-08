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
    "error": "Imposibil de creat harta",
    "licenseError": {
      "message": "Contul dvs. nu este licențiat să utilizeze aplicații configurabile care nu sunt publice. Solicitați-i administratorului organizației să vă aloce un tip de utilizator care include aplicații esențiale sau o licență pentru aplicații esențiale de completare.",
      "title": "Nelicențiat"
    }
  },
  "nav": {
    "close": "Închidere"
  },
  "basemap": {
    "title": "Galeria de hărți de fundal"
  },
  "operationalLayers": {
    "title": "Straturi tematice operaționale",
    "error": "Niciun strat tematic operațional pe hartă."
  },
  "singleLayerViewer": {
    "title": "Selector de straturi tematice de imagistică",
    "enable": "Căutare imagini individuale",
    "tooltip": "Activați pentru a căuta imagini specifice.",
    "secondary": "Setați Activ drept strat tematic de comparație.",
    "dropDown": "Vor fi afișate imaginile în lista derulantă.",
    "refresh": "Butonul Reîmprospătare",
    "refreshTooltip": "Reîmprospătați căutarea pe baza extinderii curente.",
    "renderer": "Redare",
    "layer": "Strat tematic",
    "show": "Afișare",
    "age": "Căutare interval",
    "zoom": "Focalizați pentru a selecta imagini.",
    "error": "Niciun strat tematic imagistic vizibil pe hartă.",
    "error1": "Câmpul nu este specificat.",
    "error2": "Niciun câmp OBJECTID.",
    "error3": "Niciun câmp Categorie.",
    "error4": "Nu se poate efectua acțiunea pentru stratul tematic.",
    "error5": "Servicii anterioare 10.2.1 neacceptate.",
    "error6": "Nicio scenă în extinderea curentă.",
    "error7": "Numărul de amprente selectate depășește 20. Vor fi afișate doar primele 20. Apăsați OK pentru a nu primi o nouă avertizare.",
    "slider": "Vor fi afișate imaginile pe cursor.",
    "ageOption1": "Zi(le)",
    "ageOption2": "Săptămână(i)",
    "ageOption3": "Lună(i)",
    "ageOption4": "An(i)",
    "showOption1": "Imagine",
    "showOption2": "Amprentă",
    "date": "Dată(e)",
    "imageLabel": "Imagine (imagini)",
    "default": "Implicit"
  },
  "twoLayerViewer": {
    "title": "Selector de straturi tematice",
    "enable": "Căutare imagini individuale",
    "tooltip": "Activați pentru a căuta imagini specifice.",
    "secondary": "Setați Activ drept strat tematic de comparație.",
    "dropDown": "Vor fi afișate imaginile în lista derulantă.",
    "refresh": "Butonul Reîmprospătare",
    "refreshTooltip": "Reîmprospătați căutarea pe baza extinderii curente.",
    "renderer": "Redare",
    "layer": "Strat tematic",
    "show": "Afișare",
    "age": "Căutare interval",
    "zoom": "Focalizați pentru a selecta imagini.",
    "error": "Niciun strat tematic imagistic vizibil pe hartă.",
    "error1": "Câmpul nu este specificat.",
    "error2": "Niciun câmp OBJECTID.",
    "error3": "Niciun câmp Categorie.",
    "error4": "Nu se poate efectua acțiunea pentru stratul tematic.",
    "error5": "Servicii anterioare 10.2.1 neacceptate.",
    "error6": "Nicio scenă în extinderea curentă.",
    "error7": "Numărul de amprente selectate depășește 20. Vor fi afișate doar primele 20. Apăsați OK pentru a nu primi o nouă avertizare.",
    "slider": "Vor fi afișate imaginile pe cursor.",
    "ageOption1": "Zi(le)",
    "ageOption2": "Săptămână(i)",
    "ageOption3": "Lună(i)",
    "ageOption4": "An(i)",
    "showOption1": "Imagine",
    "showOption2": "Amprentă",
    "left": "Imaginea din stânga",
    "right": "Imaginea din dreapta",
    "identicalLayerError": "Imaginea din partea stângă și cea din partea dreaptă sunt identice.",
    "date": "Dată(e)",
    "imageLabel": "imagine (imagini)",
    "default": "Implicit"
  },
  "editor": {
    "title": "Editor",
    "error": "Niciun strat tematic de editare găsit.",
    "error1": "Acces refuzat. Straturile tematice nu pot fi editate.",
    "text": "Selectați un simbol și faceți clic pe hartă."
  },
  "measurement": {
    "title": "Măsurare imagine",
    "error": "Capacități de măsurare neacceptate."
  },
  "export": {
    "title": "Export",
    "mode": "Salvare locație",
    "titleText": "Titlu(obligatoriu)",
    "description": "Descriere",
    "tags": "Etichete(obligatorii)",
    "preview": "Previzualizare",
    "submit": "Salvare",
    "cancel": "Anulare",
    "pixel": "Dimensiune pixeli",
    "outsr": "Referință spațială de ieșire",
    "renderer": "Opțiuni descărcare TIFF",
    "formatText1": "Conform afișării",
    "formatText2": "Date brute(toate benzile)",
    "extent": "Trasați un poligon pentru a defini extinderea",
    "drawText": "(faceți clic pe imagine pentru a începe)",
    "text": "Datele brute nu pot fi afișate cu aplicații standard de vizualizare a fotografiilor. Deschideți cu ArcGIS Pro.",
    "error": "Niciun strat tematic imagistic vizibil pe hartă.",
    "error1": "Este necesar un titlu.",
    "error2": "Este necesară o etichetă (etichete).",
    "error3": "Dimensiunea pixelilor exportului este restricționată la",
    "error4": "pentru această extindere.",
    "error5": "Vă rugăm să introduceți o valoare numerică validă.",
    "error6": "Imaginea dvs. nu poate fi exportată în acest moment.",
    "thumbnailError": "Nicio miniatură nu este disponibilă",
    "advance": "Opțiuni de salvare avansate",
    "modeOption1": "Salvare pe portal",
    "modeOption2": "Salvare pe disc",
    "default": "Implicit",
    "utm": "Zona UTM WGS84",
    "layer": "Strat tematic",
    "mercator": "WebMercatorAS",
    "folder": "Selectaţi dosarul"
  },
  "imageDate": {
    "label": "Data imaginii"
  },
  "about": {
    "title": "Despre"
  },
  "bookmark": {
    "title": "Semne de carte",
    "selectBookmark": "Selectare semne de carte",
    "default": "Implicit",
    "add": "Adăugare semne de carte",
    "addTitle": "Introducere titlu",
    "addBtn": "Adăugare element temporar"
  }
});