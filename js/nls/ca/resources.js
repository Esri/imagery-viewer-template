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
    "error": "No es pot crear el mapa",
    "licenseError": {
      "message": "El vostre compte no té llicència per utilitzar aplicacions configurables que no siguin públiques. Demaneu a l'administrador de l'organització que us assigni un tipus d'usuari que inclogui les aplicacions bàsiques o una llicència d'aplicacions bàsiques de complement.",
      "title": "Sense llicència"
    }
  },
  "nav": {
    "close": "Tanca"
  },
  "basemap": {
    "title": "Galeria de mapes base"
  },
  "operationalLayers": {
    "title": "Capes operatives",
    "error": "No hi ha cap capa operativa al mapa."
  },
  "singleLayerViewer": {
    "title": "Selector de capes d'imatges",
    "enable": "Cerca imatges individuals",
    "tooltip": "Permet cercar imatges específiques.",
    "secondary": "Defineix Activa com a Capa de comparació.",
    "dropDown": "Mostra les imatges en una llista desplegable.",
    "refresh": "Botó Actualitza",
    "refreshTooltip": "Actualitzeu la consulta en funció de l'extensió actual.",
    "renderer": "S'està creant la representació",
    "layer": "Capa",
    "show": "Mostra",
    "age": "Interval de cerca",
    "zoom": "Amplieu per seleccionar imatges.",
    "error": "No hi ha cap capa d'imatges visible al mapa.",
    "error1": "El camp no s'ha especificat.",
    "error2": "No hi ha cap camp OBJECTID.",
    "error3": "No hi ha cap camp Categoria.",
    "error4": "No es pot dur a terme l'acció per a la capa.",
    "error5": "Els serveis anteriors a la versió 10.2.1 no són compatibles.",
    "error6": "No hi ha cap escena a l'extensió actual.",
    "error7": "S'han seleccionat més de 20 empremtes. Només es mostraran les primeres 20. Premeu D'acord per no tornar a veure aquest avís.",
    "slider": "Mostra les imatges en un control lliscant.",
    "ageOption1": "Dies",
    "ageOption2": "Setmanes",
    "ageOption3": "Mesos",
    "ageOption4": "Anys",
    "showOption1": "Imatge",
    "showOption2": "Empremta",
    "date": "Dates",
    "imageLabel": "imatges",
    "default": "Per defecte"
  },
  "twoLayerViewer": {
    "title": "Selector de capes",
    "enable": "Cerca imatges individuals",
    "tooltip": "Permet cercar imatges específiques.",
    "secondary": "Defineix Activa com a Capa de comparació.",
    "dropDown": "Mostra les imatges en una llista desplegable.",
    "refresh": "Botó Actualitza",
    "refreshTooltip": "Actualitzeu la consulta en funció de l'extensió actual.",
    "renderer": "S'està creant la representació",
    "layer": "Capa",
    "show": "Mostra",
    "age": "Interval de cerca",
    "zoom": "Amplieu per seleccionar imatges.",
    "error": "No hi ha cap capa d'imatges visible al mapa.",
    "error1": "El camp no s'ha especificat.",
    "error2": "No hi ha cap camp OBJECTID.",
    "error3": "No hi ha cap camp Categoria.",
    "error4": "No es pot dur a terme l'acció per a la capa.",
    "error5": "Els serveis anteriors a la versió 10.2.1 no són compatibles.",
    "error6": "No hi ha cap escena a l'extensió actual.",
    "error7": "S'han seleccionat més de 20 empremtes. Només es mostraran les primeres 20. Premeu D'acord per no tornar a veure aquest avís.",
    "slider": "Mostra les imatges en un control lliscant.",
    "ageOption1": "Dies",
    "ageOption2": "Setmanes",
    "ageOption3": "Mesos",
    "ageOption4": "Anys",
    "showOption1": "Imatge",
    "showOption2": "Empremta",
    "left": "Imatge esquerra",
    "right": "Imatge dreta",
    "identicalLayerError": "Les imatges esquerra i dreta són idèntiques.",
    "date": "Dates",
    "imageLabel": "imatges",
    "default": "Per defecte"
  },
  "editor": {
    "title": "Editor",
    "error": "No s'ha trobat cap capa d'edició.",
    "error1": "S'ha denegat l'accés. Les capes no es poden editar.",
    "text": "Seleccioneu un símbol i feu clic al mapa."
  },
  "measurement": {
    "title": "Mesura d'imatge",
    "error": "Funcions de mesura no compatibles."
  },
  "export": {
    "title": "Exporta",
    "mode": "Desa la ubicació",
    "titleText": "Títol (necessari)",
    "description": "Descripció",
    "tags": "Etiquetes (necessàries)",
    "preview": "Visualització prèvia",
    "submit": "Desa",
    "cancel": "Cancel·la",
    "pixel": "Mida de píxel",
    "outsr": "Referència espacial de sortida",
    "renderer": "Opcions de baixada de fitxers TIFF",
    "formatText1": "Tal com es mostra",
    "formatText2": "Dades sense format (totes les bandes)",
    "extent": "Dibuixa un polígon per definir l'extensió",
    "drawText": "(feu clic a la imatge per començar)",
    "text": "Les dades sense format no es poden mostrar amb visors de fotografies estàndard. Obriu-ho amb l'ArcGIS Pro.",
    "error": "No hi ha cap capa d'imatges visible al mapa.",
    "error1": "El títol és necessari.",
    "error2": "Les etiquetes són necessàries.",
    "error3": "El valor de Mida de píxel de l'exportació es limita a",
    "error4": "per a aquesta extensió.",
    "error5": "Introduïu un valor numèric vàlid.",
    "error6": "La imatge no es pot exportar en aquest moment.",
    "thumbnailError": "No hi ha cap miniatura disponible",
    "advance": "Opcions de desament avançades",
    "modeOption1": "Desa-ho al portal",
    "modeOption2": "Desa-ho al disc",
    "default": "Per defecte",
    "utm": "Zona UTM del WGS84",
    "layer": "Capa",
    "mercator": "WebMercatorAS",
    "folder": "Seleccioneu la carpeta"
  },
  "imageDate": {
    "label": "Data de la imatge"
  },
  "about": {
    "title": "Quant a"
  },
  "bookmark": {
    "title": "Marcadors",
    "selectBookmark": "Seleccioneu marcadors",
    "default": "Per defecte",
    "add": "Afegiu marcadors",
    "addTitle": "Introduïu el títol",
    "addBtn": "Afegiu-ne de temporals"
  }
});