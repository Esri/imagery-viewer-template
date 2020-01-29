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
    "error": "Não foi possível criar o mapa",
    "licenseError": {
      "message": "Sua conta não está licenciada para utilizar Aplicativos Configuráveis que não sejam públicos. Solicite ao administrador da sua organização que lhe atribua um tipo de usuário que inclua os Aplicativos Fundamentais ou uma licença complementar dos Aplicativos Fundamentais.",
      "title": "Não Licenciado"
    }
  },
  "nav": {
    "close": "Fechar"
  },
  "basemap": {
    "title": "Galeria de Mapa Base"
  },
  "operationalLayers": {
    "title": "Camadas Operacionais",
    "error": "Nenhuma camada operacional no mapa."
  },
  "singleLayerViewer": {
    "title": "Seletor de Camada de Imagem",
    "enable": "Pesquisar por imagens individuais",
    "tooltip": "Habilita para procurar por imagens específicas.",
    "secondary": "Define Ativo como Camada de Comparação.",
    "dropDown": "Mostra imagens na lista suspensa.",
    "refresh": "Botão Atualizar",
    "refreshTooltip": "Atualiza a consulta com base na extensão atual.",
    "renderer": "Renderização",
    "layer": "Camada",
    "show": "Mostrar",
    "age": "Faixa de pesquisa",
    "zoom": "Amplia nas imagens selecionadas.",
    "error": "Nenhuma Camada de Imagem visível no mapa.",
    "error1": "O campo não está especificado.",
    "error2": "Sem campo de OBJECTID.",
    "error3": "Sem campo de Categoria.",
    "error4": "Não é possível executar a ação na camada.",
    "error5": "Serviços pré 10.2.1 não suportados.",
    "error6": "Nenhuma cena na extensão atual.",
    "error7": "O número de áreas de cobertura selecionadas excede 20. Somente as primeiras 20 serão exibidas. Pressione OK para não avisar novamente.",
    "error8": "Dados de imagem disponíveis somente entre ",
    "error9": "Intervalo de data inválido: a Data Inicial deve ser menor que a Data Final.",
    "slider": "Mostra imagens no controle deslizante.",
    "ageOption1": "Dias",
    "ageOption2": "Semanas",
    "ageOption3": "Meses",
    "ageOption4": "Anos",
    "showOption1": "Imagem",
    "showOption2": "Área de Cobertura",
    "date": "Datas",
    "imageLabel": "imagens",
    "default": "Padrão"
  },
  "twoLayerViewer": {
    "title": "Seletor de Camada",
    "enable": "Pesquisar por imagens individuais",
    "tooltip": "Habilita para procurar por imagens específicas.",
    "secondary": "Define Ativo como Camada de Comparação.",
    "dropDown": "Mostra imagens na lista suspensa.",
    "refresh": "Botão Atualizar",
    "refreshTooltip": "Atualiza a consulta com base na extensão atual.",
    "renderer": "Renderização",
    "layer": "Camada",
    "show": "Mostrar",
    "age": "Faixa de pesquisa",
    "zoom": "Amplia nas imagens selecionadas.",
    "error": "Nenhuma Camada de Imagem visível no mapa.",
    "error1": "O campo não está especificado.",
    "error2": "Sem campo de OBJECTID.",
    "error3": "Sem campo de Categoria.",
    "error4": "Não é possível executar a ação na camada.",
    "error5": "Serviços pré 10.2.1 não suportados.",
    "error6": "Nenhuma cena na extensão atual.",
    "error7": "O número de áreas de cobertura selecionadas excede 20. Somente as primeiras 20 serão exibidas. Pressione OK para não avisar novamente.",
    "error8": "Dados de imagem disponíveis somente entre ",
    "error9": "Intervalo de data inválido: a Data Inicial deve ser menor que a Data Final.",
    "slider": "Mostra imagens no controle deslizante.",
    "ageOption1": "Dias",
    "ageOption2": "Semanas",
    "ageOption3": "Meses",
    "ageOption4": "Anos",
    "showOption1": "Imagem",
    "showOption2": "Área de Cobertura",
    "left": "Imagem esquerda",
    "right": "Imagem direita",
    "identicalLayerError": "A Image da Esquerda e Direita são idênticas.",
    "date": "Datas",
    "imageLabel": "imagens",
    "default": "Padrão"
  },
  "editor": {
    "title": "Editor",
    "error": "Nenhuma Camada de Edição encontrada.",
    "error1": "Acesso negado. As camadas não podem ser editadas.",
    "text": "Selecione um símbolo e clique no mapa."
  },
  "measurement": {
    "title": "Medida da Imagem",
    "error": "Recursos de Medição não suportados."
  },
  "export": {
    "title": "Exportar",
    "mode": "Salvar localização",
    "titleText": "Título(exigido)",
    "description": "Descrição",
    "tags": "Tags(exigida)",
    "preview": "Visualizar",
    "submit": "Salvar",
    "cancel": "Cancelar",
    "pixel": "Tamanho do Pixel",
    "outsr": "Referência Espacial de Saída",
    "renderer": "Opções de download de TIFF",
    "formatText1": "Como exibido",
    "formatText2": "Dados brutos(todas as bandas)",
    "extent": "Desenhar polígono para definir a extensão",
    "drawText": "(clique na imagem para iniciar)",
    "text": "Os dados brutos não podem ser exibidos com visualizadores de fotos padrão. Abra com ArcGIS Pro.",
    "error": "Nenhuma camada de imagem visível no mapa.",
    "error1": "O título é necessário.",
    "error2": "Tags são exigidas.",
    "error3": "O Tamanho do Pixel de exportação é restrito a",
    "error4": "desta extensão.",
    "error5": "Insira um valor numérico válido.",
    "error6": "Sua imagem não pode ser exportada neste momento.",
    "thumbnailError": "Nenhuma miniatura disponível",
    "advance": "Opções avançadas para salvar",
    "modeOption1": "Salvar no portal",
    "modeOption2": "Salvar no disco",
    "default": "Padrão",
    "utm": "Zona WGS84 UTM",
    "layer": "Camada",
    "mercator": "WebMercatorAS",
    "folder": "Selecionar Pasta"
  },
  "imageDate": {
    "label": "Data da Imagem"
  },
  "about": {
    "title": "Sobre"
  },
  "bookmark": {
    "title": "Marcadores",
    "selectBookmark": "Selecionar marcadores",
    "default": "Padrão",
    "add": "Adicionar marcadores",
    "addTitle": "Inserir título",
    "addBtn": "Adicionar temporário"
  },
  "coordinate": {
    "_widgetLabel": "Coordenada",
    "hintMessage": "Clique no mapa para obter coordenadas",
    "defaultLabel": "Padrão",
    "realtimeLabel": "Mover mouse para obter coordenadas",
    "computing": "Calculando...",
    "latitudeLabel": "Latitude",
    "longitudeLabel": "Longitude",
    "loading": "carregando...",
    "enableClick": "Clique para habilitar o clique no mapa para obter coordenadas",
    "disableClick": "Clique para desabilitar o clique no mapa para obter coordenadas",
    "Default": "Padrão",
    "Inches": "Polegadas",
    "Foot": "Pés",
    "Foot_US": "Feet_US",
    "Yards": "Jardas",
    "Miles": "Milhas",
    "Nautical_Miles": "Milhas náuticas",
    "Millimeters": "Milímetros",
    "Centimeters": "Centímetros",
    "Meter": "Metros",
    "Kilometers": "Quilômetros",
    "Decimeters": "Decímetros",
    "Decimal_Degrees": "Graus",
    "Degree_Minutes_Seconds": "Graus minutos segundos",
    "MGRS": "MGRS",
    "USNG": "USNG"
  }
});