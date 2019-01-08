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
    "error": "No se puede crear el mapa",
    "licenseError": {
      "message": "Su cuenta no tiene licencia para utilizar aplicaciones configurables que no son públicas. Pídale al administrador de su organización que le asigne un tipo de usuario que incluya aplicaciones esenciales o una licencia complementaria de aplicaciones esenciales.",
      "title": "Sin licencia"
    }
  },
  "nav": {
    "close": "Cerrar"
  },
  "basemap": {
    "title": "Galería de mapas base"
  },
  "operationalLayers": {
    "title": "Capas operativas",
    "error": "No hay capas operativas en el mapa."
  },
  "singleLayerViewer": {
    "title": "Selector de capas de imágenes",
    "enable": "Buscar imágenes individuales",
    "tooltip": "Habilítelo para buscar imágenes específicas.",
    "secondary": "Usar la activa como Capa de comparación.",
    "dropDown": "Mostrar imágenes en la lista desplegable.",
    "refresh": "Botón Refrescar",
    "refreshTooltip": "Actualizar la consulta basándose en la extensión actual.",
    "renderer": "Representación",
    "layer": "Capa",
    "show": "Mostrar",
    "age": "Rango de búsqueda",
    "zoom": "Acercar para seleccionar imágenes.",
    "error": "Capas de imágenes no visibles en el mapa.",
    "error1": "Campo no especificado.",
    "error2": "Sin campo OBJECTID.",
    "error3": "Sin campo Categoría.",
    "error4": "Imposible realizar una acción para la capa.",
    "error5": "Servicios anteriores a 10.2.1 no compatibles.",
    "error6": "Sin escenas en la extensión actual.",
    "error7": "El número de huellas seleccionadas rebasa las 20. Solo se visualizarán las primeras 20. Pulse Aceptar para no volver a ver esta advertencia.",
    "slider": "Mostrar imágenes en un control deslizante.",
    "ageOption1": "Días",
    "ageOption2": "Semana(s)",
    "ageOption3": "Mes(es)",
    "ageOption4": "Año(s)",
    "showOption1": "Imagen",
    "showOption2": "Huella",
    "date": "Fecha(s)",
    "imageLabel": "imagen(es)",
    "default": "Predeterminado"
  },
  "twoLayerViewer": {
    "title": "Selector de capas",
    "enable": "Buscar imágenes individuales",
    "tooltip": "Habilítelo para buscar imágenes específicas.",
    "secondary": "Usar la activa como Capa de comparación.",
    "dropDown": "Mostrar imágenes en la lista desplegable.",
    "refresh": "Botón Refrescar",
    "refreshTooltip": "Actualizar la consulta basándose en la extensión actual.",
    "renderer": "Representación",
    "layer": "Capa",
    "show": "Mostrar",
    "age": "Rango de búsqueda",
    "zoom": "Acercar para seleccionar imágenes.",
    "error": "Capas de imágenes no visibles en el mapa.",
    "error1": "Campo no especificado.",
    "error2": "Sin campo OBJECTID.",
    "error3": "Sin campo Categoría.",
    "error4": "Imposible realizar una acción para la capa.",
    "error5": "Servicios anteriores a 10.2.1 no compatibles.",
    "error6": "Sin escenas en la extensión actual.",
    "error7": "El número de huellas seleccionadas rebasa las 20. Solo se visualizarán las primeras 20. Pulse Aceptar para no volver a ver esta advertencia.",
    "slider": "Mostrar imágenes en un control deslizante.",
    "ageOption1": "Días",
    "ageOption2": "Semana(s)",
    "ageOption3": "Mes(es)",
    "ageOption4": "Año(s)",
    "showOption1": "Imagen",
    "showOption2": "Huella",
    "left": "Imagen izquierda",
    "right": "Imagen derecha",
    "identicalLayerError": "Las imágenes izquierda y derecha son idénticas.",
    "date": "Fecha(s)",
    "imageLabel": "imagen(es)",
    "default": "Predeterminado"
  },
  "editor": {
    "title": "Editor",
    "error": "No se encontró ninguna capa de edición.",
    "error1": "Acceso denegado. Las capas no se pueden editar.",
    "text": "Seleccione un símbolo y haga clic en el mapa."
  },
  "measurement": {
    "title": "Medición de imagen",
    "error": "Funciones de medición no compatibles."
  },
  "export": {
    "title": "Exportar",
    "mode": "Guardar ubicación",
    "titleText": "Título (obligatorio)",
    "description": "Descripción",
    "tags": "Etiquetas (obligatorias)",
    "preview": "Previsualización",
    "submit": "Guardar",
    "cancel": "Cancelar",
    "pixel": "Tamaño de píxel",
    "outsr": "Referencia espacial de salida",
    "renderer": "Opciones de descarga de TIFF",
    "formatText1": "Como se muestra",
    "formatText2": "Datos sin procesar (todas las bandas)",
    "extent": "Dibujar polígono para definir la extensión",
    "drawText": "(haga clic en la imagen para empezar)",
    "text": "No es posible mostrar los datos sin procesar con visores de imágenes estándar. Abrir con ArcGIS Pro.",
    "error": "No hay capas de imágenes visibles en el mapa.",
    "error1": "Se requiere un título.",
    "error2": "Se requieren una o varias etiquetas.",
    "error3": "Valor PixelSize de la exportación restringido a",
    "error4": "para esta extensión.",
    "error5": "Introduzca un valor numérico válido.",
    "error6": "No es posible exportar su imagen en estos momentos.",
    "thumbnailError": "Vista en miniatura no disponible",
    "advance": "Opciones avanzadas de guardado",
    "modeOption1": "Guardar en el portal",
    "modeOption2": "Guardar en el disco",
    "default": "Predeterminado",
    "utm": "Zona UTM WGS84",
    "layer": "Capa",
    "mercator": "WebMercatorAS",
    "folder": "Seleccionar carpeta"
  },
  "imageDate": {
    "label": "Fecha de imágenes"
  },
  "about": {
    "title": "Acerca de"
  },
  "bookmark": {
    "title": "Marcadores",
    "selectBookmark": "Seleccionar marcadores",
    "default": "Predeterminado",
    "add": "Agregar marcadores",
    "addTitle": "Introducir título",
    "addBtn": "Agregar temporal"
  }
});