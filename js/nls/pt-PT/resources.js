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
    "error": "Não foi possível criar mapa",
    "licenseError": {
      "message": "A sua conta não está licenciada para usar aplicações configuráveis não públicas. Peça ao administrador da sua organização para lhe atribuir um tipo de utilizador que inclua a licença para aplicações essenciais ou aplicações essenciais complementares.",
      "title": "Não licenciado"
    }
  },
  "nav": {
    "close": "Fechar"
  },
  "basemap": {
    "title": "Galeria de Mapas Base"
  },
  "operationalLayers": {
    "title": "Camadas Operacionais",
    "error": "Não existem camadas operacionais no mapa."
  },
  "singleLayerViewer": {
    "title": "Seletor de Camadas de Imagens",
    "enable": "Pesquisar imagens individuais",
    "tooltip": "Ative para pesquisar imagens específicas.",
    "secondary": "Definir Ativo como Camada de Comparação.",
    "dropDown": "Exibir imagens em lista pendente.",
    "refresh": "Botão Atualizar",
    "refreshTooltip": "Atualizar consulta com base na extensão atual.",
    "renderer": "A Renderizar",
    "layer": "Camada",
    "show": "Exibir",
    "age": "Pesquisar intervalo",
    "zoom": "Ampliar para selecionar imagens.",
    "error": "Não existem Camadas de Imagens visíveis no mapa.",
    "error1": "O campo não se encontra especificado.",
    "error2": "Não existe campo OBJECTID.",
    "error3": "Não existe campo de Categoria",
    "error4": "Não é possível aplicar ação para a camada.",
    "error5": "Serviços anteriores à versão 10.2.1 não-suportados.",
    "error6": "Não existem cenas na extensão atual.",
    "error7": "O número de pegadas selecionado excede as 20. Apenas as primeiras 20 serão exibidas. Prima OK para não ser avisado novamente.",
    "slider": "Exibir imagens em slider.",
    "ageOption1": "Dia(s)",
    "ageOption2": "Semana(s)",
    "ageOption3": "Mês(es)",
    "ageOption4": "Ano(s)",
    "showOption1": "Imagem",
    "showOption2": "Footprint",
    "date": "Data(s)",
    "imageLabel": "Imagem(ens)",
    "default": "Padrão"
  },
  "twoLayerViewer": {
    "title": "Seletor de Camadas",
    "enable": "Pesquisar imagens individuais",
    "tooltip": "Ative para pesquisar imagens específicas.",
    "secondary": "Definir Ativo como Camada de Comparação.",
    "dropDown": "Exibir imagens em lista pendente.",
    "refresh": "Botão Atualizar",
    "refreshTooltip": "Atualizar consulta com base na extensão atual.",
    "renderer": "A Renderizar",
    "layer": "Camada",
    "show": "Exibir",
    "age": "Pesquisar intervalo",
    "zoom": "Ampliar para selecionar imagens.",
    "error": "Não existem Camadas de Imagens visíveis no mapa.",
    "error1": "O campo não se encontra especificado.",
    "error2": "Não existe campo OBJECTID.",
    "error3": "Não existe campo de Categoria",
    "error4": "Não é possível aplicar ação para a camada.",
    "error5": "Serviços anteriores à versão 10.2.1 não-suportados.",
    "error6": "Não existem cenas na extensão atual.",
    "error7": "O número de pegadas selecionado excede as 20. Apenas as primeiras 20 serão exibidas. Prima OK para não ser avisado novamente.",
    "slider": "Exibir imagens em slider.",
    "ageOption1": "Dia(s)",
    "ageOption2": "Semana(s)",
    "ageOption3": "Mês(es)",
    "ageOption4": "Ano(s)",
    "showOption1": "Imagem",
    "showOption2": "Footprint",
    "left": "Imagem Esquerda",
    "right": "Imagem Direita",
    "identicalLayerError": "Imagens Esquerda e Direita são idênticas.",
    "date": "Data(s)",
    "imageLabel": "Imagem(ens)",
    "default": "Padrão"
  },
  "editor": {
    "title": "Editor",
    "error": "Não foi encontrada qualquer Camada de Edição.",
    "error1": "Acesso negado. Não é possível editar as camadas.",
    "text": "Selecione um símbolo e clique no mapa."
  },
  "measurement": {
    "title": "Medição de Imagens",
    "error": "Funcionalidades de Mensuração não suportadas."
  },
  "export": {
    "title": "Exportar",
    "mode": "Guardar localização",
    "titleText": "Título(obrigatório)",
    "description": "Descrição",
    "tags": "Palavras-chave(obrigatórias)",
    "preview": "Pré-visualizar",
    "submit": "Guardar",
    "cancel": "Cancelar",
    "pixel": "Tamanho de Pixeis",
    "outsr": "Referência Espacial de Saída",
    "renderer": "Opções de transferência TIFF",
    "formatText1": "Como exibido",
    "formatText2": "Dados raw(todas as bandas)",
    "extent": "Desenhar polígono para definir extensão",
    "drawText": "(clique na imagem para iniciar)",
    "text": "Os dados raw não podem ser exibidos com visualizadores de fotos padrão. Abrir com o ArcGIS Pro.",
    "error": "Não existem camadas de imagens visíveis no mapa.",
    "error1": "O Título é obrigatório.",
    "error2": "Palavra(s) Chave são obrigatórias.",
    "error3": "PixelSize de exportar encontra-se restrito a",
    "error4": "para esta extensão.",
    "error5": "Por favor, introduza um valor numérico válido.",
    "error6": "Não é possível exportar a sua imagem de momento.",
    "thumbnailError": "Nenhuma miniatura disponível",
    "advance": "Opções avançadas para guardar",
    "modeOption1": "Guardar no portal",
    "modeOption2": "Guardar no disco",
    "default": "Padrão",
    "utm": "Zona WGS84 UTM",
    "layer": "Camada",
    "mercator": "WebMercatorAS",
    "folder": "Selecionar pasta"
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
    "addTitle": "Introduzir título",
    "addBtn": "Adicionar temporário"
  }
});