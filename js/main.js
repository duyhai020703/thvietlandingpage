/**
 * MÌ CAY THVIET - LANDING PAGE CORE JAVASCRIPT
 * Features: StPageFlip Interactive Book, Web Audio flip sound, Table Booking,
 * Menu Quick Explorer, Opening Countdown, Lightbox Zoom, Responsive Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderSlider();
  initMenuBook();
  initBookingForm();
  initAmbianceModal();
  initHeaderAndScroll();
});

/* ==========================================================================
   1. DATA DEFINITIONS
   ========================================================================== */

// 17 Trang Menu chính thức từ thư mục asset
const MENU_PAGES = [
  {
    index: 0,
    title: 'Bìa Menu - Mì Cay THVIET Đậm Đà Hương Việt',
    cat: 'cover',
    src: 'asset/0fb5135fafba2fe476ab1.jpg',
    density: 'hard'
  },
  {
    index: 1,
    title: 'Lời ngỏ THVIET - Đượm vị Việt, Bùng vị cay',
    cat: 'intro',
    src: 'asset/c04b9e712194a1caf8858.jpg'
  },
  {
    index: 2,
    title: 'Mì Kim Chi - Mì Đặc Biệt, Thập Cẩm, Hải Sản, Bò',
    cat: 'mi-cay',
    src: 'asset/27dba5f61a139a4dc3021.jpg'
  },
  {
    index: 3,
    title: 'Mì Kim Chi - Mì Bò Mỹ, Tôm, Bạch Tuộc, Mực',
    cat: 'mi-cay',
    src: 'asset/04f649d7f632766c2f234.jpg'
  },
  {
    index: 4,
    title: 'Mì Kim Chi - Cá Chép Giòn, Cá Viên Xúc Xích',
    cat: 'mi-cay',
    src: 'asset/7d9ba1bd1e589e06c7493.jpg'
  },
  {
    index: 5,
    title: 'Mì Kim Chi - Tokbokki, Cá Basa, Thanh Cua, Rau Nấm',
    cat: 'mi-cay',
    src: 'asset/d308c2267dc3fd9da4d22.jpg'
  },
  {
    index: 6,
    title: 'Topping Thêm Đậm Đà Cho Tô Mì Của Bạn',
    cat: 'topping',
    src: 'asset/d95d007bbf9e3fc0668f10.jpg'
  },
  {
    index: 7,
    title: 'Combo Lẩu Bò Mỹ Thượng Hạng',
    cat: 'lau',
    src: 'asset/ed9a60b7df525f0c06436.jpg'
  },
  {
    index: 8,
    title: 'Combo Lẩu Hải Sản Trọn Vị Sum Vầy',
    cat: 'lau',
    src: 'asset/fd0022269dc31d9d44d27.jpg'
  },
  {
    index: 9,
    title: 'Combo Lẩu Mực Khổng Lồ Độc Đáo',
    cat: 'lau',
    src: 'asset/933e8b1934fcb4a2eded5.jpg'
  },
  {
    index: 10,
    title: 'Lẩu Tùy Chọn - 5 Vị Nước Lẩu & Topping Nhúng',
    cat: 'lau',
    src: 'asset/9c7d855a3abfbae1e3ae9.jpg'
  },
  {
    index: 11,
    title: 'Món Ăn Vặt Hấp Dẫn 1 - Mẹt Thập Cẩm, Kimbap, Takoyaki',
    cat: 'an-vat',
    src: 'asset/d9b03d978272022c5b6313.jpg'
  },
  {
    index: 12,
    title: 'Món Ăn Vặt Hấp Dẫn 2 - Đùi Gà Rán, Khoai Tây, Há Cảo',
    cat: 'an-vat',
    src: 'asset/fdc53ed48331036f5a2012.jpg'
  },
  {
    index: 13,
    title: 'Menu Đồ Uống 1 - Trà Sữa & Trà Trái Cây Giải Nhiệt',
    cat: 'do-uong',
    src: 'asset/f8d8a9e216079659cf1614.jpg'
  },
  {
    index: 14,
    title: 'Menu Đồ Uống 2 - Nước Ép Trái Cây & Soda Mát Lạnh',
    cat: 'do-uong',
    src: 'asset/8dcc1b1ca4f924a77de816.jpg'
  },
  {
    index: 15,
    title: 'Menu Đồ Uống 3 - Nước Ngọt, Bia, Strongbow & Rượu Soju',
    cat: 'do-uong',
    src: 'asset/a4091018adfd2da374ec15.jpg'
  },
  {
    index: 16,
    title: 'Trân Trọng Cảm Ơn Quý Khách - Mì Cay THVIET',
    cat: 'outro',
    src: 'asset/71eb91cc2e29ae77f73811.jpg',
    density: 'hard'
  }
];

