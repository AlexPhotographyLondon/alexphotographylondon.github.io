// ===========================
// Set current year
// ===========================
document.getElementById('year').textContent = new Date().getFullYear();

// ===========================
// Shrinking Banner
// ===========================
const banner = document.querySelector('.banner');
const bannerInner = document.querySelector('.banner-inner');
window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;
  banner.style.height = Math.max(60, 110 - scrolled * 0.3) + "px";
  bannerInner.style.transform = `scale(${Math.max(0.8, 1 - scrolled * 0.0015)})`;
});

// ===========================
// Mobile Menu
// ===========================
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
menuToggle.addEventListener("click", () => menu.classList.toggle("open"));

// ===========================
// Helper: Capitalize first letter of each word
// ===========================
function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

// ===========================
// Modal / Lightbox
// ===========================
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");
let isZoomed = false, startX = 0, startY = 0, currentX = 0, currentY = 0;

// Wrap modal content in flex column for label at bottom
modal.style.display = "none";
modal.style.flexDirection = "column";
modal.style.alignItems = "center";
modal.style.justifyContent = "center";

// Open modal on image click (desktop & mobile)
document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    // Remove old modal location
    const oldLoc = document.querySelector(".modal-location");
    if (oldLoc) oldLoc.remove();

    // Show modal
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.classList.remove("zoomed");
    modalImg.style.transform = "translate(0px,0px) scale(1)";
    isZoomed = false;
    currentX = 0; currentY = 0;

    // Add location under image
    const loc = document.createElement("div");
    loc.className = "modal-location";
    loc.textContent = capitalizeWords(img.dataset.location);
    loc.style.textAlign = "center";
    loc.style.marginTop = "12px";
    loc.style.color = "#eee";
    loc.style.fontSize = "1rem";
    loc.style.fontFamily = "'Montserrat', sans-serif";
    loc.style.fontWeight = "500";
    loc.style.textTransform = "none";
    modalImg.insertAdjacentElement("afterend", loc);
  });
});

// Close modal
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Toggle zoom inside modal
modalImg.addEventListener("click", e => {
  e.stopPropagation();
  if (!isZoomed) {
    modalImg.classList.add("zoomed");
    modalImg.style.transform = "scale(2)";
    isZoomed = true;
  } else {
    modalImg.classList.remove("zoomed");
    modalImg.style.transform = "translate(0px,0px) scale(1)";
    currentX = 0; currentY = 0;
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

// ===========================
// Fade-in on scroll
// ===========================
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

// ===========================
// Desktop Hover Labels (bottom center)
// ===========================
document.querySelectorAll(".image-frame").forEach(frame => {
  const img = frame.querySelector(".zoomable");
  const location = capitalizeWords(img.dataset.location);

  // Create label
  const label = document.createElement("div");
  label.className = "location-label";
  label.textContent = location;
  label.style.position = "absolute";
  label.style.bottom = "10px";
  label.style.left = "50%";
  label.style.transform = "translateX(-50%)";
  label.style.color = "#fff";
  label.style.fontFamily = "'Montserrat', sans-serif";
  label.style.fontWeight = "500";
  label.style.fontSize = "1rem";
  label.style.textAlign = "center";
  label.style.pointerEvents = "none";
  label.style.opacity = "0";
  label.style.transition = "opacity 0.25s ease";
  label.style.textTransform = "none";

  frame.style.position = "relative"; // ensure absolute works
  frame.appendChild(label);

  // Show only on hover for desktop
  frame.addEventListener("mouseenter", () => { if (window.innerWidth > 768) label.style.opacity = "1"; });
  frame.addEventListener("mouseleave", () => { if (window.innerWidth > 768) label.style.opacity = "0"; });
});