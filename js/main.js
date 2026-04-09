// ============ PB Acrylic — Main JS ============

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initProductFilter();
  initLightbox();
  initFadeIn();
});

// ---------- Mobile Navigation Toggle ----------
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    menu.classList.toggle('hidden', isOpen);
    iconOpen.classList.toggle('hidden', !isOpen);
    iconClose.classList.toggle('hidden', isOpen);
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });
}

// ---------- Navbar Shadow on Scroll ----------
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Product Category Filter ----------
function initProductFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

// ---------- Gallery Lightbox ----------
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const items = document.querySelectorAll('.gallery-item');

  if (!lightbox || !items.length) return;

  let currentIndex = 0;

  function showItem(index) {
    currentIndex = index;
    const item = items[index];
    // Clone the gallery item content for the lightbox
    const clone = item.cloneNode(true);
    clone.classList.remove('aspect-square');
    clone.style.width = '80vw';
    clone.style.maxWidth = '600px';
    clone.style.height = '80vh';
    clone.style.maxHeight = '600px';
    content.innerHTML = '';
    content.appendChild(clone);
  }

  function open(index) {
    showItem(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  prevBtn.addEventListener('click', () => {
    showItem((currentIndex - 1 + items.length) % items.length);
  });

  nextBtn.addEventListener('click', () => {
    showItem((currentIndex + 1) % items.length);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

// ---------- Fade-in on Scroll (Intersection Observer) ----------
function initFadeIn() {
  const sections = document.querySelectorAll('section');

  // Skip if IntersectionObserver not supported
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  sections.forEach(section => {
    // Check if already in viewport
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    section.classList.add('fade-in');
    if (inView) {
      section.classList.add('visible');
    } else {
      observer.observe(section);
    }
  });
}
