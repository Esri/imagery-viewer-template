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
    "error": "يتعذر إنشاء الخريطة",
    "licenseError": {
      "message": "حسابك غير مرخص لاستخدام التطبيقات القابلة للتكوين غير العامة. رجاءً اطلب من مسئولي المؤسسة تعيينك كنوع مستخدم يتضمن التطبيقات الأساسية أو ترخيص التطبيقات الأساسية المضافة.",
      "title": "غير مرخص"
    }
  },
  "nav": {
    "close": "إغلاق"
  },
  "basemap": {
    "title": "معرض خرائط الأساس"
  },
  "operationalLayers": {
    "title": "طبقات جاهزة للعمل",
    "error": "لا توجد طبقات تشغيلية في خريطة الويب."
  },
  "singleLayerViewer": {
    "title": "أداة تحديد طبقة الصور",
    "enable": "بحث عن صور فردية",
    "tooltip": "قم بالتمكين للبحث عن صور محددة.",
    "secondary": "تعيين النشطة كطبقة مقارنة",
    "dropDown": "عرض الصور في قائمة منسدلة.",
    "refresh": "زر التحديث",
    "refreshTooltip": "تحديث الاستعلام بناءً على المدى الحالى.",
    "renderer": "إظهار",
    "layer": "طبقة",
    "show": "عرض",
    "age": "نطاق البحث",
    "zoom": "تكبير لتحديد الصور.",
    "error": "لا توجد طبقات صور مرئية في الخريطة.",
    "error1": "اسم الحقل غير مُحدد.",
    "error2": "لا يوجد حقل OBJECTID.",
    "error3": "لا يوجد حقل فئة.",
    "error4": "يتعذر تنفيذ إجراء في هذه الطبقة.",
    "error5": "الخدمات التي تسبق الإصدار 10.2.1 غير مدعومة.",
    "error6": "لا توجد مشاهد في المدى الحالي.",
    "error7": "عدد المواضع المحددة يتجاوز 20. لن يتم عرض إلا أول 20. اضغط على موافق لعدم التحذير مرة أخرى.",
    "slider": "عرض الصور على شريط التمرير.",
    "ageOption1": "أيام",
    "ageOption2": "أسابيع",
    "ageOption3": "شهور",
    "ageOption4": "سنة (سنوات)",
    "showOption1": "صورة",
    "showOption2": "موضع",
    "date": "تاريخ/تواريخ",
    "imageLabel": "صورة/صور",
    "default": "الوضع الافتراضي"
  },
  "twoLayerViewer": {
    "title": "محدد الطبقة",
    "enable": "بحث عن صور فردية",
    "tooltip": "قم بالتمكين للبحث عن صور محددة.",
    "secondary": "تعيين النشطة كطبقة مقارنة",
    "dropDown": "عرض الصور في قائمة منسدلة.",
    "refresh": "زر التحديث",
    "refreshTooltip": "تحديث الاستعلام بناءً على المدى الحالى.",
    "renderer": "إظهار",
    "layer": "طبقة",
    "show": "عرض",
    "age": "نطاق البحث",
    "zoom": "تكبير لتحديد الصور.",
    "error": "لا توجد طبقات صور مرئية في الخريطة.",
    "error1": "اسم الحقل غير مُحدد.",
    "error2": "لا يوجد حقل OBJECTID.",
    "error3": "لا يوجد حقل فئة.",
    "error4": "يتعذر تنفيذ إجراء في هذه الطبقة.",
    "error5": "الخدمات التي تسبق الإصدار 10.2.1 غير مدعومة.",
    "error6": "لا توجد مشاهد في المدى الحالي.",
    "error7": "عدد المواضع المحددة يتجاوز 20. لن يتم عرض إلا أول 20. اضغط على موافق لعدم التحذير مرة أخرى.",
    "slider": "عرض الصور على شريط التمرير.",
    "ageOption1": "أيام",
    "ageOption2": "أسابيع",
    "ageOption3": "شهور",
    "ageOption4": "سنة (سنوات)",
    "showOption1": "صورة",
    "showOption2": "موضع",
    "left": "الصورة اليسرى",
    "right": "الصورة اليمنى",
    "identicalLayerError": "الصور اليسرى واليمنى متطابقة.",
    "date": "تاريخ/تواريخ",
    "imageLabel": "صورة/صور",
    "default": "الوضع الافتراضي"
  },
  "editor": {
    "title": "المحرر",
    "error": "لم يتم العثور على أي طبقة تحرير.",
    "error1": "‏‏تم رفض الوصول. يتعذر تحرير الطبقات.",
    "text": "حدد رمزًا، ثم انقر على الخريطة."
  },
  "measurement": {
    "title": "قياس الصورة",
    "error": "إمكانات القياس غير مدعومة."
  },
  "export": {
    "title": "تصدير",
    "mode": "حفظ الموقع",
    "titleText": "العنوان (مطلوب)",
    "description": "الوصف",
    "tags": "العلامات (مطلوبة)",
    "preview": "معاينة",
    "submit": "حفظ",
    "cancel": "إلغاء الأمر",
    "pixel": "حجم البكسل",
    "outsr": "الإسناد المكاني الناتج",
    "renderer": "خيارات تنزيل TIFF",
    "formatText1": "كما هو معروض",
    "formatText2": "البيانات الخام (كل النطاقات)",
    "extent": "رسم مضلع لتحديد المدى",
    "drawText": "(انقر على الصورة للبدء)",
    "text": "يتعذر عرض البيانات الخام بعارضي الصور القياسيين. افتح بواسطة ArcGIS Pro.",
    "error": "لا توجد طبقات صور مرئية على الخريطة.",
    "error1": "العنوان مطلوب.",
    "error2": "العلامة/العلامات مطلوبة",
    "error3": "يعد PixelSize للتصدير مقيدًا بـ",
    "error4": "لهذا المدى.",
    "error5": "يرجى إدخال قيمة رقمية صحيحة.",
    "error6": "يتعذر تصدير الصورة حاليًا.",
    "thumbnailError": "الصورة المصغرة غير متاحة",
    "advance": "خيارات الحفظ المتقدمة",
    "modeOption1": "حفظ في البوابة الإلكترونية",
    "modeOption2": "حفظ في القرص الصلب",
    "default": "الوضع الافتراضي",
    "utm": "منطقة WGS84 UTM",
    "layer": "طبقة",
    "mercator": "WebMercatorAS",
    "folder": "تحديد مجلد"
  },
  "imageDate": {
    "label": "بيانات الصورة"
  },
  "about": {
    "title": "نبذة عن"
  },
  "bookmark": {
    "title": "إشارات مرجعية",
    "selectBookmark": "تحديد إشارات مرجعية",
    "default": "الوضع الافتراضي",
    "add": "إضافة إشارات مرجعية",
    "addTitle": "أدخل عنوانًا",
    "addBtn": "إضافة مؤقت"
  }
});