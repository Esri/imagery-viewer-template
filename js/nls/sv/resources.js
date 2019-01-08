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
    "error": "Det går inte att skapa kartan",
    "licenseError": {
      "message": "Ditt konto har ingen licens för att använda konfigurerbara appar som inte är tillgängliga för allmänheten. Be din organisations administratör att tilldela dig en användartyp som omfattar Essential Apps eller en tilläggslicens för Essential Apps.",
      "title": "Inte licensierad"
    }
  },
  "nav": {
    "close": "Stäng"
  },
  "basemap": {
    "title": "Baskartgalleri"
  },
  "operationalLayers": {
    "title": "Funktionslager",
    "error": "Inga funktionslager i kartan."
  },
  "singleLayerViewer": {
    "title": "Bildlagerväljare",
    "enable": "Sök efter enskilda bilder",
    "tooltip": "Aktivera för att söka efter specifika bilder.",
    "secondary": "Ange aktivt som jämförelselager.",
    "dropDown": "Visa bilder i listrutan.",
    "refresh": "Knappen Uppdatera",
    "refreshTooltip": "Uppdatera frågan baserat på den aktuella utbredningen.",
    "renderer": "Renderar",
    "layer": "Lager",
    "show": "Visa",
    "age": "Sök i intervall",
    "zoom": "Zooma in för att välja bilder.",
    "error": "Inga synliga bildlager i kartan.",
    "error1": "Fältet är inte angivet.",
    "error2": "Inget OBJECTID-fält.",
    "error3": "Inget kategorifält.",
    "error4": "Det går inte att utföra åtgärden för lagret.",
    "error5": "Tjänster tidigare än 10.2.1 stöds inte.",
    "error6": "Inga scener i den aktuella utbredningen.",
    "error7": "Det valda antalet fotavtryck överstiger 20. Bara de första 20 visas. Tryck på OK för att inte varna igen.",
    "slider": "Visa bilder i skjutreglaget.",
    "ageOption1": "Dagar",
    "ageOption2": "Veckor",
    "ageOption3": "Månader",
    "ageOption4": "År",
    "showOption1": "Bild",
    "showOption2": "Avtryck",
    "date": "Datum",
    "imageLabel": "bilder",
    "default": "Standard"
  },
  "twoLayerViewer": {
    "title": "Lagerväljare",
    "enable": "Sök efter enskilda bilder",
    "tooltip": "Aktivera för att söka efter specifika bilder.",
    "secondary": "Ange aktivt som jämförelselager.",
    "dropDown": "Visa bilder i listrutan.",
    "refresh": "Knappen Uppdatera",
    "refreshTooltip": "Uppdatera frågan baserat på den aktuella utbredningen.",
    "renderer": "Renderar",
    "layer": "Lager",
    "show": "Visa",
    "age": "Sök i intervall",
    "zoom": "Zooma in för att välja bilder.",
    "error": "Inga synliga bildlager i kartan.",
    "error1": "Fältet är inte angivet.",
    "error2": "Inget OBJECTID-fält.",
    "error3": "Inget kategorifält.",
    "error4": "Det går inte att utföra åtgärden för lagret.",
    "error5": "Tjänster tidigare än 10.2.1 stöds inte.",
    "error6": "Inga scener i den aktuella utbredningen.",
    "error7": "Det valda antalet fotavtryck överstiger 20. Bara de första 20 visas. Tryck på OK för att inte varna igen.",
    "slider": "Visa bilder i skjutreglaget.",
    "ageOption1": "Dagar",
    "ageOption2": "Veckor",
    "ageOption3": "Månader",
    "ageOption4": "År",
    "showOption1": "Bild",
    "showOption2": "Avtryck",
    "left": "Vänster bild",
    "right": "Höger bild",
    "identicalLayerError": "Vänster och höger bild är identiska.",
    "date": "Datum",
    "imageLabel": "bilder",
    "default": "Standard"
  },
  "editor": {
    "title": "Redigerare",
    "error": "Inget redigeringslager hittades.",
    "error1": "Åtkomst nekad. Lagren kan inte att redigeras.",
    "text": "Välj en symbol och klicka på kartan."
  },
  "measurement": {
    "title": "Bildmätning",
    "error": "Mätfunktionerna stöds inte."
  },
  "export": {
    "title": "Exportera",
    "mode": "Spara plats",
    "titleText": "Titel (obligatoriskt)",
    "description": "Beskrivning",
    "tags": "Taggar (obligatoriskt)",
    "preview": "Förhandsgranska",
    "submit": "Spara",
    "cancel": "Avbryt",
    "pixel": "Pixelstorlek",
    "outsr": "Geografisk referens för utdata",
    "renderer": "Hämtningsalternativ för TIFF",
    "formatText1": "Som visas",
    "formatText2": "Rådata (alla band)",
    "extent": "Rita polygon för att definiera utbredning",
    "drawText": "(klicka på bilden för att starta)",
    "text": "Rådata kan inte visas med standardbildvisare. Öppna med ArcGIS Pro.",
    "error": "Inga synliga bildlager i kartan.",
    "error1": "Titel krävs.",
    "error2": "Tagg(ar) krävs.",
    "error3": "Pixelstorleken i exporten begränsas till",
    "error4": "för denna utbredning.",
    "error5": "Ange ett giltigt numeriskt värde.",
    "error6": "Bilden kan inte exporteras för närvarande.",
    "thumbnailError": "Ingen miniatyrbild finns tillgänglig",
    "advance": "Avancerade alternativ för att spara",
    "modeOption1": "Spara i portal",
    "modeOption2": "Spara på disk",
    "default": "Standard",
    "utm": "WGS84 UTM-zon",
    "layer": "Lager",
    "mercator": "WebMercatorAS",
    "folder": "Välj mapp"
  },
  "imageDate": {
    "label": "Bilddatum"
  },
  "about": {
    "title": "Om"
  },
  "bookmark": {
    "title": "Bokmärken",
    "selectBookmark": "Välj bokmärken",
    "default": "Standard",
    "add": "Lägg till bokmärken",
    "addTitle": "Ange en titel",
    "addBtn": "Lägg till temporär"
  }
});