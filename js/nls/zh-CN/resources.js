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
    "error": "无法创建地图",
    "licenseError": {
      "message": "您的帐户无权使用非公共的可配置应用程序。 请联系您的组织管理员为您分配包含基本应用程序或附加基本应用程序许可的用户类型。",
      "title": "未经许可"
    }
  },
  "nav": {
    "close": "关闭"
  },
  "basemap": {
    "title": "底图库"
  },
  "operationalLayers": {
    "title": "业务图层",
    "error": "地图中无业务图层。"
  },
  "singleLayerViewer": {
    "title": "影像图层选择器",
    "enable": "搜索单个影像",
    "tooltip": "启用特定影像搜索。",
    "secondary": "将活动图层设置为比较图层。",
    "dropDown": "在下拉列表中显示影像。",
    "refresh": "刷新按钮",
    "refreshTooltip": "根据当前范围刷新查询。",
    "renderer": "渲染",
    "layer": "图层",
    "show": "显示",
    "age": "搜索范围",
    "zoom": "放大以选择影像。",
    "error": "地图中没有可见的影像图层。",
    "error1": "未指定字段。",
    "error2": "无 OBJECTID 字段。",
    "error3": "无类别字段。",
    "error4": "无法对图层执行操作。",
    "error5": "不支持 10.2.1 版本前的服务。",
    "error6": "当前范围内无场景。",
    "error7": "所选覆盖区数量超过 20 个。 将仅显示前 20 个覆盖区。 按“确定”不再显示警告。",
    "error8": "图像数据仅在以下日期范围可用 ",
    "error9": "日期范围无效：开始日期必须小于结束日期。",
    "slider": "在滑块上显示影像。",
    "ageOption1": "天",
    "ageOption2": "周",
    "ageOption3": "月",
    "ageOption4": "年",
    "showOption1": "影像",
    "showOption2": "轮廓线",
    "date": "日期",
    "imageLabel": "影像",
    "default": "默认"
  },
  "twoLayerViewer": {
    "title": "图层选择器",
    "enable": "搜索单个影像",
    "tooltip": "启用特定影像搜索。",
    "secondary": "将活动图层设置为比较图层。",
    "dropDown": "在下拉列表中显示影像。",
    "refresh": "刷新按钮",
    "refreshTooltip": "根据当前范围刷新查询。",
    "renderer": "渲染",
    "layer": "图层",
    "show": "显示",
    "age": "搜索范围",
    "zoom": "放大以选择影像。",
    "error": "地图中没有可见的影像图层。",
    "error1": "未指定字段。",
    "error2": "无 OBJECTID 字段。",
    "error3": "无类别字段。",
    "error4": "无法对图层执行操作。",
    "error5": "不支持 10.2.1 版本前的服务。",
    "error6": "当前范围内无场景。",
    "error7": "所选覆盖区数量超过 20 个。 将仅显示前 20 个覆盖区。 按“确定”不再显示警告。",
    "error8": "图像数据仅在以下日期范围可用 ",
    "error9": "日期范围无效：开始日期必须小于结束日期。",
    "slider": "在滑块上显示影像。",
    "ageOption1": "天",
    "ageOption2": "周",
    "ageOption3": "月",
    "ageOption4": "年",
    "showOption1": "影像",
    "showOption2": "轮廓线",
    "left": "左侧影像",
    "right": "右侧影像",
    "identicalLayerError": "左侧影像和右侧影像相同。",
    "date": "日期",
    "imageLabel": "影像",
    "default": "默认"
  },
  "editor": {
    "title": "编辑器",
    "error": "未找到编辑图层。",
    "error1": "访问被拒绝。 无法编辑图层。",
    "text": "选择一个符号并在地图上单击。"
  },
  "measurement": {
    "title": "影像测量",
    "error": "不支持测量功能。"
  },
  "export": {
    "title": "导出",
    "mode": "保存位置",
    "titleText": "标题(必填项)",
    "description": "描述",
    "tags": "标签(必填项)",
    "preview": "预览",
    "submit": "保存",
    "cancel": "取消",
    "pixel": "像素大小",
    "outsr": "输出空间参考",
    "renderer": "TIFF 下载选项",
    "formatText1": "如显示",
    "formatText2": "原始数据(所有波段)",
    "extent": "绘制用于定义范围的面",
    "drawText": "(单击影像以开始)",
    "text": "标准照片查看器无法显示原始数据。 使用 ArcGIS Pro 打开。",
    "error": "地图中没有可见的影像图层。",
    "error1": "标题为必填项。",
    "error2": "标签(一个或多个)为必填项。",
    "error3": "导出内容的像素大小限制为",
    "error4": "针对此范围。",
    "error5": "请输入有效的数值。",
    "error6": "此时无法导出影像。",
    "thumbnailError": "无可用缩略图",
    "advance": "高级保存选项。",
    "modeOption1": "保存到门户",
    "modeOption2": "保存到磁盘",
    "default": "默认",
    "utm": "WGS84 UTM 带",
    "layer": "图层",
    "mercator": "WebMercatorAS",
    "folder": "选择文件夹"
  },
  "imageDate": {
    "label": "影像数据"
  },
  "about": {
    "title": "关于"
  },
  "bookmark": {
    "title": "书签",
    "selectBookmark": "选择书签",
    "default": "默认",
    "add": "添加书签",
    "addTitle": "输入标题",
    "addBtn": "添加临时"
  },
  "coordinate": {
    "_widgetLabel": "坐标",
    "hintMessage": "单击地图以获取坐标",
    "defaultLabel": "默认",
    "realtimeLabel": "移动鼠标以获取坐标",
    "computing": "正在计算...",
    "latitudeLabel": "纬度",
    "longitudeLabel": "经度",
    "loading": "正在加载...",
    "enableClick": "单击‘启用单击地图以获取坐标’",
    "disableClick": "单击‘禁用单击地图以获取坐标’",
    "Default": "默认",
    "Inches": "英寸",
    "Foot": "英尺",
    "Foot_US": "美制英尺",
    "Yards": "码",
    "Miles": "英里",
    "Nautical_Miles": "海里",
    "Millimeters": "毫米",
    "Centimeters": "厘米",
    "Meter": "米",
    "Kilometers": "千米",
    "Decimeters": "分米",
    "Decimal_Degrees": "度",
    "Degree_Minutes_Seconds": "度分秒",
    "MGRS": "MGRS",
    "USNG": "USNG"
  }
});