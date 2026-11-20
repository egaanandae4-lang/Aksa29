// =========================================
// 1. GANTI TEMA (Pastel Terang <-> Cyberpunk Gelap)
// =========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const htmlEl = document.documentElement;

// Cek tema tersimpan di localStorage
const savedTheme = localStorage.getItem('portfolio-theme') || 'pastel';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const nextTheme = currentTheme === 'pastel' ? 'cyberpunk' : 'pastel';
  applyTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (theme === 'cyberpunk') {
    themeIcon.textContent = '⚡';
    themeLabel.textContent = 'Cyberpunk';
  } else {
    themeIcon.textContent = '🌸';
    themeLabel.textContent = 'Pastel';
  }
}

// =========================================
// 2. MENU MOBILE
// =========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Tutup menu saat link diklik di tampilan mobile
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// =========================================
// 3. FILTER GALERI & LIGHTBOX MODAL
// =========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filterValue === 'all' || filterValue === category) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// Lightbox Modal saat item galeri diklik
const modal = document.getElementById('lightboxModal');
const closeModal = document.getElementById('closeModal');
const modalVisual = document.getElementById('modalVisual');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const thumb = item.querySelector('.gallery-thumb');
    const title = item.querySelector('h3').textContent;
    const desc = item.querySelector('p').textContent;

    modalVisual.className = 'modal-visual ' + thumb.classList[1];
    modalVisual.textContent = thumb.textContent.trim();
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.classList.add('open');
  });
});

closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

// =========================================
// 4. VALIDASI FORMULIR KONTAK
// =========================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formFeedback.textContent = '⚠️ Mohon lengkapi semua kolom terlebih dahulu.';
    return;
  }

  formFeedback.textContent = `✅ Terima kasih, ${name}! Pesanmu berhasil disimulasikan terkirim.`;
  contactForm.reset();
});
