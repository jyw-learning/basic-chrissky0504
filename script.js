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

// 修正專案圖片顯示功能，增加放大滾動功能
document.addEventListener("DOMContentLoaded", function () {
  const projectImageContainer = document.getElementById(
    "project-image-container"
  );
  const projectImage = document.getElementById("project-image");
  const projectItems = document.querySelectorAll(".experience-list ul li");
  const closeBtn = document.querySelector(".close-btn");

  const projectImages = {
    "金融商品分析-用大數據分析股票": "meta.png",
    智慧多功能移動垃圾桶: "trashcan.png",
    新世代觀光用翻譯機與會議機: "trans.png",
  };

  // 關閉按鈕點擊事件
  closeBtn.addEventListener("click", function () {
    projectImageContainer.classList.remove("visible");
  });

  // 點擊背景也可以關閉
  projectImageContainer.addEventListener("click", function (e) {
    if (e.target === projectImageContainer) {
      projectImageContainer.classList.remove("visible");
    }
  });

  // ESC鍵關閉圖片
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      projectImageContainer.classList.contains("visible")
    ) {
      projectImageContainer.classList.remove("visible");
    }
  });

  // 為每個專案項目添加點擊事件
  projectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.textContent.trim();

      // 檢查是否有對應的圖片
      if (projectImages[text]) {
        // 確保圖片加載完成後再顯示
        projectImage.onload = function () {
          projectImageContainer.classList.add("visible");
        };
        projectImage.src = projectImages[text];
      }
    });
  });
});

initParticles();
animateParticles();
