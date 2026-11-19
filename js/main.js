/* ==========================================================================
   SCRIPT PRINCIPAL — CRISTIAN BLANCO (Criyer.github.io)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'criyer-portfolio-theme';
  const rootEl = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIconEl = document.getElementById('themeToggleIcon');
  const themeLabelEl = document.getElementById('themeToggleLabel');

  function applyTheme(theme) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    rootEl.setAttribute('data-theme', normalized);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-pressed', String(normalized === 'light'));
    }
    if (themeIconEl) {
      themeIconEl.textContent = normalized === 'light' ? '🌙' : '☀️';
    }
    if (themeLabelEl) {
      themeLabelEl.textContent = normalized === 'light' ? 'Modo oscuro' : 'Modo claro';
    }
  }

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (_) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const current = rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {}
    });
  }

  const navCollapseEl = document.getElementById('navbarNav');
  if (navCollapseEl && window.bootstrap && window.bootstrap.Collapse) {
    navCollapseEl.querySelectorAll('a.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapseEl.classList.contains('show')) {
          const instance = window.bootstrap.Collapse.getInstance(navCollapseEl) ||
            new window.bootstrap.Collapse(navCollapseEl, { toggle: false });
          instance.hide();
        }
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  const contactFeedback = document.getElementById('contactFeedback');
  if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const nameInput = document.getElementById('contactName');
      const senderName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'gracias';
      contactFeedback.className = 'alert alert-info mt-3 mb-0';
      contactFeedback.textContent =
        'Mensaje preparado, ' +
        senderName +
        '. Como este portfolio está alojado en GitHub Pages (sitio estático), puedes enviarlo directamente a cristian.blanco.dev@ejemplo.com o contactar por LinkedIn / GitHub.';
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
