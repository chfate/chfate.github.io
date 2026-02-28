/* ============================================
   CHRISTOS MOIRAS — PORTFOLIO SCRIPTS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // ===== 1. SCROLL FADE-IN (Intersection Observer) =====
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show everything if no IntersectionObserver
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ===== 2. MOBILE MENU TOGGLE =====
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        navToggle.focus();
      }
    });
  }

  // ===== 3. NAV BACKGROUND ON SCROLL =====
  const nav = document.querySelector('.main-nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run on load
  }

  // ===== 4. ACTIVE NAV LINK ON SCROLL + CLICK =====
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length > 0 && allNavLinks.length > 0) {
    let isScrollingFromClick = false;

    const updateActiveLink = () => {
      if (isScrollingFromClick) return;

      const scrollPos = window.scrollY + 180;
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPos >= sectionTop - 120 && scrollPos < sectionBottom + 300) {
          currentSection = section.getAttribute('id');
        }
      });

      // Τέλος σελίδας → Contact active
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 180) {
        currentSection = 'contact';
      }

      allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    };

    // Μόνο ένας scroll listener
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // Click → άμεσο active + flag προστασίας + αφαίρεση από logo
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!link.getAttribute('href').startsWith('#')) return;

        isScrollingFromClick = true;
        allNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Αφαίρεσε active από logo όταν πατάς section
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
          navLogo.classList.remove('active');
        }

        setTimeout(() => {
          isScrollingFromClick = false;
          updateActiveLink();
        }, 800); // χρόνος smooth scroll
      });
    });

    // Αρχική εκτέλεση
    updateActiveLink();
  }

  // ===== ΝΕΑ: Logo active ΜΟΝΟ όταν είμαστε στην κορυφή / χωρίς hash =====
  const updateLogoActive = () => {
    const navLogo = document.querySelector('.nav-logo');
    if (!navLogo) return;

    // Ενεργό ΜΟΝΟ αν δεν υπάρχει hash ΚΑΙ scrollY < 150px (κορυφή)
    if (!window.location.hash && window.scrollY < 150) {
      navLogo.classList.add('active');
    } else {
      navLogo.classList.remove('active');
    }
  };

  // Τρέξε το αρχικά
  updateLogoActive();

  // Τρέξε το όταν σκρολάρεις ή αλλάζει hash
  window.addEventListener('scroll', updateLogoActive, { passive: true });
  window.addEventListener('hashchange', updateLogoActive);

  // ===== 5. VIDEO PERFORMANCE — Pause off-screen videos =====
  const videos = document.querySelectorAll('.project-media[autoplay]');
  if (videos.length > 0 && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // catch autoplay errors silently
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.25
    });
    videos.forEach(video => videoObserver.observe(video));
  }

  // ===== 6. SMOOTH SCROLL FALLBACK (older browsers) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 64;
        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  });
});