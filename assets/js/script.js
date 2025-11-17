// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
// Get modal elements
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");

// Open modal when image is clicked
document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

// Close modal when X is clicked
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close modal if user clicks outside the image
modal.onclick = function(e) {
  if (e.target === modal) modal.style.display = "none";
  <script>
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
</script>
}