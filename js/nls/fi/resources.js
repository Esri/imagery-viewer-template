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
    "error": "Karttaa ei voi luoda",
    "licenseError": {
      "message": "Tiliäsi ei ole lisensoitu käyttämään muunneltavissa olevia sovelluksia, jotka eivät ole julkisia. Pyydä organisaatiosi pääkäyttäjää määrittämään sinulle käyttäjätyyppi, joka sisältää keskeiset sovellukset tai keskeisten sovellusten lisäosan lisenssin.",
      "title": "Ei lisenssiä"
    }
  },
  "nav": {
    "close": "Sulje"
  },
  "basemap": {
    "title": "Taustakartat"
  },
  "operationalLayers": {
    "title": "Toiminnalliset karttatasot",
    "error": "Kartassa ei ole toiminnallisia karttatasoja."
  },
  "singleLayerViewer": {
    "title": "Kuva-aineistokarttatason valitsin",
    "enable": "Etsi yksittäisiä kuvia",
    "tooltip": "Ota käyttöön tiettyjen kuvien hakemista varten.",
    "secondary": "Määritä aktiivinen karttataso vertailukarttatasoksi.",
    "dropDown": "Näytä kuvat avattavassa luettelossa.",
    "refresh": "Päivitä-painike",
    "refreshTooltip": "Päivitä kysely nykyisen laajuuden perusteella.",
    "renderer": "Renderöinti",
    "layer": "Karttataso",
    "show": "Näytä",
    "age": "Hakualue",
    "zoom": "Valitse kuvia tarkentamalla.",
    "error": "Kartassa ei ole näkyviä kuva-aineistokarttatasoja.",
    "error1": "Kenttää ei ole määritetty.",
    "error2": "OBJECTID-kenttää ei ole.",
    "error3": "Luokkakenttää ei ole.",
    "error4": "Toimintoa ei voi tehdä karttatasossa.",
    "error5": "Versiota 10.2.1 edeltäviä palveluita ei tueta.",
    "error6": "Nykyisessä laajuudessa ei ole maisemia.",
    "error7": "Valittuja peittoalueita on yli 20. Vain ensimmäiset 20 näytetään. Älä varoita uudelleen valitsemalla OK.",
    "slider": "Näytä kuvat liukusäätimessä.",
    "ageOption1": "päivä(ä)",
    "ageOption2": "viikko(a)",
    "ageOption3": "kuukausi/kuukautta",
    "ageOption4": "vuosi/vuotta",
    "showOption1": "kuva",
    "showOption2": "Peittoalue",
    "date": "Päivämäärä(t)",
    "imageLabel": "kuva(t)",
    "default": "Oletusarvo"
  },
  "twoLayerViewer": {
    "title": "Karttatason valitsin",
    "enable": "Etsi yksittäisiä kuvia",
    "tooltip": "Ota käyttöön tiettyjen kuvien hakemista varten.",
    "secondary": "Määritä aktiivinen karttataso vertailukarttatasoksi.",
    "dropDown": "Näytä kuvat avattavassa luettelossa.",
    "refresh": "Päivitä-painike",
    "refreshTooltip": "Päivitä kysely nykyisen laajuuden perusteella.",
    "renderer": "Renderöinti",
    "layer": "Karttataso",
    "show": "Näytä",
    "age": "Hakualue",
    "zoom": "Valitse kuvia tarkentamalla.",
    "error": "Kartassa ei ole näkyviä kuva-aineistokarttatasoja.",
    "error1": "Kenttää ei ole määritetty.",
    "error2": "OBJECTID-kenttää ei ole.",
    "error3": "Luokkakenttää ei ole.",
    "error4": "Toimintoa ei voi tehdä karttatasossa.",
    "error5": "Versiota 10.2.1 edeltäviä palveluita ei tueta.",
    "error6": "Nykyisessä laajuudessa ei ole maisemia.",
    "error7": "Valittuja peittoalueita on yli 20. Vain ensimmäiset 20 näytetään. Älä varoita uudelleen valitsemalla OK.",
    "slider": "Näytä kuvat liukusäätimessä.",
    "ageOption1": "päivä(ä)",
    "ageOption2": "viikko(a)",
    "ageOption3": "kuukausi/kuukautta",
    "ageOption4": "vuosi/vuotta",
    "showOption1": "kuva",
    "showOption2": "Peittoalue",
    "left": "Vasemmanpuoleinen kuva",
    "right": "Oikeanpuoleinen kuva",
    "identicalLayerError": "Vasemman- ja oikeanpuolinen kuva on sama.",
    "date": "Päivämäärä(t)",
    "imageLabel": "kuva(t)",
    "default": "Oletusarvo"
  },
  "editor": {
    "title": "Muokkaaja",
    "error": "Muokkauskarttatasoa ei löytynyt.",
    "error1": "Käyttö estetty. Karttatasoja ei voi muokata.",
    "text": "Valitse symboli ja napsauta karttaa."
  },
  "measurement": {
    "title": "Kuvan mitat",
    "error": "Mittausominaisuuksia ei tueta."
  },
  "export": {
    "title": "Vie",
    "mode": "Tallenna sijainti",
    "titleText": "Otsikko (pakollinen)",
    "description": "Kuvaus",
    "tags": "Tunnisteet (pakollinen)",
    "preview": "Esikatselu",
    "submit": "Tallenna",
    "cancel": "Peruuta",
    "pixel": "Pikselikoko",
    "outsr": "Tulosaineiston koordinaattijärjestelmä",
    "renderer": "TIFF-kuvan latausasetukset",
    "formatText1": "Näytetyssä muodossa",
    "formatText2": "Raaka-aineisto (kaikki kaistat)",
    "extent": "Määritä laajuus piirtämällä aluekohde",
    "drawText": "(aloita napsauttamalla kuvaa)",
    "text": "Raaka-aineistoa voi tarkastella vakiomuotoisilla valokuvien katseluohjelmilla. Avaa ArcGIS Prossa.",
    "error": "Kartassa ei ole näkyviä kuva-aineistokarttatasoja.",
    "error1": "Otsikko on pakollinen.",
    "error2": "Tunniste on pakollinen.",
    "error3": "Viennin pikselikoko on rajoitettu arvoon",
    "error4": "tämän laajuuden osalta.",
    "error5": "Anna kelvollinen numeroarvo.",
    "error6": "Kuvaasi ei voi viedä tällä kertaa.",
    "thumbnailError": "Pikkukuvaa ei käytettävissä",
    "advance": "Tallennuksen lisäasetukset",
    "modeOption1": "Tallenna portaaliin",
    "modeOption2": "Tallenna levylle",
    "default": "Oletusarvo",
    "utm": "WGS84 UTM -vyöhyke",
    "layer": "Karttataso",
    "mercator": "WebMercatorAS",
    "folder": "Valitse kansio"
  },
  "imageDate": {
    "label": "Kuvan päivämäärä"
  },
  "about": {
    "title": "Tietoja"
  },
  "bookmark": {
    "title": "Kirjanmerkit",
    "selectBookmark": "Valitse kirjanmerkit",
    "default": "Oletusarvo",
    "add": "Lisää kirjanmerkkejä",
    "addTitle": "Anna otsikko",
    "addBtn": "Lisää tilapäinen"
  }
});