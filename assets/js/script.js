// === SET CURRENT YEAR IN FOOTER ===
document.getElementById('year').textContent = new Date().getFullYear();

// === MENU TOGGLE ===
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// === LIGHTBOX MODAL ===
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal-close');

// Open modal on image click
document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.add('open');
    modalImg.src = img.src;
  });
});

// Close modal when X clicked
closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

// Close modal if clicked outside image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});

// === FADE-IN ON SCROLL ===
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));
});