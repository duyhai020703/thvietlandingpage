const http = require('http');
const fs = require('fs');
const path = require('path');

// Auto load .env if exists (Node 20+)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    if (typeof process.loadEnvFile === 'function') {
      process.loadEnvFile(envPath);
    }
  } catch (err) {
    console.warn('[ENV] Không thể nạp file .env:', err.message);
  }
}

const PORT = process.env.PORT || 8080;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4'
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatBookingMessage(data) {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const bookingCode = data.code || ('THV-' + Math.floor(1000 + Math.random() * 9000));
  return `🌶️ <b>ĐẶT BÀN MỚI - MÌ CAY THVIET TÂY NINH</b> 🌶️
━━━━━━━━━━━━━━━━━━━━
🔖 <b>Mã đặt bàn:</b> <code>${escapeHtml(bookingCode)}</code>
👤 <b>Khách hàng:</b> ${escapeHtml(data.name)}
📞 <b>Số điện thoại:</b> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>
🏢 <b>Chi nhánh:</b> ${escapeHtml(data.branch || '62 Nguyễn Trãi, Tân Ninh, Tây Ninh')}
📅 <b>Ngày dùng bữa:</b> ${escapeHtml(data.date)}
⏰ <b>Khung giờ đến:</b> ${escapeHtml(data.time)}
👥 <b>Số lượng:</b> ${escapeHtml(data.guests)} người
🪑 <b>Vị trí mong muốn:</b> ${escapeHtml(data.area || 'Tự chọn')}
📝 <b>Ghi chú / Món:</b> ${escapeHtml(data.notes || 'Không có')}
━━━━━━━━━━━━━━━━━━━━
⏰ <i>Thời gian gửi: ${timestamp}</i>
👉 <i>Nhân viên THVIET vui lòng liên hệ xác nhận bàn cho khách trong 5 phút!</i>`;
}

async function sendTelegramNotification(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️ [Telegram] Chưa cấu hình TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong .env');
    return { ok: false, warning: 'Thiếu cấu hình Telegram' };
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    if (!result.ok) {
      console.error('❌ [Telegram] Lỗi phản hồi API:', result);
    } else {
      console.log('✅ [Telegram] Đã gửi thông báo đặt bàn thành công!');
    }
    return result;
  } catch (err) {
    console.error('❌ [Telegram] Lỗi kết nối API Telegram:', err.message);
    return { ok: false, error: err.message };
  }
}

async function sendGoogleSheetsWebhook(data) {
  if (!GOOGLE_SHEET_WEBHOOK_URL) return;
  try {
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    console.log('✅ [GoogleSheets] Đã gửi dữ liệu sang Google Sheets');
  } catch (err) {
    console.error('❌ [GoogleSheets] Lỗi gửi webhook:', err.message);
  }
}

const server = http.createServer((req, res) => {
  let parsedUrl = req.url.split('?')[0];

  // API Đặt bàn
  if (req.method === 'POST' && parsedUrl === '/api/booking') {
    let bodyStr = '';
    req.on('data', chunk => {
      bodyStr += chunk;
      if (bodyStr.length > 1e6) {
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(bodyStr || '{}');
        const { name, phone, branch, date, time, guests, area, notes, code } = data;

        if (!name || !phone) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          return res.end(JSON.stringify({ success: false, message: 'Vui lòng cung cấp họ tên và số điện thoại.' }));
        }

        console.log(`📌 [Booking THVIET] ${code || ''} | ${name} - ${phone} | ${guests} khách | ${time} ngày ${date}`);

        // Gửi thông báo Telegram
        const teleResult = await sendTelegramNotification(formatBookingMessage(data));

        // Gửi Google Sheets nếu có cài đặt
        if (GOOGLE_SHEET_WEBHOOK_URL) {
          sendGoogleSheetsWebhook(data).catch(() => {});
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          message: 'Đặt bàn thành công!',
          telegramSent: teleResult?.ok || false
        }));
      } catch (err) {
        console.error('❌ [API Booking Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, message: 'Lỗi xử lý dữ liệu đặt bàn.' }));
      }
    });
    return;
  }

  // Phục vụ Static Files
  let safePath = path.normalize(decodeURIComponent(parsedUrl)).replace(/^(\.\.[\/\\])+/, '');
  let targetPath = path.join(__dirname, safePath === '/' ? 'index.html' : safePath);

  fs.stat(targetPath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      targetPath = path.join(targetPath, 'index.html');
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(targetPath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      }
      res.end('Internal Server Error');
    });
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️ Cổng ${PORT} đang bị chiếm dụng bởi một tiến trình khác.`);
    console.error(`👉 Cách khắc phục: Tắt tiến trình cũ hoặc chạy lệnh sau để đổi cổng:`);
    console.error(`   $env:PORT="3000"; node server.js\n`);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Mì Cay THVIET Tây Ninh Landing Page đang chạy tại:`);
  console.log(` > http://localhost:${PORT}`);
  console.log(` Telegram Bot: ${TELEGRAM_BOT_TOKEN ? 'Đã kết nối' : 'Chưa cấu hình (.env)'}`);
  console.log(`=========================================`);
});

