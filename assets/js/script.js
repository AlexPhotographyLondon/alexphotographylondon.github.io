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

// === LIGHTBOX ===
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

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