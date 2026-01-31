/* --- PART 1: NEURAL NETWORK BACKGROUND ANIMATION --- */
const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

// Konfigurasi Visual
const properties = {
  particleColor: "rgba(100, 255, 218, 0.5)", // Cyan
  lineColor: "rgba(100, 255, 218, 0.2)",
  particleCount: 60, // Kurangi jika lag di HP
  connectionDistance: 150,
  speed: 0.5,
};

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.velocityX = (Math.random() - 0.5) * properties.speed;
    this.velocityY = (Math.random() - 0.5) * properties.speed;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Pantulan Dinding
    if (this.x < 0 || this.x > width) this.velocityX *= -1;
    if (this.y < 0 || this.y > height) this.velocityY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = properties.particleColor;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  // Sesuaikan jumlah partikel dengan ukuran layar
  const count = window.innerWidth < 768 ? 30 : properties.particleCount;

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Gambar Garis Koneksi
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < properties.connectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = properties.lineColor;
        ctx.lineWidth = 1 - distance / properties.connectionDistance;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

// Event Listeners untuk Canvas
window.addEventListener("resize", () => {
  resize();
  initParticles();
});

/* --- PART 2: MOBILE MENU TOGGLE --- */
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

// Buka/Tutup Menu
if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navList.classList.toggle("active");
  });
}

// Tutup menu saat link diklik
document.querySelectorAll(".nav-list li a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navList.classList.remove("active");
  });
});

// Jalankan Fungsi Awal
resize();
initParticles();
animateParticles();
