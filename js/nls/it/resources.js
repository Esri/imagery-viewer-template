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
    "error": "Impossibile creare la mappa",
    "licenseError": {
      "message": "L’account non dispone della licenza per l’uso di app configurabili non pubbliche. È necessario richiedere all’amministratore dell'organizzazione l’assegnazione di un tipo di utente che includa le app essenziali o una licenza aggiuntiva per le app essenziali.",
      "title": "Non Licenziato"
    }
  },
  "nav": {
    "close": "Chiudere"
  },
  "basemap": {
    "title": "Galleria di basemap"
  },
  "operationalLayers": {
    "title": "Layer operativi",
    "error": "Nessun layer operativo nella mappa."
  },
  "singleLayerViewer": {
    "title": "Selettore di Imagery layer",
    "enable": "Cerca immagini singole",
    "tooltip": "Abilitare la ricerca di immagini specifiche.",
    "secondary": "Imposta attivo come layer di confronto.",
    "dropDown": "Mostra immagini nell’elenco a discesa.",
    "refresh": "Pulsante Aggiorna",
    "refreshTooltip": "Aggiorna query sulla base dell'estensione attuale.",
    "renderer": "Rendering",
    "layer": "Layer",
    "show": "Mostra",
    "age": "Cerca gamma",
    "zoom": "Effettua uno zoom in sulle immagini selezionate.",
    "error": "Nessun layer di immagine visibile nella mappa.",
    "error1": "Campo non specificato.",
    "error2": "Nessun campo OBJECTID.",
    "error3": "Nessun campo categoria.",
    "error4": "Impossibile eseguire un’azione per il layer.",
    "error5": "Servizi precedenti alla versione 10.2.1 non supportati.",
    "error6": "Nessuna scena nell’estensione attuale.",
    "error7": "Il numero di aree occupate selezionate supera i 20. Vengono visualizzate solo le prime 20. Premere OK per non avvisare di nuovo.",
    "error8": "I dati immagine sono disponibili solo tra ",
    "error9": "Intervallo di date non valido: la data di inizio deve essere inferiore alla data di fine.",
    "slider": "Mostra immagini sul cursore.",
    "ageOption1": "Giorno/i",
    "ageOption2": "Settimana/e",
    "ageOption3": "Mese/i",
    "ageOption4": "Anno/i",
    "showOption1": "Immagine",
    "showOption2": "Footprint",
    "date": "Data/i",
    "imageLabel": "immagine/i",
    "default": "Predefinito"
  },
  "twoLayerViewer": {
    "title": "Selettore layer",
    "enable": "Cerca immagini singole",
    "tooltip": "Abilitare la ricerca di immagini specifiche.",
    "secondary": "Imposta attivo come layer di confronto.",
    "dropDown": "Mostra immagini nell’elenco a discesa.",
    "refresh": "Pulsante Aggiorna",
    "refreshTooltip": "Aggiorna query sulla base dell'estensione attuale.",
    "renderer": "Rendering",
    "layer": "Layer",
    "show": "Mostra",
    "age": "Cerca gamma",
    "zoom": "Effettua uno zoom in sulle immagini selezionate.",
    "error": "Nessun layer di immagine visibile nella mappa.",
    "error1": "Campo non specificato.",
    "error2": "Nessun campo OBJECTID.",
    "error3": "Nessun campo categoria.",
    "error4": "Impossibile eseguire un’azione per il layer.",
    "error5": "Servizi precedenti alla versione 10.2.1 non supportati.",
    "error6": "Nessuna scena nell’estensione attuale.",
    "error7": "Il numero di aree occupate selezionate supera i 20. Vengono visualizzate solo le prime 20. Premere OK per non avvisare di nuovo.",
    "error8": "I dati immagine sono disponibili solo tra ",
    "error9": "Intervallo di date non valido: la data di inizio deve essere inferiore alla data di fine.",
    "slider": "Mostra immagini sul cursore.",
    "ageOption1": "Giorno/i",
    "ageOption2": "Settimana/e",
    "ageOption3": "Mese/i",
    "ageOption4": "Anno/i",
    "showOption1": "Immagine",
    "showOption2": "Footprint",
    "left": "Immagine sinistra",
    "right": "Immagine destra",
    "identicalLayerError": "Le immagini sinistra e destra sono identiche.",
    "date": "Data/i",
    "imageLabel": "immagine/i",
    "default": "Predefinito"
  },
  "editor": {
    "title": "Editor",
    "error": "Nessun layer di modifica trovato.",
    "error1": "Accesso negato. Impossibile modificare i layer.",
    "text": "Selezionare un simbolo e fare clic sulla mappa."
  },
  "measurement": {
    "title": "Misurazione immagine",
    "error": "Funzioni di misurazione non supportate."
  },
  "export": {
    "title": "Esporta",
    "mode": "Salva posizione",
    "titleText": "Titolo (obbligatorio)",
    "description": "Descrizione",
    "tags": "Tag (obbligatori)",
    "preview": "Anteprima",
    "submit": "Salva",
    "cancel": "Cancella",
    "pixel": "Dimensione pixel",
    "outsr": "Riferimento spaziale di output",
    "renderer": "Opzioni di download TIFF",
    "formatText1": "Come mostrato",
    "formatText2": "Dati grezzi (tutte le bande)",
    "extent": "Disegna poligono per definire l'estensione",
    "drawText": "(fai clic sull’immagine per iniziare)",
    "text": "I dati grezzi non possono essere visualizzati con dei visualizzatori di foto standard. Apri con ArcGIS Pro.",
    "error": "Nessun layer di immagine visibile nella mappa.",
    "error1": "Titolo obbligatorio.",
    "error2": "Tag obbligatori.",
    "error3": "PixelSize di esportazione è limitato a",
    "error4": "per questa estensione.",
    "error5": "Immettere un valore numerico valido.",
    "error6": "L’immagine non può essere esportata al momento.",
    "thumbnailError": "Nessuna anteprima disponibile",
    "advance": "Opzioni di salvataggio avanzate",
    "modeOption1": "Salva sul portale",
    "modeOption2": "Salva sul disco",
    "default": "Predefinito",
    "utm": "Zona UTM WGS84",
    "layer": "Layer",
    "mercator": "WebMercatorAS",
    "folder": "Seleziona cartella"
  },
  "imageDate": {
    "label": "Data immagine"
  },
  "about": {
    "title": "Informazioni su"
  },
  "bookmark": {
    "title": "Segnalibri",
    "selectBookmark": "Seleziona segnalibri",
    "default": "Predefinito",
    "add": "Aggiungi segnalibri",
    "addTitle": "Immettere titolo",
    "addBtn": "Aggiungi temporaneo"
  },
  "coordinate": {
    "_widgetLabel": "Coordinata",
    "hintMessage": "Fare clic sulla mappa per ottenere le coordinate",
    "defaultLabel": "Predefinito",
    "realtimeLabel": "Spostare il mouse per ottenere le coordinate",
    "computing": "Calcolo in corso...",
    "latitudeLabel": "Latitudine",
    "longitudeLabel": "Longitudine",
    "loading": "caricamento in corso...",
    "enableClick": "Fare clic per abilitare la generazione delle coordinate mediante il clic sulla mappa",
    "disableClick": "Fare clic per disabilitare la generazione delle coordinate mediante il clic sulla mappa",
    "Default": "Predefinito",
    "Inches": "Pollici",
    "Foot": "Piedi",
    "Foot_US": "Piedi (USA)",
    "Yards": "Iarde",
    "Miles": "Miglia",
    "Nautical_Miles": "Miglia nautiche",
    "Millimeters": "Millimetri",
    "Centimeters": "Centimetri",
    "Meter": "Metri",
    "Kilometers": "Chilometri",
    "Decimeters": "Decimetri",
    "Decimal_Degrees": "Gradi",
    "Degree_Minutes_Seconds": "Gradi minuti secondi",
    "MGRS": "MGRS",
    "USNG": "USNG"
  }
});