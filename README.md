# Mì Cay THVIET - Landing Page & Interactive Flipbook Menu

Trang landing page giới thiệu quán **Mì Cay THVIET** (Chi nhánh Tây Ninh vừa khai trương) với thực đơn sách lật 3D tương tác sống động, đặt bàn online và thông tin liên hệ.

## 🌟 Tính năng nổi bật
- **Interactive 3D Flipbook Menu:** Thực đơn tương tác dạng sách lật trang 3D bằng thư viện `StPageFlip`, hỗ trợ lật trang vuốt chạm / chuột, hiệu ứng âm thanh lật giấy sống động.
- **Chế độ xem thực đơn tối ưu:** Hỗ trợ chế độ xem 2 trang đôi (sách mở) và nút chuyển đổi xem 1 trang to rõ nét, tính năng phóng to (lightbox) chi tiết với độ nét nguyên bản.
- **Hệ thống đặt bàn trực tuyến:** Đặt bàn nhanh với mã xác nhận đặt bàn tự động, hỗ trợ copy mã bàn và liên hệ nhanh.
- **Thiết kế thương hiệu sang trọng:** Phối màu trầm ấm theo phong cách nội thất quán (gỗ óc chó đen nâu, viền vàng kim, điểm xuyết đỏ ớt truyền thống).
- **Tích hợp Google Maps:** Nhúng bản đồ trực tiếp chỉ dẫn vị trí quán tại Tây Ninh.
- **Giao diện Responsive:** Tối ưu mượt mà trên Desktop, Tablet và Mobile.

## 🚀 Công nghệ sử dụng
- **HTML5 / CSS3 / JavaScript (ES6+ Vanilla)**
- **StPageFlip** (Thư viện mô phỏng lật sách 3D)
- **FontAwesome 6** (Icons)
- **Google Fonts** (Playfair Display & Montserrat)
- **HTML5 Web Audio API** (Tạo âm thanh lật sách chân thực không phụ thuộc file audio ngoài)

## 📁 Cấu trúc thư mục
```
├── index.html                # File HTML giao diện chính
├── css/
│   └── style.css             # Toàn bộ CSS giao diện và hiệu ứng sách lật
├── js/
│   ├── page-flip.browser.js  # Thư viện StPageFlip offline
│   └── main.js               # Logic điều khiển, menu lật sách, đặt bàn, âm thanh
├── asset/                    # Hình ảnh thực đơn và không gian quán
├── .gitignore
└── README.md
```

## 💻 Hướng dẫn chạy thử trên máy cục bộ
Bạn có thể khởi chạy server cục bộ bằng Python:
```bash
python3 -m http.server 8080
```
Sau đó truy cập trình duyệt tại: [http://localhost:8080](http://localhost:8080)
