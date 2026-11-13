# Mì Cay THVIET - Landing Page & Interactive Flipbook Menu

Trang landing page giới thiệu nhà hàng **Mì Cay THVIET** (Chi nhánh Tây Ninh: **62 Nguyễn Trãi, Tân Ninh, Tây Ninh**) với thực đơn sách lật 3D tương tác sống động, hệ thống đặt bàn trực tuyến tự động gửi thông báo tức thì qua Telegram Bot, và bản đồ chỉ đường Google Maps.

---

## 🌟 Tính năng nổi bật
- **Interactive 3D Flipbook Menu:** Thực đơn tương tác dạng sách lật trang 3D bằng thư viện `StPageFlip`, hỗ trợ lật trang vuốt chạm / chuột, hiệu ứng âm thanh lật giấy sống động.
- **Chế độ xem thực đơn tối ưu:** Hỗ trợ chế độ xem 2 trang đôi (sách mở) và nút chuyển đổi xem 1 trang to rõ nét, tính năng phóng to (lightbox) chi tiết với độ nét nguyên bản.
- **Hệ thống đặt bàn trực tuyến kết nối Telegram Bot:** Khách gửi phiếu đặt bàn -> Hệ thống tự động gửi thông báo trực tiếp về nhóm/kênh Telegram của quán theo thời gian thực (tương tự như source `romnuong`).
- **Thiết kế thương hiệu sang trọng:** Phối màu trầm ấm theo phong cách nội thất quán (gỗ óc chó đen nâu, viền vàng kim, điểm xuyết đỏ ớt truyền thống).
- **Tích hợp Google Maps chính xác:** Nhúng bản đồ vị trí thực tế tại **62 Nguyễn Trãi, Tân Ninh, Tây Ninh, Việt Nam**.
- **Tiện ích liên hệ nhanh:** Floating bar với nút gọi Hotline `0966 903 310`, chat Zalo, đặt bàn và cuộn lên đầu trang.
- **Giao diện Responsive:** Tối ưu mượt mà trên Desktop, Tablet và Mobile.

---

## 🚀 Công nghệ sử dụng
- **Front-end:** HTML5, CSS3, JavaScript (ES6+ Vanilla)
- **3D Flipbook:** `StPageFlip` (chạy offline độc lập)
- **Audio API:** HTML5 Web Audio API (tạo âm thanh lật trang chân thực)
- **Backend / Server:** Node.js HTTP server tích hợp sẵn hoặc Vercel Serverless Function (`api/booking.js`)
- **Notification:** Telegram Bot API (gửi qua HTML parse mode)
- **Maps:** Google Maps Embed API

---

## 📁 Cấu trúc thư mục
```
├── index.html                # Giao diện chính (HTML5)
├── server.js                 # Máy chủ Node.js phục vụ web & API đặt bàn Telegram
├── package.json              # Khai báo script start/dev
├── .env                      # Cấu hình Token & Chat ID Telegram
├── .env.example              # Mẫu file cấu hình môi trường
├── api/
│   └── booking.js            # Serverless function đặt bàn (cho Vercel)
├── css/
│   └── style.css             # CSS giao diện & responsive
├── js/
│   ├── page-flip.browser.js  # Thư viện StPageFlip offline
│   └── main.js               # Logic điều khiển, flipbook, form đặt bàn
├── asset/                    # Hình ảnh thực đơn, banner, không gian quán
├── .gitignore
└── README.md
```

---

## ⚙️ Cấu hình Telegram Bot nhận đơn đặt bàn

File `.env` nằm ở thư mục gốc của dự án:
```env
TELEGRAM_BOT_TOKEN=9255098876:AAHUE9xXnxqr6fTYroU4E2-OpadKOdaWD4U
TELEGRAM_CHAT_ID=1928164472
PORT=8080
```
> Khi có khách đặt bàn, bot sẽ tự động gửi tin nhắn báo về Telegram với đầy đủ thông tin: Mã đặt bàn, Họ tên, Số điện thoại (bấm gọi được ngay), Ngày giờ, Số lượng khách, Vị trí mong muốn và Ghi chú món ăn.

---

## 💻 Hướng dẫn khởi chạy

### Cách 1: Chạy bằng Node.js (Khuyên dùng)
```bash
npm start
# hoặc:
node server.js
```
Truy cập trình duyệt tại: [http://localhost:8080](http://localhost:8080)

### Cách 2: Triển khai lên Vercel
Chỉ cần liên kết Git repository với Vercel, hệ thống sẽ tự động nhận diện file `api/booking.js` thành Serverless Function. Đừng quên thiết lập 2 biến môi trường trên Vercel:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
