document.addEventListener('DOMContentLoaded', function() {

    // Animasi fade-in untuk kartu proyek saat di-scroll
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% dari item terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Berhenti mengamati setelah animasi berjalan
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Opsional: Ganti background navbar saat scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(5px)';
        } else {
            navbar.style.backgroundColor = 'var(--light-color)';
            navbar.style.backdropFilter = 'none';
        }
    });

});