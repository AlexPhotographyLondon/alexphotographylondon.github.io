// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// === SHRINKING BANNER ===
const banner = document.querySelector('.banner');
const bannerInner = document.querySelector('.banner-inner');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;
  let newHeight = Math.max(60, 110 - scrolled * 0.3);
  banner.style.height = newHeight + "px";
  let scale = Math.max(0.8, 1 - scrolled * 0.0015);
  bannerInner.style.transform = `scale(${scale})`;
});

// === MOBILE MENU ===
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// === ZOOM INSIDE IMAGE + DRAG ===
document.querySelectorAll(".zoomable").forEach(img => {
  let isZoomed = false;
  let startX, startY, scrollLeft, scrollTop;

  img.addEventListener("click", () => {
    isZoomed = !isZoomed;
    img.classList.toggle("zoomed");
    if (!isZoomed) {
      img.style.transform = "scale(1)";
      img.parentElement.scrollLeft = 0;
      img.parentElement.scrollTop = 0;
    }
  });

  img.parentElement.addEventListener("mousemove", e => {
    if (!isZoomed) return;
    const rect = img.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside container
    const y = e.clientY - rect.top;  // mouse Y inside container

    const moveX = ((x / rect.width) * (img.width * 2 - rect.width)) * -1;
    const moveY = ((y / rect.height) * (img.height * 2 - rect.height)) * -1;

    img.style.transformOrigin = `${x}px ${y}px`;
  });
});

// === FADE-IN ON SCROLL ===
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
});