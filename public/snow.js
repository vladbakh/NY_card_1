const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 3 + 1,
  s: Math.random() * 1 + 0.5
}));

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.9)";

  flakes.forEach(f => {
    f.y += f.s;
    if (f.y > h) {
      f.y = -5;
      f.x = Math.random() * w;
    }
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();
