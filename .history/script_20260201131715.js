const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("tease-text");
const container = document.querySelector(".buttons");

/* ---------- CONFIG ---------- */
const CHASE_DISTANCE = 110;
const GAP = 20;

/* ---------- EDGE TAUNTS ---------- */
const messages = {
  top: ["Why are you cornering me 😭", "Not the top edge 😵"],
  bottom: ["Trapped at the bottom 😩", "I have nowhere to gooo"],
  left: ["Left side again?! 😤", "You’re relentless"],
  right: ["This edge is scary 😳", "STOP chasing me"]
};

/* ---------- STATE ---------- */
let isActive = false;
let vx = 2.2;
let vy = 1.8;
let x = 0;
let y = 0;

/* ---------- SETUP ---------- */
noBtn.style.pointerEvents = "none";

/* Force identical size */
const yesRectInit = yesBtn.getBoundingClientRect();
noBtn.style.width = `${yesRectInit.width}px`;
noBtn.style.height = `${yesRectInit.height}px`;

/* ---------- HELPERS ---------- */
function isOverlapping(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

/* ---------- INITIAL POSITION ---------- */
function placeNoToRightOfYes() {
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  x = yesRect.right - containerRect.left + GAP;
  y =
    yesRect.top -
    containerRect.top +
    (yesRect.height - noBtn.offsetHeight) / 2;

  /* HARD CLAMP */
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

/* ---------- MOVEMENT LOOP ---------- */
function updatePosition() {
  if (!isActive) return;

  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  x += vx;
  y += vy;

  let edge = null;

  /* HARD CLAMP + BOUNCE */
  if (x <= 0) {
    x = 0;
    vx *= -1;
    edge = "left";
  } else if (x >= maxX) {
    x = maxX;
    vx *= -1;
    edge = "right";
  }

  if (y <= 0) {
    y = 0;
    vy *= -1;
    edge = "top";
  } else if (y >= maxY) {
    y = maxY;
    vy *= -1;
    edge = "bottom";
  }

  /* PREVENT OVERLAP WITH YES */
  const noRect = {
    left: containerRect.left + x,
    right: containerRect.left + x + noBtn.offsetWidth,
    top: containerRect.top + y,
    bottom: containerRect.top + y + noBtn.offsetHeight
  };

  if (isOverlapping(noRect, yesRect)) {
    vx *= -1;
    x += vx * 6;

    /* CLAMP AGAIN */
    x = Math.max(0, Math.min(x, maxX));
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (edge) {
    teaseText.textContent =
      messages[edge][Math.floor(Math.random() * messages[edge].length)];
  }
}

/* ---------- CHASE DETECTION ---------- */
document.addEventListener("mousemove", (e) => {
  const noRect = noBtn.getBoundingClientRect();

  const dx = e.clientX - (noRect.left + noRect.width / 2);
  const dy = e.clientY - (noRect.top + noRect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < CHASE_DISTANCE) {
    if (!isActive) {
      teaseText.textContent = "Oh no… you’re chasing me 😨";
    }
    isActive = true;

    vx *= 1.02;
    vy *= 1.02;
    shakeScreen();
  }
});

/* ---------- SCREEN SHAKE ---------- */
function shakeScreen() {
  container.classList.add("shake");
  setTimeout(() => container.classList.remove("shake"), 200);
}

/* ---------- CONFETTI ---------- */
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

/* ---------- YES CLICK ---------- */
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

/* ---------- INIT ---------- */
placeNoToRightOfYes();
setInterval(updatePosition, 16);
