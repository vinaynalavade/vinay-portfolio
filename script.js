/**
 * VINAY NALAVADE — PROFESSIONAL PORTFOLIO CONTROLLER
 * Lightweight, Performant, Accessible Vanilla JavaScript
 * Zero External Dependencies · GitHub Pages Compatible
 */

(function () {
  'use strict';

  // ========================================================================
  // 1. THEME CONTROLLER (Anti-Flash, LocalStorage, System Listener)
  // ========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');

  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

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
    const isDark = theme === 'dark';
    themeToggleBtn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    themeToggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
  }

  function applyTheme(theme, saveManual = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (saveManual) {
      localStorage.setItem('portfolio_theme', theme);
    }
    updateThemeButton(theme);
  }

  // Initial sync with DOM state
  const initialTheme = document.documentElement.getAttribute('data-theme') || getEffectiveTheme();
  applyTheme(initialTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = active === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  // System OS theme change listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio_theme')) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // ========================================================================
  // 2. ACCESSIBLE MOBILE NAVIGATION DRAWER
  // ========================================================================
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions a');

  function openDrawer() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first link in drawer
    const firstLink = mobileDrawer.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Keyboard dismissal via Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // ========================================================================
  // 3. SCROLL SPY (Active Nav Link Sync)
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-10% 0px -55% 0px' }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  // ========================================================================
  // 4. ACCESSIBLE RECRUITER FOCUS FILTER
  // ========================================================================
  const filterChips = document.querySelectorAll('.filter-chip');
  const duties = document.querySelectorAll('.experience-duty[data-focus]');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const targetFocus = chip.getAttribute('data-focus-target') || 'all';

      // Update active chip state and ARIA pressed attributes
      filterChips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');

      // Update duties highlighting
      if (targetFocus === 'all') {
        duties.forEach((item) => {
          item.classList.remove('focus-highlight');
          item.classList.remove('focus-dim');
        });
      } else {
        duties.forEach((item) => {
          const itemFocus = item.getAttribute('data-focus') || '';
          if (itemFocus.includes(targetFocus)) {
            item.classList.add('focus-highlight');
            item.classList.remove('focus-dim');
          } else {
            item.classList.add('focus-dim');
            item.classList.remove('focus-highlight');
          }
        });
      }
    });
  });

})();
