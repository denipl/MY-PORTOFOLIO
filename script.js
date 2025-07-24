document.addEventListener("DOMContentLoaded", function () {
  // Memilih semua elemen yang ingin dianimasikan saat scroll
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Menerapkan observer pada setiap elemen yang dipilih
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Opsional: Ganti background navbar saat scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      navbar.style.backdropFilter = "blur(5px)";
    } else {
      navbar.style.backgroundColor = "var(--light-color)";
      navbar.style.backdropFilter = "none";
    }
  });
});
