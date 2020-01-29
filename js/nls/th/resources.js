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
    "error": "ไม่สามารถสร้างแผนที่ได้",
    "licenseError": {
      "message": "บัญชีผู้ใช้ของคุณไม่มีใบอนุญาตในการใช้งานแอปที่กำหนดค่าได้ซึ่งไม่ใช่แบบสาธารณะ โปรดขอให้ผู้ดูแลองค์กรของคุณกำหนดประเภทผู้ใช้ที่มีใบอนุญาตแอป Essential หรือแอดออนแอป Essential ให้กับคุณ",
      "title": "ไม่มีใบอนุญาต"
    }
  },
  "nav": {
    "close": "ปิด"
  },
  "basemap": {
    "title": "แกลเลอรี่แผนที่ฐาน"
  },
  "operationalLayers": {
    "title": "ชั้นข้อมูลกระบวนการทำงาน",
    "error": "ไม่มีเลเยอร์การดำเนินงานในแผนที่"
  },
  "singleLayerViewer": {
    "title": "ตัวเลือกชั้นภาพ",
    "enable": "ค้นหาภาพทีละภาพ",
    "tooltip": "เปิดใช้งานเพื่อค้นหาภาพที่ระบุ",
    "secondary": "ตั้งค่าใช้งานเป็นเลเยอร์เปรียบเทียบ",
    "dropDown": "แสดงรูปภาพในรายการตัวเลือก",
    "refresh": "ปุ่มรีเฟรช",
    "refreshTooltip": "รีเฟรชข้อความค้นหาตามขอบเขตปัจจุบัน",
    "renderer": "กำลังเรนเดอร์",
    "layer": "ชั้นข้อมูล",
    "show": "แสดง",
    "age": "ค้นหาช่วง",
    "zoom": "ขยายไปยังภาพที่เลือก",
    "error": "ไม่มีเลเยอร์ภาพที่มองเห็นได้ในแผนที่",
    "error1": "ฟิลด์ไม่ได้ถูกระบุ",
    "error2": "ไม่มีฟิลด์ OBJECTID",
    "error3": "ไม่มีฟิลด์ Category",
    "error4": "ไม่สามารถดำเนินการกับเลเยอร์ได้",
    "error5": "พรีเซอร์วิส 10.2.1 ไม่สนับสนุน",
    "error6": "ไม่มีซีนในขอบเขตปัจจุบัน",
    "error7": "จำนวนโครงร่างอาคารที่เลือกเกิน 20 จะแสดงเฉพาะ 20 รายการแรก กด ตกลง เพื่อยกเลิกการเตือนอีกครั้ง",
    "error8": "ข้อมูลรูปภาพจะใช้ได้เฉพาะระหว่าง ",
    "error9": "ช่วงวันที่ไม่ถูกต้อง: วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด",
    "slider": "แสดงภาพบนแถบเลื่อน",
    "ageOption1": "วัน",
    "ageOption2": "สัปดาห์",
    "ageOption3": "เดือน",
    "ageOption4": "ปี",
    "showOption1": "รูปภาพ",
    "showOption2": "รอยเท้า",
    "date": "วันที่",
    "imageLabel": "ภาพ",
    "default": "ค่าตั้งต้น"
  },
  "twoLayerViewer": {
    "title": "ตัวเลือกเลเยอร์",
    "enable": "ค้นหาภาพทีละภาพ",
    "tooltip": "เปิดใช้งานเพื่อค้นหาภาพที่ระบุ",
    "secondary": "ตั้งค่าใช้งานเป็นเลเยอร์เปรียบเทียบ",
    "dropDown": "แสดงรูปภาพในรายการตัวเลือก",
    "refresh": "ปุ่มรีเฟรช",
    "refreshTooltip": "รีเฟรชข้อความค้นหาตามขอบเขตปัจจุบัน",
    "renderer": "กำลังเรนเดอร์",
    "layer": "ชั้นข้อมูล",
    "show": "แสดง",
    "age": "ค้นหาช่วง",
    "zoom": "ขยายไปยังภาพที่เลือก",
    "error": "ไม่มีเลเยอร์ภาพที่มองเห็นได้ในแผนที่",
    "error1": "ฟิลด์ไม่ได้ถูกระบุ",
    "error2": "ไม่มีฟิลด์ OBJECTID",
    "error3": "ไม่มีฟิลด์ Category",
    "error4": "ไม่สามารถดำเนินการกับเลเยอร์ได้",
    "error5": "พรีเซอร์วิส 10.2.1 ไม่สนับสนุน",
    "error6": "ไม่มีซีนในขอบเขตปัจจุบัน",
    "error7": "จำนวนโครงร่างอาคารที่เลือกเกิน 20 จะแสดงเฉพาะ 20 รายการแรก กด ตกลง เพื่อยกเลิกการเตือนอีกครั้ง",
    "error8": "ข้อมูลรูปภาพจะใช้ได้เฉพาะระหว่าง ",
    "error9": "ช่วงวันที่ไม่ถูกต้อง: วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด",
    "slider": "แสดงภาพบนแถบเลื่อน",
    "ageOption1": "วัน",
    "ageOption2": "สัปดาห์",
    "ageOption3": "เดือน",
    "ageOption4": "ปี",
    "showOption1": "รูปภาพ",
    "showOption2": "รอยเท้า",
    "left": "ภาพซ้าย",
    "right": "ภาพขวา",
    "identicalLayerError": "ภาพซ้ายและขวาเหมือนกัน",
    "date": "วันที่",
    "imageLabel": "ภาพ",
    "default": "ค่าตั้งต้น"
  },
  "editor": {
    "title": "เครื่องมือแก้ไข",
    "error": "ไม่พบชั้นการแก้ไข",
    "error1": "การเข้าถึงถูกปฏิเสธ ไม่สามารถแก้ไขชั้นได้",
    "text": "เลือกสัญลักษณ์แล้วคลิกบนแผนที่"
  },
  "measurement": {
    "title": "การวัดภาพ",
    "error": "ไม่รองรับความสามารถในการดูแลรักษา"
  },
  "export": {
    "title": "ส่งออก",
    "mode": "บันทึกตำแหน่งที่ตั้ง",
    "titleText": "ชื่อ (จำเป็น)",
    "description": "คำอธิบาย",
    "tags": "แท็ก (จำเป็น)",
    "preview": "ภาพตัวอย่าง",
    "submit": "บันทึก",
    "cancel": "ยกเลิก",
    "pixel": "ขนาดพิกเซล",
    "outsr": "ผลลัพธ์การอ้างอิงเชิงพื้นที่",
    "renderer": "ตัวเลือกดาวน์โหลด TIFF",
    "formatText1": "ตามที่ปรากฏ",
    "formatText2": "ข้อมูลดิบ (แถบทั้งหมด)",
    "extent": "วาดโพลิกอนเพื่อกำหนดขอบเขต",
    "drawText": "(คลิกที่ภาพเพื่อเริ่ม)",
    "text": "ไม่สามารถแสดงข้อมูลดิบด้วยโปรแกรมดูภาพมาตรฐานได้ เปิดด้วย ArcGIS Pro",
    "error": "ไม่มีเลเยอร์ภาพที่มองเห็นได้ในแผนที่",
    "error1": "ต้องระบุชื่อ",
    "error2": "ต้องระบุแท็ก",
    "error3": "PixelSize ของการส่งออกจะถูกจำกัดไว้ที่",
    "error4": "สำหรับขอบเขตนี้",
    "error5": "โปรดป้อนค่าตัวเลขที่ถูกต้อง",
    "error6": "ไม่สามารถส่งออกภาพของคุณได้ในครั้งนี้",
    "thumbnailError": "ไม่มีภาพขนาดย่อที่พร้อมใช้งาน",
    "advance": "ตัวเลือกการบันทึกขั้นสูง",
    "modeOption1": "บันทึกลงในพอร์ทัล",
    "modeOption2": "บันทึกลงในดิสก์",
    "default": "ค่าตั้งต้น",
    "utm": "โซน WGS84 UTM",
    "layer": "ชั้นข้อมูล",
    "mercator": "WebMercatorAS",
    "folder": "เลือกโฟลเดอร์"
  },
  "imageDate": {
    "label": "วันที่ของภาพ"
  },
  "about": {
    "title": "เกี่ยวกับ"
  },
  "bookmark": {
    "title": "บุ๊คมาร์ค",
    "selectBookmark": "เลือกบุ๊กมาร์ก",
    "default": "ค่าตั้งต้น",
    "add": "เพิ่มบุ๊กมาร์ก",
    "addTitle": "ใส่ชื่อ",
    "addBtn": "เพิ่มชั่วคราว"
  },
  "coordinate": {
    "_widgetLabel": "ค่าพิกัด",
    "hintMessage": "คลิกที่แผนที่เพื่อหาค่าพิกัด",
    "defaultLabel": "ค่าตั้งต้น",
    "realtimeLabel": "เลื่อนเม้าส์ไปบนแผนที่",
    "computing": "กำลังคำนวณ...",
    "latitudeLabel": "ละติจูด",
    "longitudeLabel": "ลองจิจูด",
    "loading": "กำลังโหลด..",
    "enableClick": "คลิกเพื่อสามารถใช้งานบนแผนที่เพื่อได้รับค่าพิกัด",
    "disableClick": "คลิกเพื่อไม่สามารถใช้งานบนแผนที่เพื่อได้รับค่าพิกัด",
    "Default": "ค่าตั้งต้น",
    "Inches": "นิ้ว",
    "Foot": "ฟุต",
    "Foot_US": "Feet_US",
    "Yards": "หลา",
    "Miles": "ไมล์",
    "Nautical_Miles": "ไมล์ทะเล",
    "Millimeters": "มิลลิเมตร",
    "Centimeters": "เซ็นติเมตร",
    "Meter": "เมตร",
    "Kilometers": "กิโลเมตร",
    "Decimeters": "เดซิเมตร",
    "Decimal_Degrees": "องศา",
    "Degree_Minutes_Seconds": "องศา ลิปดา ฟิลิปดา",
    "MGRS": "MGRS",
    "USNG": "USNG"
  }
});