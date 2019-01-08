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
    "error": "マップを作成できません",
    "licenseError": {
      "message": "パブリックでないテンプレートを使用するためのライセンスがアカウントに付与されていません。 組織の管理者に Essential Apps またはアドオン Essential Apps ライセンスを含むユーザー タイプを割り当てるよう依頼してください。",
      "title": "ライセンスがありません。"
    }
  },
  "nav": {
    "close": "閉じる"
  },
  "basemap": {
    "title": "ベースマップ ギャラリー"
  },
  "operationalLayers": {
    "title": "操作レイヤー",
    "error": "マップに操作レイヤーがありません。"
  },
  "singleLayerViewer": {
    "title": "イメージ レイヤー選択",
    "enable": "個別の画像の検索",
    "tooltip": "特定の画像の検索を有効化します。",
    "secondary": "比較レイヤーとしてアクティブに設定します。",
    "dropDown": "画像をドロップ ダウン リストに表示します。",
    "refresh": "更新ボタン",
    "refreshTooltip": "現在の範囲に基づいてクエリを更新します。",
    "renderer": "レンダリング",
    "layer": "レイヤー",
    "show": "表示",
    "age": "検索範囲",
    "zoom": "拡大して画像を選択します。",
    "error": "マップに表示可能なイメージ レイヤーがありません。",
    "error1": "フィールドが指定されていません。",
    "error2": "OBJECTID フィールドがありません。",
    "error3": "カテゴリ フィールドがありません。",
    "error4": "レイヤーに対してアクションを実行できません。",
    "error5": "10.2.1 より前のサービスはサポートされていません。",
    "error6": "現在の範囲内にシーンがありません。",
    "error7": "選択したフットプリント数が 20 を超えています。 最初の 20 個のみが表示されます。 警告を再表示しないようにするには、[OK] を押します。",
    "slider": "画像をスライダー上に表示します。",
    "ageOption1": "日",
    "ageOption2": "週",
    "ageOption3": "月",
    "ageOption4": "年",
    "showOption1": "イメージ",
    "showOption2": "フットプリント",
    "date": "日付",
    "imageLabel": "画像",
    "default": "既定"
  },
  "twoLayerViewer": {
    "title": "レイヤー選択",
    "enable": "個別の画像の検索",
    "tooltip": "特定の画像の検索を有効化します。",
    "secondary": "比較レイヤーとしてアクティブに設定します。",
    "dropDown": "画像をドロップ ダウン リストに表示します。",
    "refresh": "更新ボタン",
    "refreshTooltip": "現在の範囲に基づいてクエリを更新します。",
    "renderer": "レンダリング",
    "layer": "レイヤー",
    "show": "表示",
    "age": "検索範囲",
    "zoom": "拡大して画像を選択します。",
    "error": "マップに表示可能なイメージ レイヤーがありません。",
    "error1": "フィールドが指定されていません。",
    "error2": "OBJECTID フィールドがありません。",
    "error3": "カテゴリ フィールドがありません。",
    "error4": "レイヤーに対してアクションを実行できません。",
    "error5": "10.2.1 より前のサービスはサポートされていません。",
    "error6": "現在の範囲内にシーンがありません。",
    "error7": "選択したフットプリント数が 20 を超えています。 最初の 20 個のみが表示されます。 警告を再表示しないようにするには、[OK] を押します。",
    "slider": "画像をスライダー上に表示します。",
    "ageOption1": "日",
    "ageOption2": "週",
    "ageOption3": "月",
    "ageOption4": "年",
    "showOption1": "イメージ",
    "showOption2": "フットプリント",
    "left": "左の画像",
    "right": "右の画像",
    "identicalLayerError": "左と右の画像が同じです。",
    "date": "日付",
    "imageLabel": "画像",
    "default": "既定"
  },
  "editor": {
    "title": "エディター",
    "error": "編集レイヤーが見つかりません。",
    "error1": "アクセスが拒否されました。レイヤーを編集できません。",
    "text": "シンボルを選択し、マップをクリックします。"
  },
  "measurement": {
    "title": "画像計測",
    "error": "計測機能がサポートされていません。"
  },
  "export": {
    "title": "エクスポート",
    "mode": "位置の保存",
    "titleText": "タイトル (必須)",
    "description": "説明",
    "tags": "タグ (必須)",
    "preview": "プレビュー",
    "submit": "保存",
    "cancel": "キャンセル",
    "pixel": "ピクセル サイズ",
    "outsr": "出力データの空間参照",
    "renderer": "TIFF ダウンロード オプション",
    "formatText1": "表示",
    "formatText2": "未処理データ (すべてのバンド)",
    "extent": "ポリゴンを描画して範囲を定義",
    "drawText": "(画像をクリックすると開始します)",
    "text": "標準の写真ビューアーを使用して未処理データを表示することはできません。 ArcGIS Pro で開きます。",
    "error": "マップに表示可能なイメージ レイヤーがありません。",
    "error1": "タイトルの指定が必須です。",
    "error2": "タグが必要です。",
    "error3": "この範囲の場合、エクスポートのピクセルサイズは、",
    "error4": "に制限されます。",
    "error5": "有効な数値を入力してください。",
    "error6": "この時点で画像をエクスポートすることはできません。",
    "thumbnailError": "利用可能なサムネイルがありません",
    "advance": "高度な保存オプション",
    "modeOption1": "ポータルに保存",
    "modeOption2": "ディスクに保存",
    "default": "既定",
    "utm": "WGS84 UTM ゾーン",
    "layer": "レイヤー",
    "mercator": "WebMercatorAS",
    "folder": "フォルダー選択"
  },
  "imageDate": {
    "label": "画像の日付"
  },
  "about": {
    "title": "情報"
  },
  "bookmark": {
    "title": "ブックマーク",
    "selectBookmark": "ブックマークの選択",
    "default": "既定",
    "add": "ブックマークの追加",
    "addTitle": "タイトルの入力",
    "addBtn": "一時的な追加"
  }
});