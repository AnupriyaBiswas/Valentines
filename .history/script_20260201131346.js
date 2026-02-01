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

// Never clickable
noBtn.style.pointerEvents = "none";

// 🔒 Force identical size
const yesRectInit = yesBtn.getBoundingClientRect();
noBtn.style.width = `${yesRectInit.width}px`;
noBtn.style.height = `${yesRectInit.height}px`;

// Velocity
let vx = 2.2;
let vy = 1.8;

// Position
let x = 0;
let y = 0;

// Rectangle overlap check
function isOverlapping(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

// Place No to the RIGHT of Yes (initial)
function placeNoToRightOfYes() {
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const gap = 20;

  x = yesRect.right - containerRect.left + gap;
  y =
    yesRect.top -
    containerRect.top +
    (yesRect.height - noBtn.offsetHeight) / 2;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Movement loop
function updatePosition() {
  const containerRect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  // Predict next position
  let nextX = x + vx;
  let nextY = y + vy;

  // Edge collision
  let edge = null;

  if (nextX <= 0 || nextX >= maxX) {
    vx *= -1;
    edge = nextX <= 0 ? "left" : "right";
    nextX = Math.max(0, Math.min(nextX, maxX));
  }

  if (nextY <= 0 || nextY >= maxY) {
    vy *= -1;
    edge = nextY <= 0 ? "top" : "bottom";
    nextY = Math.max(0, Math.min(nextY, maxY));
  }

  // Predict overlap with YES
  const predictedRect = {
    left: nextX + containerRect.left,
    right: nextX + containerRect.left + noBtn.offsetWidth,
    top: nextY + containerRect.top,
    bottom: nextY + containerRect.top + noBtn.offsetHeight
  };

  if (isOverlapping(predictedRect, yesRect)) {
    // Bounce away horizontally
    vx *= -1;
    nextX = x + vx * 2;
  }

  x = nextX;
  y = nextY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (edge) {
    teaseText.textContent =
      messages[edge][Math.floor(Math.random() * messages[edge].length)];
  }
}

// Panic acceleration near cursor
document.addEventListener("mousemove", (e) => {
  const noRect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (noRect.left + noRect.width / 2);
  const dy = e.clientY - (noRect.top + noRect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 100) {
    vx *= 1.03;
    vy *= 1.03;
    shakeScreen();
  }
});

// Screen shake
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

// YES click
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
