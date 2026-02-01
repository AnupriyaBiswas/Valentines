const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("tease-text");
const container = document.querySelector(".buttons");

const messages = {
  top: ["Why are you cornering me 😭", "Not the top edge 😵"],
  bottom: ["Trapped at the bottom 😩", "I have nowhere to gooo"],
  left: ["Left side again?! 😤", "You’re relentless"],
  right: ["This edge is scary 😳", "STOP chasing me"]
};

let vx = 2.2;
let vy = 1.8;
let cornered = false;

// Never clickable
noBtn.style.pointerEvents = "none";

// Initial position
let x = 60;
let y = 20;

function updatePosition() {
  const rect = container.getBoundingClientRect();
  const maxX = rect.width - noBtn.offsetWidth;
  const maxY = rect.height - noBtn.offsetHeight;

  x += vx;
  y += vy;

  let edge = null;

  if (x <= 0 || x >= maxX) {
    vx *= -1;
    edge = x <= 0 ? "left" : "right";
    x = Math.max(0, Math.min(x, maxX));
  }

  if (y <= 0 || y >= maxY) {
    vy *= -1;
    edge = y <= 0 ? "top" : "bottom";
    y = Math.max(0, Math.min(y, maxY));
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (edge) {
    teaseText.textContent =
      messages[edge][Math.floor(Math.random() * messages[edge].length)];
  }
}

// Mouse proximity = panic mode
document.addEventListener("mousemove", (e) => {
  const noRect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (noRect.left + noRect.width / 2);
  const dy = e.clientY - (noRect.top + noRect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 100) {
    vx *= 1.05;
    vy *= 1.05;
    shakeScreen();
  }
});

function shakeScreen() {
  container.classList.add("shake");
  setTimeout(() => container.classList.remove("shake"), 200);
}

// Animate
setInterval(updatePosition, 16);
