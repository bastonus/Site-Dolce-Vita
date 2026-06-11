/* ===================================================
   La Dolce Vita — Trattoria Italienne de Franco
   JavaScript : Interactions & Animations
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────
  // 1. NAVBAR — Scroll effect + mobile toggle
  // ──────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  // Navbar background on scroll
  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Initial check

  // Mobile burger toggle
  navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navBurger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 60;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // ──────────────────────────────────────────────
  // 2. SCROLL REVEAL — Intersection Observer
  // ──────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keeps it simple
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ──────────────────────────────────────────────
  // 3. MENU — Category tabs
  // ──────────────────────────────────────────────
  const catButtons = document.querySelectorAll('.menu__cat-btn');
  const menuSections = {
    aperitivi: document.getElementById('menu-aperitivi'),
    primi: document.getElementById('menu-primi'),
    secondi: document.getElementById('menu-secondi'),
    dolci: document.getElementById('menu-dolci'),
    formules: document.getElementById('menu-formules'),
  };

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide menu sections with fade effect
      const category = btn.dataset.category;
      Object.keys(menuSections).forEach(key => {
        const section = menuSections[key];
        if (key === category) {
          section.style.display = '';
          // Re-trigger reveal animation
          section.classList.remove('visible');
          requestAnimationFrame(() => {
            section.classList.add('visible');
          });
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  // Ensure first category items are visible
  const firstMenu = document.getElementById('menu-aperitivi');
  if (firstMenu) {
    firstMenu.classList.add('visible');
  }

  // ──────────────────────────────────────────────
  // 4. GALLERY — Lightbox
  // ──────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery__item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.dataset.img;
      if (imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ──────────────────────────────────────────────
  // 5. BACK TO TOP
  // ──────────────────────────────────────────────
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ──────────────────────────────────────────────
  // 6. PARALLAX subtle on hero (desktop only)
  // ──────────────────────────────────────────────
  const heroContent = document.querySelector('.hero__content');

  if (window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      }
    });
  }

  // ──────────────────────────────────────────────
  // 7. MUSIC TOGGLE
  // ──────────────────────────────────────────────
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  if (musicToggle && bgMusic) {
    bgMusic.volume = 0.3;

    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
      } else {
        bgMusic.play().catch(() => {});
        musicToggle.classList.add('playing');
      }
      isPlaying = !isPlaying;
    });
  }

});
