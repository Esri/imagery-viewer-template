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
    "error": "Harita oluşturulamıyor",
    "licenseError": {
      "message": "Hesabınız herkese açık olmayan Yapılandırılabilir Uygulamaları kullanmak için lisanslandırılmamış. Lütfen kuruluş yöneticinizden Temel Uygulamalar veya eklenti Temel Uygulamalar lisansı içeren bir kullanıcı türü atamasını isteyin.",
      "title": "Lisanslı Değil"
    }
  },
  "nav": {
    "close": "Kapat"
  },
  "basemap": {
    "title": "Altlık Harita Galerisi"
  },
  "operationalLayers": {
    "title": "İşlem Katmanları",
    "error": "Haritada işlem katmanı yok."
  },
  "singleLayerViewer": {
    "title": "Görüntü Katmanı Seçici",
    "enable": "Tek tek görüntü arayın",
    "tooltip": "Belirli görüntüler için aramayı etkinleştir.",
    "secondary": "Aktif Katmanı Karşılaştırma Katmanı olarak ayarla.",
    "dropDown": "Görüntüleri açılır listede göster.",
    "refresh": "Yenileme Düğmesi",
    "refreshTooltip": "Sorguyu geçerli yayılıma dayanarak yenile.",
    "renderer": "Canlandırılıyor",
    "layer": "Katman",
    "show": "Göster",
    "age": "Arama aralığı",
    "zoom": "Görüntü seçmek için yakınlaştır.",
    "error": "Haritada görünür Görüntü Katmanı yok.",
    "error1": "Alan belirtilmedi.",
    "error2": "OBJECTID alanı yok.",
    "error3": "Kategori alanı yok.",
    "error4": "Katman için işlem yapılamıyor.",
    "error5": "10.2.1 öncesi servisler desteklenmiyor.",
    "error6": "Geçerli yayılımda sahne yok.",
    "error7": "Seçilen taban alanı sayısı 20’nin üzerinde. Yalnızca ilk 20 görüntülenecek. Tekrar uyarı almamak için Tamam seçeneğine tıklayın.",
    "slider": "Görüntüleri kaydırıcıda göster.",
    "ageOption1": "Gün(ler)",
    "ageOption2": "Hafta",
    "ageOption3": "Ay",
    "ageOption4": "Yıl(lar)",
    "showOption1": "Görüntü",
    "showOption2": "Bina Taban Alanı",
    "date": "Tarih(ler)",
    "imageLabel": "görüntü(ler)",
    "default": "Varsayılan"
  },
  "twoLayerViewer": {
    "title": "Katman Seçici",
    "enable": "Tek tek görüntü arayın",
    "tooltip": "Belirli görüntüler için aramayı etkinleştir.",
    "secondary": "Aktif Katmanı Karşılaştırma Katmanı olarak ayarla.",
    "dropDown": "Görüntüleri açılır listede göster.",
    "refresh": "Yenileme Düğmesi",
    "refreshTooltip": "Sorguyu geçerli yayılıma dayanarak yenile.",
    "renderer": "Canlandırılıyor",
    "layer": "Katman",
    "show": "Göster",
    "age": "Arama aralığı",
    "zoom": "Görüntü seçmek için yakınlaştır.",
    "error": "Haritada görünür Görüntü Katmanı yok.",
    "error1": "Alan belirtilmedi.",
    "error2": "OBJECTID alanı yok.",
    "error3": "Kategori alanı yok.",
    "error4": "Katman için işlem yapılamıyor.",
    "error5": "10.2.1 öncesi servisler desteklenmiyor.",
    "error6": "Geçerli yayılımda sahne yok.",
    "error7": "Seçilen taban alanı sayısı 20’nin üzerinde. Yalnızca ilk 20 görüntülenecek. Tekrar uyarı almamak için Tamam seçeneğine tıklayın.",
    "slider": "Görüntüleri kaydırıcıda göster.",
    "ageOption1": "Gün(ler)",
    "ageOption2": "Hafta",
    "ageOption3": "Ay",
    "ageOption4": "Yıl(lar)",
    "showOption1": "Görüntü",
    "showOption2": "Bina Taban Alanı",
    "left": "Sol Görüntü",
    "right": "Sağ Görüntü",
    "identicalLayerError": "Sol ve Sağ görüntüler aynı.",
    "date": "Tarih(ler)",
    "imageLabel": "görüntü(ler)",
    "default": "Varsayılan"
  },
  "editor": {
    "title": "Düzenleyici",
    "error": "Düzenleme Katmanı bulunamadı.",
    "error1": "Erişim reddedildi. Katmanlar düzenlenemiyor.",
    "text": "Harita üzerinde bir simge seçin ve tıklayın."
  },
  "measurement": {
    "title": "Görüntü Ölçümü",
    "error": "Ölçme Becerileri desteklenmiyor."
  },
  "export": {
    "title": "Dışa Aktar",
    "mode": "Konumu kaydet",
    "titleText": "Başlık (gerekli)",
    "description": "Açıklama",
    "tags": "Etiketler (gerekli)",
    "preview": "Önizleme",
    "submit": "Kaydet",
    "cancel": "İptal Et",
    "pixel": "Piksel Boyutu",
    "outsr": "Çıktı Mekansal Referansı",
    "renderer": "TIFF indirme seçenekleri",
    "formatText1": "Görüntülendiği gibi",
    "formatText2": "Ham veriler (tüm gruplar)",
    "extent": "Kapsamı tanımlamak için çokgen çizin",
    "drawText": "(başlamak için görüntüye tıklayın)",
    "text": "Ham veriler standart fotoğraf görüntüleyicileriyle görüntülenemez. ArcGIS Pro ile aç.",
    "error": "Haritada görünür görüntü katmanı yok.",
    "error1": "Başlık gerekli.",
    "error2": "Etiket gerekli.",
    "error3": "Aktarım için maksimum Piksel Boyutu",
    "error4": "bu yayılım için.",
    "error5": "Geçerli bir sayısal değer girin.",
    "error6": "Görüntünüz şu anda dışa aktarılamıyor.",
    "thumbnailError": "Kullanılabilir küçük resim yok",
    "advance": "Gelişmiş kaydetme seçenekleri",
    "modeOption1": "Portala kaydet",
    "modeOption2": "Diske kaydet",
    "default": "Varsayılan",
    "utm": "WGS84 UTM Zone",
    "layer": "Katman",
    "mercator": "WebMercatorAS",
    "folder": "Klasör seç"
  },
  "imageDate": {
    "label": "Görüntü Tarihi"
  },
  "about": {
    "title": "Yaklaşık"
  },
  "bookmark": {
    "title": "Yer işaretleri",
    "selectBookmark": "Seçilen yer işaretleri",
    "default": "Varsayılan",
    "add": "Yer İşareti ekle",
    "addTitle": "Başlık girin",
    "addBtn": "Geçici ekle"
  }
});