/* ==========================================================================
   2. WEB AUDIO API - TẠO ÂM THANH LẬT SÁCH CHÂN THỰC
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function playPageFlipSound() {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const duration = 0.16;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    // Tạo pink/brownish noise nhẹ nhàng mô phỏng tiếng ma sát giấy
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter bandpass để âm thanh như tiếng giấy mỏng sột soạt
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.8, audioCtx.currentTime);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start();
  } catch (err) {
    console.debug('Audio play skipped:', err);
  }
}

/* ==========================================================================
   3. ST.PAGEFLIP - SÁCH THỰC ĐƠN TƯƠNG TÁC 3D
   ========================================================================== */
let pageFlipInstance = null;

function initMenuBook() {
  const container = document.getElementById('flipbookContainer');
  if (!container) return;

  // Render các trang vào container
  container.innerHTML = '';
  MENU_PAGES.forEach((p, idx) => {
    const pageEl = document.createElement('div');
    pageEl.className = 'flip-page';
    if (p.density) {
      pageEl.setAttribute('data-density', p.density);
    }

    // Thuộc tính hình ảnh
    pageEl.innerHTML = `
      <img src="${p.src}" alt="${p.title}" loading="lazy" />
      <div class="page-spine-shadow"></div>
      <button type="button" class="page-zoom-trigger" data-page-idx="${idx}" title="Phóng to trang này">
        <i class="fa-solid fa-magnifying-glass-plus"></i>
      </button>
    `;
    container.appendChild(pageEl);
  });

  // Khởi tạo PageFlip instance với kích thước lớn và tỉ lệ chuẩn (1056:1440 = 0.7333) để chống vỡ hình
  try {
    const screenW = window.innerWidth;
    const isMobile = screenW <= 768;
    const isTablet = screenW > 768 && screenW <= 1040;

    let pageWidth = 580;
    let pageHeight = 791; // 580 * (1440 / 1056) = 790.9

    if (isMobile) {
      pageWidth = 340;
      pageHeight = 464;
    } else if (isTablet) {
      pageWidth = 470;
      pageHeight = 641;
    }

    pageFlipInstance = new St.PageFlip(container, {
      width: pageWidth,
      height: pageHeight,
      size: 'stretch',
      minWidth: 280,
      maxWidth: 720,
      minHeight: 382,
      maxHeight: 982,
      maxShadowOpacity: 0.12, // Giảm tối đa bóng đổ mờ đè lên chữ
      showCover: true,
      mobileScrollSupport: true, // Cho phép cuộn trang mượt mà tự nhiên, không bị khựng ghì
      usePortrait: true,
      flippingTime: 650,
      startPage: 0
    });

    const pageElements = container.querySelectorAll('.flip-page');
    pageFlipInstance.loadFromHTML(pageElements);

    // Render Thumbnails
    renderThumbnails();

    // Event listeners
    pageFlipInstance.on('flip', (e) => {
      const currentPage = e.data;
      updatePageStatus(currentPage);
      playPageFlipSound();
    });

    // Cập nhật trạng thái ban đầu
    updatePageStatus(0);

    // Zoom triggers inside pages & Double click to zoom Full HD
    container.addEventListener('click', (e) => {
      const zoomBtn = e.target.closest('.page-zoom-trigger');
      if (zoomBtn) {
        e.stopPropagation();
        const pIdx = parseInt(zoomBtn.dataset.pageIdx, 10);
        openMenuLightbox(pIdx);
      }
    });

    // Double-click vào trang để xem phóng to siêu nét
    container.addEventListener('dblclick', () => {
      if (pageFlipInstance) {
        const cur = pageFlipInstance.getCurrentPageIndex();
        openMenuLightbox(cur);
      }
    });

    // Controls
    setupBookControls();

  } catch (err) {
    console.error('Lỗi khi khởi tạo PageFlip:', err);
  }
}

