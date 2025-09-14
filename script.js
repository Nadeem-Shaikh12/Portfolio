document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
  const page1 = document.getElementById("certificate-page-1");
  const page2 = document.getElementById("certificate-page-2");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  // Pagination Logic
  nextBtn.addEventListener("click", function () {
    page1.classList.add("d-none");
    page2.classList.remove("d-none");
    nextBtn.classList.add("d-none");
    prevBtn.classList.remove("d-none");
  });

  prevBtn.addEventListener("click", function () {
    page2.classList.add("d-none");
    page1.classList.remove("d-none");
    prevBtn.classList.add("d-none");
    nextBtn.classList.remove("d-none");
  });

  // Modal Logic
  const certImages = document.querySelectorAll(".cert-img");
  const modalImg = document.getElementById("modal-img");
  const modal = new bootstrap.Modal(document.getElementById("certificateModal"));

  certImages.forEach(img => {
    img.addEventListener("click", function () {
      modalImg.src = this.src;
      modal.show();
    });
  });
});