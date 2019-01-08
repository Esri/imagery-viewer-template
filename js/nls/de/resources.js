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
    "error": "Karte kann nicht erstellt werden",
    "licenseError": {
      "message": "Ihr Konto ist nicht für die Verwendung von nicht öffentlichen konfigurierbaren Apps lizenziert. Bitten Sie den Administrator der Organisation, Ihnen einen Benutzertyp mit Essential Apps oder eine Add-On-Lizenz für Essential Apps zuzuweisen.",
      "title": "Nicht lizenziert"
    }
  },
  "nav": {
    "close": "Schließen"
  },
  "basemap": {
    "title": "Grundkarten-Galerie"
  },
  "operationalLayers": {
    "title": "Operationale Layer",
    "error": "Keine funktionsfähigen Layer in der Karte."
  },
  "singleLayerViewer": {
    "title": "Auswahl für Bilddaten-Layer",
    "enable": "Nach einzelnen Bildern suchen",
    "tooltip": "Aktivieren Sie diese Option, um nach bestimmten Bildern zu suchen.",
    "secondary": "Legen Sie den aktiven Layer als Vergleichs-Layer fest.",
    "dropDown": "Zeigen Sie Bilder in der Dropdown-Liste an.",
    "refresh": "Schaltfläche 'Aktualisieren'",
    "refreshTooltip": "Aktualisieren Sie die Abfrage basierend auf der aktuellen Ausdehnung.",
    "renderer": "Rendering",
    "layer": "Layer",
    "show": "Einblenden",
    "age": "Suchbereich",
    "zoom": "Vergrößern Sie die Ansicht, um Bilder auszuwählen.",
    "error": "Keine sichtbaren Bilddaten-Layer auf der Karte.",
    "error1": "Das Feld wurde nicht angegeben.",
    "error2": "Kein ObjectID-Feld.",
    "error3": "Kein Kategoriefeld.",
    "error4": "Die Aktion kann für den Layer nicht ausgeführt werden.",
    "error5": "Services vor 10.2.1 werden nicht unterstützt.",
    "error6": "Keine Szenen in der aktuellen Ausdehnung.",
    "error7": "Es wurden mehr als 20 Footprints ausgewählt. Nur die ersten 20 werden angezeigt. Drücken Sie auf 'OK', damit die Warnung nicht wieder angezeigt wird.",
    "slider": "Zeigen Sie Bilder auf dem Schieberegler an.",
    "ageOption1": "Tag(e)",
    "ageOption2": "Woche(n)",
    "ageOption3": "Monat(e)",
    "ageOption4": "Jahr(e)",
    "showOption1": "Bild",
    "showOption2": "Footprint",
    "date": "Datum/Datumsangaben",
    "imageLabel": "Bild(er)",
    "default": "Standard"
  },
  "twoLayerViewer": {
    "title": "Layer-Auswahl",
    "enable": "Nach einzelnen Bildern suchen",
    "tooltip": "Aktivieren Sie diese Option, um nach bestimmten Bildern zu suchen.",
    "secondary": "Legen Sie den aktiven Layer als Vergleichs-Layer fest.",
    "dropDown": "Zeigen Sie Bilder in der Dropdown-Liste an.",
    "refresh": "Schaltfläche 'Aktualisieren'",
    "refreshTooltip": "Aktualisieren Sie die Abfrage basierend auf der aktuellen Ausdehnung.",
    "renderer": "Rendering",
    "layer": "Layer",
    "show": "Einblenden",
    "age": "Suchbereich",
    "zoom": "Vergrößern Sie die Ansicht, um Bilder auszuwählen.",
    "error": "Keine sichtbaren Bilddaten-Layer auf der Karte.",
    "error1": "Das Feld wurde nicht angegeben.",
    "error2": "Kein ObjectID-Feld.",
    "error3": "Kein Kategoriefeld.",
    "error4": "Die Aktion kann für den Layer nicht ausgeführt werden.",
    "error5": "Services vor 10.2.1 werden nicht unterstützt.",
    "error6": "Keine Szenen in der aktuellen Ausdehnung.",
    "error7": "Es wurden mehr als 20 Footprints ausgewählt. Nur die ersten 20 werden angezeigt. Drücken Sie auf 'OK', damit die Warnung nicht wieder angezeigt wird.",
    "slider": "Zeigen Sie Bilder auf dem Schieberegler an.",
    "ageOption1": "Tag(e)",
    "ageOption2": "Woche(n)",
    "ageOption3": "Monat(e)",
    "ageOption4": "Jahr(e)",
    "showOption1": "Bild",
    "showOption2": "Footprint",
    "left": "Linkes Bild",
    "right": "Rechtes Bild",
    "identicalLayerError": "Das linke und das rechte Bild sind identisch.",
    "date": "Datum/Datumsangaben",
    "imageLabel": "Bild(er)",
    "default": "Standard"
  },
  "editor": {
    "title": "Editor",
    "error": "Kein Bearbeitungs-Layer gefunden.",
    "error1": "Zugriff verweigert Layer können nicht bearbeitet werden.",
    "text": "Wählen Sie ein Symbol, und klicken Sie auf die Karte."
  },
  "measurement": {
    "title": "Bildmessung",
    "error": "Messfunktionen werden nicht unterstützt."
  },
  "export": {
    "title": "Exportieren",
    "mode": "Position speichern",
    "titleText": "Titel (erforderlich)",
    "description": "Beschreibung",
    "tags": "Tags (erforderlich)",
    "preview": "Vorschau anzeigen",
    "submit": "Speichern",
    "cancel": "Abbrechen",
    "pixel": "Pixelgröße",
    "outsr": "Ausgabe-Raumbezug",
    "renderer": "Download-Optionen für TIFF-Dateien",
    "formatText1": "Wie angezeigt",
    "formatText2": "Rohdaten (alle Bänder)",
    "extent": "Zeichnen Sie ein Polygon, um die Ausdehnung zu definieren.",
    "drawText": "(zum Starten auf Bild klicken)",
    "text": "Die Rohdaten können nicht mit standardmäßigen Foto-Viewern angezeigt werden. Öffnen Sie diese mit ArcGIS Pro.",
    "error": "Keine sichtbaren Bilddaten-Layer auf der Karte.",
    "error1": "Titel ist erforderlich.",
    "error2": "Tags sind erforderlich.",
    "error3": "Die Pixelgröße des Exports ist beschränkt auf",
    "error4": "für diese Ausdehnung.",
    "error5": "Geben Sie einen gültigen numerischen Wert ein.",
    "error6": "Das Bild kann zurzeit nicht exportiert werden.",
    "thumbnailError": "Keine Miniaturansicht verfügbar",
    "advance": "Erweiterte Speicheroptionen",
    "modeOption1": "In Portal speichern",
    "modeOption2": "Auf Festplatte speichern",
    "default": "Standard",
    "utm": "WGS84-UTM-Zone",
    "layer": "Layer",
    "mercator": "WebMercatorAS",
    "folder": "Ordner auswählen"
  },
  "imageDate": {
    "label": "Bilddatum"
  },
  "about": {
    "title": "Info"
  },
  "bookmark": {
    "title": "Lesezeichen",
    "selectBookmark": "Lesezeichen auswählen",
    "default": "Standard",
    "add": "Lesezeichen hinzufügen",
    "addTitle": "Titel eingeben",
    "addBtn": "Temporär hinzufügen"
  }
});