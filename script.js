const canvas = document.getElementById('spidermanCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const mouse = { x: null, y: null };

class Dot {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.radius * 2; // Add glow effect
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function createDots() {
  const color = "#555555";
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 2 + 1;
    dots.push(new Dot(x, y, radius, color));
  }
}

function drawDots() {
  dots.forEach(dot => dot.draw());
}

function connectDots() {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    const distance = Math.hypot(mouse.x - dot.x, mouse.y - dot.y);

    if (distance < 150) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(dot.x, dot.y);

      const intensity = 1 - distance / 150;
      ctx.strokeStyle = `rgba(255, 255, 255, ${intensity})`;
      ctx.lineWidth = 1;

     // Add glowing effect to the connecting lines
ctx.shadowBlur = 20 + 30 * intensity; // Dynamic blur for a stronger glow based on proximity
ctx.shadowColor = `rgba(${255 - intensity * 100}, ${200 + intensity * 55}, ${255}, ${0.9 - intensity * 0.2})`; // Gradient glow with a neon look
ctx.strokeStyle = `rgba(0, ${200 + intensity * 55}, 255, ${intensity})`; // Vivid neon cyan with opacity based on proximity
ctx.lineWidth = 1.5 + intensity; // Thicker lines closer to the cursor
ctx.stroke();

    }
  }
}

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

canvas.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  if (mouse.x !== null && mouse.y !== null) {
    connectDots();
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  dots.length = 0;
  createDots();
});

createDots();
animate();