function updatePageStatus(currentPageIdx) {
  const currentBadge = document.getElementById('currentPageBadge');
  const arrowPrev = document.getElementById('arrowPrev');
  const arrowNext = document.getElementById('arrowNext');
  const total = MENU_PAGES.length;

  if (currentBadge) {
    currentBadge.innerHTML = `Trang <strong>${currentPageIdx + 1}</strong> <span class="total-pages">/ ${total}</span>`;
  }

  if (arrowPrev) arrowPrev.disabled = (currentPageIdx <= 0);
  if (arrowNext) arrowNext.disabled = (currentPageIdx >= total - 1);

  // Update thumbnails active state (Chỉ cuộn nội bộ dải thumbnail, không làm giật cuộn cả trang web)
  const thumbs = document.querySelectorAll('.thumb-item');
  const scrollContainer = document.getElementById('bookThumbnailsScroll');
  thumbs.forEach((th, i) => {
    if (i === currentPageIdx) {
      th.classList.add('active');
      if (scrollContainer) {
        const scrollLeft = th.offsetLeft - (scrollContainer.clientWidth / 2) + (th.offsetWidth / 2);
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    } else {
      th.classList.remove('active');
    }
  });

  // Update Category Pill active
  const curData = MENU_PAGES[currentPageIdx];
  if (curData) {
    document.querySelectorAll('.cat-pill-btn').forEach(pill => {
      if (pill.dataset.cat === curData.cat) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }
}

function setupBookControls() {
  // 2 Nút mũi tên chuyển trang 2 bên
  const arrowPrev = document.getElementById('arrowPrev');
  const arrowNext = document.getElementById('arrowNext');
  if (arrowPrev) {
    arrowPrev.addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flipPrev();
    });
  }
  if (arrowNext) {
    arrowNext.addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flipNext();
    });
  }

  // Category Pills Jump
  const catPills = document.querySelectorAll('.cat-pill-btn');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.cat;
      const targetIdx = MENU_PAGES.findIndex(p => p.cat === cat);
      if (targetIdx !== -1 && pageFlipInstance) {
        pageFlipInstance.flip(targetIdx);
      }
    });
  });
}

function renderThumbnails() {
  const scrollContainer = document.getElementById('bookThumbnailsScroll');
  if (!scrollContainer) return;
  scrollContainer.innerHTML = '';

  MENU_PAGES.forEach((p, idx) => {
    const item = document.createElement('div');
    item.className = 'thumb-item' + (idx === 0 ? ' active' : '');
    item.title = p.title;
    item.innerHTML = `
      <img src="${p.src}" alt="${p.title}" />
      <span class="thumb-idx">${idx + 1}</span>
    `;
    item.addEventListener('click', () => {
      if (pageFlipInstance) {
        pageFlipInstance.flip(idx);
      }
    });
    scrollContainer.appendChild(item);
  });
}

// Lightbox Modal for Menu Zoom
function openMenuLightbox(pageIndex) {
  const modal = document.getElementById('menuLightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  if (!modal || !img) return;

  const data = MENU_PAGES[pageIndex] || MENU_PAGES[0];
  img.src = data.src;
  if (caption) caption.textContent = `Trang ${pageIndex + 1}: ${data.title}`;
  modal.classList.add('open');
}

function closeMenuLightbox() {
  const modal = document.getElementById('menuLightboxModal');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   4. TABLE RESERVATION LOGIC
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('tableBookingForm');
  const dateInput = document.getElementById('bookingDate');
  if (!form) return;

  // Set min date là hôm nay
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const guests = document.getElementById('bookingGuests').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const area = document.getElementById('bookingArea').value;
    const notes = document.getElementById('bookingNotes').value.trim();

    // Validate phone VN
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số)!');
      document.getElementById('bookingPhone').focus();
      return;
    }

    // Sinh mã đặt bàn duy nhất
    const randomCode = 'THV-' + Math.floor(1000 + Math.random() * 9000);

    const bookingData = {
      code: randomCode,
      name,
      phone,
      guests,
      date,
      time,
      area,
      notes,
      promo: 'Miễn phí 100% đồ uống khai trương',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    // Lưu vào LocalStorage
    saveBookingToHistory(bookingData);

    // Hiển thị modal thành công
    showBookingSuccessModal(bookingData);

    // Reset form
    form.reset();
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
  });
}

