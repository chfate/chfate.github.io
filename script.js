/* ============================================
   CHRISTOS MOIRAS — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. NAV BACKGROUND ON SCROLL =====
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

  // ===== 2. ACTIVE NAV LINK (Viewport Midpoint Based) =====
  const navSections = document.querySelectorAll('section[id]');
  const navLinksActive = document.querySelectorAll('.nav-link');
  const navLogo = document.querySelector('.nav-logo');

  if (navSections.length > 0) {

    const activateLink = () => {

      // HERO AREA
      if (window.scrollY < 200) {
        navLinksActive.forEach(link => link.classList.remove("active"));
        if (navLogo) navLogo.classList.add("active");
        return;
      } else {
        if (navLogo) navLogo.classList.remove("active");
      }

      let current = "";
      const viewportMiddle = window.innerHeight / 2;

      navSections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          current = section.getAttribute("id");
        }
      });

      navLinksActive.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", activateLink, { passive: true });
    activateLink();
  }

  // ===== 3. SMOOTH SCROLL =====
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

  // ===== 4. HERO DUST PARTICLES =====
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