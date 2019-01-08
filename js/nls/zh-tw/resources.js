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
    "error": "無法建立地圖",
    "licenseError": {
      "message": "您的帳號未經授權，無法使用非公開的可配置應用程式。 請聯繫您的組織管理員，請其將包含基礎應用程式或附加元件基礎應用程式授權的使用者類型指派給您。",
      "title": "未經許可"
    }
  },
  "nav": {
    "close": "關閉"
  },
  "basemap": {
    "title": "底圖庫"
  },
  "operationalLayers": {
    "title": "操作圖層",
    "error": "地圖中沒有操作圖層。"
  },
  "singleLayerViewer": {
    "title": "影像圖層選擇器",
    "enable": "搜尋個別圖片",
    "tooltip": "啟用以搜尋特定的圖片。",
    "secondary": "將作用中設為比較圖層。",
    "dropDown": "在下拉式清單中顯示圖片。",
    "refresh": "重新整理按鈕",
    "refreshTooltip": "根據目前的範圍重新整理查詢。",
    "renderer": "渲染",
    "layer": "圖層",
    "show": "顯示",
    "age": "搜索範圍",
    "zoom": "放大以選擇圖片。",
    "error": "地圖中沒有可見的影像圖層。",
    "error1": "欄位未指定。",
    "error2": "無 OBJECTID 欄位。",
    "error3": "無類別欄位。",
    "error4": "無法執行圖層的動作。",
    "error5": "不支援依照 10.2.1 的服務。",
    "error6": "目前的範圍中沒有場景。",
    "error7": "選擇的覆蓋區數目超過 20。 只會顯示前 20 個。 按下「確定」不再顯示警示。",
    "slider": "在滑桿上顯示圖片。",
    "ageOption1": "天",
    "ageOption2": "週",
    "ageOption3": "月",
    "ageOption4": "年",
    "showOption1": "圖片",
    "showOption2": "輪廓",
    "date": "日期",
    "imageLabel": "圖片",
    "default": "預設"
  },
  "twoLayerViewer": {
    "title": "圖層選擇器",
    "enable": "搜尋個別圖片",
    "tooltip": "啟用以搜尋特定的圖片。",
    "secondary": "將作用中設為比較圖層。",
    "dropDown": "在下拉式清單中顯示圖片。",
    "refresh": "重新整理按鈕",
    "refreshTooltip": "根據目前的範圍重新整理查詢。",
    "renderer": "渲染",
    "layer": "圖層",
    "show": "顯示",
    "age": "搜索範圍",
    "zoom": "放大以選擇圖片。",
    "error": "地圖中沒有可見的影像圖層。",
    "error1": "欄位未指定。",
    "error2": "無 OBJECTID 欄位。",
    "error3": "無類別欄位。",
    "error4": "無法執行圖層的動作。",
    "error5": "不支援依照 10.2.1 的服務。",
    "error6": "目前的範圍中沒有場景。",
    "error7": "選擇的覆蓋區數目超過 20。 只會顯示前 20 個。 按下「確定」不再顯示警示。",
    "slider": "在滑桿上顯示圖片。",
    "ageOption1": "天",
    "ageOption2": "週",
    "ageOption3": "月",
    "ageOption4": "年",
    "showOption1": "圖片",
    "showOption2": "輪廓",
    "left": "左側影像",
    "right": "右側影像",
    "identicalLayerError": "左側和右側圖片是相同的。",
    "date": "日期",
    "imageLabel": "圖片",
    "default": "預設"
  },
  "editor": {
    "title": "編輯器",
    "error": "找不到「編輯圖層」。",
    "error1": "拒絕存取。 無法編輯圖層。",
    "text": "選擇符號並按一下地圖。"
  },
  "measurement": {
    "title": "圖像測量",
    "error": "不支援「測量能力」。"
  },
  "export": {
    "title": "匯出",
    "mode": "儲存位置",
    "titleText": "標題 (必填項)",
    "description": "描述",
    "tags": "標記 (必填項)",
    "preview": "預覽",
    "submit": "儲存",
    "cancel": "取消",
    "pixel": "像素大小",
    "outsr": "輸出空間參考",
    "renderer": "TIFF 下載選項",
    "formatText1": "如圖所示",
    "formatText2": "原生資料 (所有頻帶)",
    "extent": "繪製多邊形以定義範圍",
    "drawText": "(按一下圖片以開始)",
    "text": "無法使用標準相片檢視器來顯示原生資料。 使用 ArcGIS Pro 開啟。",
    "error": "地圖上沒有可見的影像圖層。",
    "error1": "標題為必填項。",
    "error2": "標記為必填項。",
    "error3": "匯出的 PixelSize 限制",
    "error4": "此範圍。",
    "error5": "請輸入有效的數值。",
    "error6": "目前無法匯出您的圖片。",
    "thumbnailError": "無可用的縮圖",
    "advance": "進階儲存選項",
    "modeOption1": "儲存到入口網站",
    "modeOption2": "儲存到磁碟",
    "default": "預設",
    "utm": "WGS84 UTM 區域",
    "layer": "圖層",
    "mercator": "WebMercatorAS",
    "folder": "選擇資料夾"
  },
  "imageDate": {
    "label": "圖片日期"
  },
  "about": {
    "title": "關於"
  },
  "bookmark": {
    "title": "書籤",
    "selectBookmark": "選擇書籤",
    "default": "預設",
    "add": "新增書籤",
    "addTitle": "輸入標題",
    "addBtn": "新增臨時"
  }
});