function saveBookingToHistory(data) {
  try {
    const history = JSON.parse(localStorage.getItem('thviet_reservations') || '[]');
    history.unshift(data);
    localStorage.setItem('thviet_reservations', JSON.stringify(history.slice(0, 10)));
  } catch (e) {
    console.error('Cannot save to localStorage:', e);
  }
}

function showBookingSuccessModal(data) {
  const modal = document.getElementById('bookingSuccessModal');
  if (!modal) return;

  document.getElementById('summaryCode').textContent = data.code;
  document.getElementById('summaryName').textContent = data.name;
  document.getElementById('summaryPhone').textContent = data.phone;
  document.getElementById('summaryDateTime').textContent = `${data.time} ngày ${data.date}`;
  document.getElementById('summaryGuests').textContent = `${data.guests} người`;
  document.getElementById('summaryArea').textContent = data.area;
  document.getElementById('summaryNotes').textContent = data.notes || 'Không có';

  modal.classList.add('open');
}

function closeBookingSuccessModal() {
  const modal = document.getElementById('bookingSuccessModal');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   6. AMBIANCE GALLERY MODAL
   ========================================================================== */
function initAmbianceModal() {
  const cards = document.querySelectorAll('.ambiance-zoomable');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h3, h4')?.textContent || 'Không gian nhà hàng';
      if (img) {
        const modal = document.getElementById('menuLightboxModal');
        const lightboxImg = document.getElementById('lightboxImg');
        const caption = document.getElementById('lightboxCaption');
        if (modal && lightboxImg) {
          lightboxImg.src = img.src;
          if (caption) caption.textContent = title + ' - Mì Cay THVIET Tây Ninh';
          modal.classList.add('open');
        }
      }
    });
  });

  // Đóng modal khi click ra overlay hoặc bấm nút close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) overlay.classList.remove('open');
    });
  });

  // ESC key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

/* ==========================================================================
   8. HEADER, MOBILE MENU & SCROLL ACTIONS
   ========================================================================== */
function initHeaderAndScroll() {
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky shadow
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Tối ưu hóa điều khiển Mobile Navigation Drawer
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Đóng mobile menu khi bấm vào bất kỳ link điều hướng nào
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });

    // Đóng mobile menu khi bấm ra ngoài
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  // Lắng nghe sự kiện xoay màn hình hoặc đổi kích thước để cập nhật sách lật mượt mà
  let lastWindowWidth = window.innerWidth;
  let resizeTimer;
  window.addEventListener('resize', () => {
    // Chỉ cập nhật khi chiều ngang thay đổi (xoay máy hoặc resize trình duyệt)
    // Tuyệt đối không giật cập nhật khi lướt lên/xuống làm thanh địa chỉ mobile ẩn hiện
    if (window.innerWidth === lastWindowWidth) {
      return;
    }
    lastWindowWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (pageFlipInstance) {
        pageFlipInstance.update();
      }
    }, 300);
  });
}

/* ==========================================================================
   9. HEADER SLIDER BANNER (TỰ ĐỘNG CHUYỂN ẢNH 3 GIÂY/LẦN & NÚT MŨI TÊN 2 BÊN)
   ========================================================================== */
function initHeaderSlider() {
  const track = document.getElementById('headerSliderTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.slider-slide');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dots = document.querySelectorAll('.slider-dot');
  if (slides.length === 0) return;

  let currentIndex = 0;
  let sliderInterval = null;
  const SLIDE_DURATION = 3000; // Cài đặt 3s chuyển ảnh 1 lần theo yêu cầu mới

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    sliderInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopAutoPlay() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  }

  function restartAutoPlay() {
    startAutoPlay();
  }

  // Bắt sự kiện bấm nút mũi tên kế tiếp
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      restartAutoPlay();
    });
  }

  // Bắt sự kiện bấm nút mũi tên trước đó
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      restartAutoPlay();
    });
  }

  // Bắt sự kiện bấm vào từng thanh dot
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      restartAutoPlay();
    });
  });

  // Hỗ trợ cử chỉ vuốt ngón tay (Touch Swipe) mượt mà trên Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const sliderWrapper = track.closest('.slider-wrapper');

  if (sliderWrapper) {
    sliderWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 35) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        restartAutoPlay();
      }
    }, { passive: true });

    sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
    sliderWrapper.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

