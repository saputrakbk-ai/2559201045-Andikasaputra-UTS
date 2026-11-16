/* =========================================================
   Cafe Tomoro — Script
   Fitur: (1) hamburger menu, (2) validasi form,
          (3) render & filter katalog dari array objek
   ========================================================= */

// ---------- 1. MENU HAMBURGER (bonus 3 poin) ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ---------- 2. VALIDASI FORMULIR (bonus 3 poin) ----------
const form = document.getElementById('kontakForm');

if (form) {
  const fields = {
    nama:    { el: document.getElementById('nama'),    err: document.getElementById('errNama') },
    email:   { el: document.getElementById('email'),   err: document.getElementById('errEmail') },
    telepon: { el: document.getElementById('telepon'), err: document.getElementById('errTelepon') },
    topik:   { el: document.getElementById('topik'),   err: document.getElementById('errTopik') },
    pesan:   { el: document.getElementById('pesan'),   err: document.getElementById('errPesan') },
  };
  const successMsg = document.getElementById('successMsg');

  function validateField(key) {
    const { el, err } = fields[key];
    let message = '';

    if (!el.value.trim()) {
      message = 'Kolom ini wajib diisi.';
    } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
      message = 'Format email tidak valid.';
    } else if (key === 'telepon' && !/^[0-9]{10,13}$/.test(el.value)) {
      message = 'Nomor HP harus 10–13 digit angka.';
    } else if (key === 'pesan' && el.value.length < 10) {
      message = 'Pesan minimal 10 karakter.';
    }

    err.textContent = message;
    return message === '';
  }

  // Validasi realtime saat blur & input
  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].err.textContent) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;
    Object.keys(fields).forEach((key) => {
      if (!validateField(key)) allValid = false;
    });

    if (allValid) {
      success