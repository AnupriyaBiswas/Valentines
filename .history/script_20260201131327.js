const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("tease-text");
const container = document.querySelector(".buttons");

// 🔒 Force identical size
const yesRectInit = yesBtn.getBoundingClientRect();
noBtn.style.width = `${yesRectInit.width}px`;
noBtn.style.height = `${yesRectInit.height}px`;


const messages = {
  top: ["Why are you cornering me 😭", "Not the top edge 😵"],
  bottom: ["Trapped at the bottom 😩", "I have nowhere to gooo"],
  left: ["Left side again?! 😤", "You’re relentless"],
  right: ["This edge is scary 😳", "STOP chasing me"]
};

// Velocity
let vx = 2.2;
let vy = 1.8;

// Never clickable
noBtn.style.pointerEvents = "none";

// 🔹 INITIAL POSITION — explicitly to the RIGHT of Yes
function placeNoToRightOfYes() {
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const offset = 20; // gap from Yes button

  let startX = yesRect.right - containerRect.left + offset;
  let startY =
    yesRect.top -
    containerRect.top +
    (yesRect.height - noBtn.offsetHeight) / 2;

  x = Math.min(startX, containerRect.width - noBtn.offsetWidth);
  y = Math.max(0, startY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Position state
let x = 0;
let y = 0;

// Collision check
function isOverlapping(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

// Movement loop
function updatePosition() {
  const rect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

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

  // ❗ Prevent overlap with Yes
  const noRect = noBtn.getBoundingClientRect();
  if (isOverlapping(noRect, yesRect)) {
    vx *= -1;
    x += vx * 4;
    noBtn.style.left = `${x}px`;
  }

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
    vx *= 1.04;
    vy *= 1.04;
    shakeScreen();
  }
});

function shakeScreen() {
  container.classList.add("shake");
  setTimeout(() => container.classList.remove("shake"), 200);
}

// Confetti hearts
function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = "20px";
    heart.style.animation = `fall ${Math.random() * 2 + 2}s linear`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}

// YES button
yesBtn.addEventListener("click", () => {
  launchConfetti();
  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #ff758c, #ff7eb3);
      color: white;
      font-family: 'Pacifico', cursive;
      text-align: center;
    ">
      <h1>YAYYYY 💖</h1>
      <p style="font-family: Poppins; font-size: 1.2rem;">
        Best decision you’ve made today 😌<br/>
        Happy Valentine’s 💕
      </p>
    </div>
  `;
});

// Init
placeNoToRightOfYes();
setInterval(updatePosition, 16);
