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
menuToggle.addEventListener("click", () => menu.classList.toggle("open"));

// === LIGHTBOX / MODAL WITH ZOOM & PAN ===
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");

let isZoomed = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;

// Utility function: Capitalize first letter of each word
function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

// Open modal & show location under image on mobile
document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    // Remove old modal location
    const existing = document.querySelector(".modal-location");
    if (existing) existing.remove();

    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.classList.remove("zoomed");
    modalImg.style.transform = "translate(0px,0px) scale(1)";
    isZoomed = false;
    currentX = 0;
    currentY = 0;

    // Mobile location under image
    const loc = document.createElement("div");
    loc.className = "modal-location";
    loc.textContent = capitalizeWords(img.dataset.location);
    loc.style.textAlign = "center";
    loc.style.marginTop = "12px";
    loc.style.color = "#eee";
    loc.style.fontSize = "1rem";
    loc.style.fontFamily = "'Montserrat', sans-serif";
    loc.style.fontWeight = "500";

    modalImg.insertAdjacentElement("afterend", loc);
  });
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
  const loc = document.querySelector(".modal-location");
  if (loc) loc.remove();
};

modal.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    const loc = document.querySelector(".modal-location");
    if (loc) loc.remove();
  }
};

// Toggle zoom
modalImg.addEventListener("click", e => {
  e.stopPropagation();
  if (!isZoomed) {
    modalImg.classList.add("zoomed");
    modalImg.style.transform = "scale(2)";
    isZoomed = true;
  } else {
    modalImg.classList.remove("zoomed");
    modalImg.style.transform = "translate(0px,0px) scale(1)";
    currentX = 0;
    currentY = 0;
    isZoomed = false;
  }
});

// Pan when zoomed
modalImg.addEventListener("mousedown", e => {
  if (!isZoomed) return;
  e.preventDefault();
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;

  function onMouseMove(e) {
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    modalImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(2)`;
  }
  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
});

// === FADE-IN ON SCROLL ===
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
});

// === IMAGE LOCATION LABEL (Desktop Hover) ===
document.querySelectorAll(".image-frame").forEach(frame => {
  const img = frame.querySelector(".zoomable");
  const location = capitalizeWords(img.dataset.location);

  // Create hover label
  const label = document.createElement("div");
  label.className = "location-label";
  label.textContent = location;
  frame.appendChild(label);
});