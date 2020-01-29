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
    "error": "Không thể tạo bản đồ",
    "licenseError": {
      "message": "Tài khoản của bạn không được cấp phép để sử dụng ứng dụng có thể cấu hình mà không được công khai. Vui lòng yêu cầu quản trị viên của tổ chức bạn gán cho bạn loại người dùng nào có bao gồm các ứng dụng thiết yếu hoặc có giấy phép sử dụng các ứng dụng thiết yếu bổ trợ.",
      "title": "Không được cấp phép"
    }
  },
  "nav": {
    "close": "Đóng"
  },
  "basemap": {
    "title": "Bộ sưu tập bản đồ nền"
  },
  "operationalLayers": {
    "title": "Các lớp chuyên đề",
    "error": "Không có lớp chuyên đề nào trong bản đồ."
  },
  "singleLayerViewer": {
    "title": "Công cụ chọn lớp hình ảnh",
    "enable": "Tìm hình ảnh riêng lẻ",
    "tooltip": "Bật để tìm kiếm các hình ảnh cụ thể.",
    "secondary": "Thiết lập lớp hoạt động thành Lớp So sánh.",
    "dropDown": "Hiển thị hình ảnh trong danh sách xổ xuống.",
    "refresh": "Nút Làm mới",
    "refreshTooltip": "Làm mới lại câu truy vấn dựa trên phạm vi hiện tại.",
    "renderer": "Đang thực hiện",
    "layer": "Lớp",
    "show": "Hiển thị",
    "age": "Phạm vi tìm kiếm",
    "zoom": "Phóng to để chọn hình ảnh.",
    "error": "Không có Lớp Hình ảnh hiển thị nào trong bản đồ.",
    "error1": "Trường không được chỉ định.",
    "error2": "Không có trường OBJECTID.",
    "error3": "Không có trường Thể loại.",
    "error4": "Không thể thực hiện hoạt động cho lớp dữ liệu.",
    "error5": "Các dịch vụ trước phiên bản 10.2.1 sẽ không được hỗ trợ.",
    "error6": "Không có scene nào trong phạm vi hiện tại.",
    "error7": "Số lượng footprint đã chọn vượt quá 20. Chỉ hiển thị 20 mục đầu tiên. Bấm OK để không cảnh báo lại.",
    "error8": "Dữ liệu hình ảnh chỉ có sẵn trong khoảng ",
    "error9": "Phạm vi ngày không hợp lệ: Ngày Bắt đầu phải sớm hơn Ngày Kết thúc.",
    "slider": "Hiển thị hình ảnh trên thanh trượt.",
    "ageOption1": "(Các) ngày",
    "ageOption2": "(Các) tuần",
    "ageOption3": "(Các) tháng",
    "ageOption4": "Năm",
    "showOption1": "Hình ảnh",
    "showOption2": "Footprint",
    "date": "Ngày",
    "imageLabel": "hình ảnh",
    "default": "Mặc định"
  },
  "twoLayerViewer": {
    "title": "Trình lựa chọn lớp",
    "enable": "Tìm hình ảnh riêng lẻ",
    "tooltip": "Bật để tìm kiếm các hình ảnh cụ thể.",
    "secondary": "Thiết lập lớp hoạt động thành Lớp So sánh.",
    "dropDown": "Hiển thị hình ảnh trong danh sách xổ xuống.",
    "refresh": "Nút Làm mới",
    "refreshTooltip": "Làm mới lại câu truy vấn dựa trên phạm vi hiện tại.",
    "renderer": "Đang thực hiện",
    "layer": "Lớp",
    "show": "Hiển thị",
    "age": "Phạm vi tìm kiếm",
    "zoom": "Phóng to để chọn hình ảnh.",
    "error": "Không có Lớp Hình ảnh hiển thị nào trong bản đồ.",
    "error1": "Trường không được chỉ định.",
    "error2": "Không có trường OBJECTID.",
    "error3": "Không có trường Thể loại.",
    "error4": "Không thể thực hiện hoạt động cho lớp dữ liệu.",
    "error5": "Các dịch vụ trước phiên bản 10.2.1 sẽ không được hỗ trợ.",
    "error6": "Không có scene nào trong phạm vi hiện tại.",
    "error7": "Số lượng footprint đã chọn vượt quá 20. Chỉ hiển thị 20 mục đầu tiên. Bấm OK để không cảnh báo lại.",
    "error8": "Dữ liệu hình ảnh chỉ có sẵn trong khoảng ",
    "error9": "Phạm vi ngày không hợp lệ: Ngày Bắt đầu phải sớm hơn Ngày Kết thúc.",
    "slider": "Hiển thị hình ảnh trên thanh trượt.",
    "ageOption1": "(Các) ngày",
    "ageOption2": "(Các) tuần",
    "ageOption3": "(Các) tháng",
    "ageOption4": "Năm",
    "showOption1": "Hình ảnh",
    "showOption2": "Footprint",
    "left": "Hình ảnh bên trái",
    "right": "Hình ảnh bên phải",
    "identicalLayerError": "Hình ảnh bên trái và bên phải giống nhau.",
    "date": "Ngày",
    "imageLabel": "hình ảnh",
    "default": "Mặc định"
  },
  "editor": {
    "title": "Trình biên tập",
    "error": "Không tìm thấy Lớp Chỉnh sửa nào.",
    "error1": "Truy cập bị từ chối. Không thể chỉnh sửa lớp.",
    "text": "Chọn một biểu tượng và bấm vào bản đồ."
  },
  "measurement": {
    "title": "Đo lường Hình ảnh",
    "error": "Khả năng Đo lường không được hỗ trợ."
  },
  "export": {
    "title": "Xuất",
    "mode": "Lưu vị trí",
    "titleText": "Tiêu đề (bắt buộc)",
    "description": "Mô tả",
    "tags": "Thẻ (bắt buộc)",
    "preview": "Xem trước",
    "submit": "Lưu",
    "cancel": "Hủy",
    "pixel": "Kích thước Pixel",
    "outsr": "Tham chiếu Không gian Đầu ra",
    "renderer": "Tùy chọn tải về TIFF",
    "formatText1": "Như hiển thị",
    "formatText2": "Dữ liệu thô (tất cả các dải sóng)",
    "extent": "Vẽ đa giác để xác định phạm vi",
    "drawText": "(bấm vào hình ảnh để bắt đầu)",
    "text": "Không thể hiển thị dữ liệu thô bằng chương trình xem ảnh thông thường. Vui lòng mở bằng ArcGIS Pro.",
    "error": "Không có lớp hình ảnh nào hiển thị trên bản đồ.",
    "error1": "Cần có tiêu đề.",
    "error2": "Cần có (các) Thẻ.",
    "error3": "Kích thước pixel của nội dung xuất ra được giới hạn đến",
    "error4": "cho phạm vi này.",
    "error5": "Vui lòng nhập giá trị số hợp lệ.",
    "error6": "Không thể xuất hình ảnh của bạn lúc này.",
    "thumbnailError": "Không có hình thu nhỏ",
    "advance": "Tùy chọn lưu nâng cao",
    "modeOption1": "Lưu vào cổng thông tin",
    "modeOption2": "Lưu vào ổ đĩa",
    "default": "Mặc định",
    "utm": "Khu vực UTM WGS84",
    "layer": "Lớp",
    "mercator": "WebMercatorAS",
    "folder": "Chọn thư mục"
  },
  "imageDate": {
    "label": "Ngày chụp hình ảnh"
  },
  "about": {
    "title": "Về"
  },
  "bookmark": {
    "title": "Đánh dấu",
    "selectBookmark": "Chọn đánh dấu",
    "default": "Mặc định",
    "add": "Thêm đánh dấu",
    "addTitle": "Nhập tiêu đề",
    "addBtn": "Thêm tạm thời"
  },
  "coordinate": {
    "_widgetLabel": "Tọa độ",
    "hintMessage": "Bấm vào bản đồ để lấy tọa độ",
    "defaultLabel": "Mặc định",
    "realtimeLabel": "Di chuyển chuột để lấy tọa độ",
    "computing": "Đang tính toán...",
    "latitudeLabel": "Vĩ độ",
    "longitudeLabel": "Kinh độ",
    "loading": "đang tải...",
    "enableClick": "Bấm để bật tùy chọn bấm vào bản đồ để nhận tọa độ",
    "disableClick": "Bấm để tắt tùy chọn bấm vào bản đồ để nhận tọa độ",
    "Default": "Mặc định",
    "Inches": "Inch",
    "Foot": "Bộ",
    "Foot_US": "Feet_US",
    "Yards": "Yard",
    "Miles": "Dặm",
    "Nautical_Miles": "Hải lý",
    "Millimeters": "Milimét",
    "Centimeters": "Xentimét",
    "Meter": "Mét",
    "Kilometers": "Kilômét",
    "Decimeters": "Đềximét",
    "Decimal_Degrees": "Độ",
    "Degree_Minutes_Seconds": "Độ phút giây",
    "MGRS": "MGRS",
    "USNG": "USNG"
  }
});