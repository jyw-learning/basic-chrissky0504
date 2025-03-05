const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
  }
}

document
  .getElementById("experience-btn")
  .addEventListener("click", function () {
    let experienceSection = document.getElementById("experience-section");
    document.getElementById("profile-section").classList.add("hidden"); // 隱藏個人名片
    experienceSection.classList.remove("hidden"); // 先顯示區塊
    setTimeout(() => {
      experienceSection.classList.add("active"); // 啟動淡入動畫
    }, 10);
  });

document.getElementById("back-btn").addEventListener("click", function () {
  let experienceSection = document.getElementById("experience-section");
  experienceSection.classList.remove("active"); // 先讓它淡出
  setTimeout(() => {
    experienceSection.classList.add("hidden"); // 完全隱藏
    document.getElementById("profile-section").classList.remove("hidden"); // 顯示個人名片
  }, 500); // 確保動畫結束後再隱藏
});

function initParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;
    particles.push(new Particle(x, y, radius, dx, dy));
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

document.getElementById("profile-img").addEventListener("click", function () {
  // 定義兩張圖片
  const img1 = "123.gif"; // 原始圖片
  const img2 = "456.jpeg"; // 新圖片（請替換成你的圖片）

  // 切換圖片
  this.src = this.src.includes(img1) ? img2 : img1;
});

initParticles();
animateParticles();
