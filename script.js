/**
 * VINAY NALAVADE — PROFESSIONAL PORTFOLIO ENGINE
 * Lightweight, Performant, Dependency-Free Vanilla JavaScript
 */

(function () {
  'use strict';

  // ==========================================
  // 1. THEME CONTROLLER (System Default + Manual Override + Zero Flash)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');

  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function getEffectiveTheme() {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateThemeButton(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }

  function applyTheme(theme, saveManual = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (saveManual) {
      localStorage.setItem('portfolio_theme', theme);
    }
    updateThemeButton(theme);
  }

  // Initial sync with button icon
  const currentTheme = document.documentElement.getAttribute('data-theme') || getEffectiveTheme();
  applyTheme(currentTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = active === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio_theme')) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // ==========================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // 3. SCROLL SPY (Active Nav Link)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => navObserver.observe(section));
  }

  // ==========================================
  // 4. RECRUITER FOCUS HIGHLIGHT FILTER
  // ==========================================
  window.filterRecruiterFocus = function (focusArea, clickedChip) {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => chip.classList.remove('active'));
    if (clickedChip) clickedChip.classList.add('active');

    const duties = document.querySelectorAll('.experience-duty[data-focus]');
    
    if (focusArea === 'all') {
      duties.forEach(item => {
        item.classList.remove('focus-highlight');
        item.classList.remove('focus-dim');
      });
    } else {
      duties.forEach(item => {
        const itemFocus = item.getAttribute('data-focus') || '';
        if (itemFocus.includes(focusArea)) {
          item.classList.add('focus-highlight');
          item.classList.remove('focus-dim');
        } else {
          item.classList.add('focus-dim');
          item.classList.remove('focus-highlight');
        }
      });
    }
  };

})();
