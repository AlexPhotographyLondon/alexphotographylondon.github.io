// Safe DOM ready wrapper
document.addEventListener('DOMContentLoaded', () => {

  // set current year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ------- SHRINKING BANNER ------- */
  const banner = document.querySelector('.banner');
  const bannerInner = document.querySelector('.banner-inner');

  function updateBanner() {
    const scrolled = window.scrollY || window.pageYOffset;
    const newHeight = Math.max(60, 110 - scrolled * 0.3);
    if (banner) banner.style.height = newHeight + 'px';
    if (bannerInner) {
      const scale = Math.max(0.82, 1 - scrolled * 0.0015);
      bannerInner.style.transform = `scale(${scale})`;
    }
  }
  // run at start and on scroll
  updateBanner();
  window.addEventListener('scroll', updateBanner, { passive: true });

  /* ------- MENU TOGGLE ------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      // toggle aria-hidden for accessibility
      const isOpen = menu.classList.contains('open');
      menu.setAttribute('aria-hidden', !isOpen);
    });
  }

  /* ------- LIGHTBOX / MODAL ------- */
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.querySelector('.modal-close');

  // open modal when any gallery image is clicked
  document.querySelectorAll('.image-frame img').forEach(img => {
    img.addEventListener('click', (e) => {
      if (!modal || !modalImg) return;
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      // lock scroll on body
      document.body.style.overflow = 'hidden';
    });
  });

  // close modal function
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      // close only when clicking outside the image itself
      if (e.target === modal || e.target === modalImg) {
        closeModal();
      }
    });
  }

  // keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ------- FADE-IN ON SCROLL (IntersectionObserver) ------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
  }

});