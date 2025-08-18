document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .animate-fade-in-up, .animate-fade-in-left, .animate-zoom-in"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Element terlihat setidaknya 10%
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.remove("opacity-0");

        if (entry.target.classList.contains("skill-item")) {
          const skillBar = entry.target.querySelector(".skill-bar");
          const progress = entry.target.dataset.progress;
          if (skillBar && progress) {
            skillBar.style.width = progress + "%";
            skillBar.classList.add("filled");
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Ganti background navbar saat scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "var(--shadow-medium)";
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.backgroundColor = "var(--card-bg-color)";
      navbar.style.boxShadow = "var(--shadow-light)";
    }
  });
});
