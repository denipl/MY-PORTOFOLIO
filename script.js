document.addEventListener("DOMContentLoaded", function () {
  // Memilih semua elemen yang ingin dianimasikan saat scroll
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .animate-fade-in-up, .animate-fade-in-left, .animate-zoom-in"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Element terlihat setidaknya 10%
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // Untuk project-card dan skill-item
        entry.target.classList.remove("opacity-0"); // Untuk elemen yang animate-fade-in-up dll.

        // Animasi skill bar
        if (entry.target.classList.contains("skill-item")) {
          const skillBar = entry.target.querySelector(".skill-bar");
          const progress = entry.target.dataset.progress; // Ambil nilai progress dari data-progress
          if (skillBar && progress) {
            skillBar.style.width = progress + "%";
            skillBar.classList.add("filled"); // Tambahkan class untuk menandai sudah diisi
          }
        }
        observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
      }
    });
  }, observerOptions);

  // Menerapkan observer pada setiap elemen yang dipilih
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Ganti background navbar saat scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)"; // Lebih solid saat scroll
      navbar.style.boxShadow = "var(--shadow-medium)"; // Shadow lebih terlihat
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.backgroundColor = "var(--card-bg-color)"; // Kembali ke default
      navbar.style.boxShadow = "var(--shadow-light)"; // Shadow default
    }
  });
});
