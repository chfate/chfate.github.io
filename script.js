/* ============================================
   CHRISTOS MOIRAS — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. SCROLL FADE-IN =====
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ===== 2. MOBILE MENU =====
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

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
    updateNav();
  }

  // ===== 4. ACTIVE NAV LINK =====
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

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!link.getAttribute('href').startsWith('#')) return;

        isScrollingFromClick = true;
        allNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        setTimeout(() => {
          isScrollingFromClick = false;
          updateActiveLink();
        }, 800);
      });
    });

    updateActiveLink();
  }

  // ===== 5. VIDEO PERFORMANCE =====
  const videos = document.querySelectorAll('.project-media[autoplay]');

  if (videos.length > 0 && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach(video => videoObserver.observe(video));
  }

  // ===== 6. SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();

        const navHeight = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height')
        ) || 64;

        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== 7. HERO DUST PARTICLES =====
  const canvas = document.getElementById("dustCanvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.y -= this.speedY;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

});