const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("tease-text");
const container = document.querySelector(".container");

const messages = [
  "Nice try 😏",
  "Absolutely not 🙄",
  "Why are you chasing No? 🤨",
  "This is embarrassing for you 😭",
  "YES is right there 💕",
  "You know what you want 😌"
];

let messageIndex = 0;

// No button is never clickable
noBtn.style.pointerEvents = "none";

function isOverlapping(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const padding = 12;

  const maxX = containerRect.width - noBtn.offsetWidth - padding;
  const maxY = containerRect.height - noBtn.offsetHeight - padding;

  let tries = 0;
  let placed = false;

  // Normal random movement
  while (tries < 20) {
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    // Clamp (extra safety)
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    const noRect = noBtn.getBoundingClientRect();
    if (!isOverlapping(noRect, yesRect)) {
      placed = true;
      break;
    }

    tries++;
  }

  // Cornered → edge-lock
  if (!placed) {
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0: // TOP
        x = Math.random() * maxX;
        y = 0;
        break;
      case 1: // BOTTOM
        x = Math.random() * maxX;
        y = maxY;
        break;
      case 2: // LEFT
        x = 0;
        y = Math.random() * maxY;
        break;
      case 3: // RIGHT
        x = maxX;
        y = Math.random() * maxY;
        break;
    }

    // Final clamp
    noBtn.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
    noBtn.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
  }

  teaseText.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
}


// Desktop: run away before hover
document.addEventListener("mousemove", (e) => {
  const noRect = noBtn.getBoundingClientRect();

  const dx = e.clientX - (noRect.left + noRect.width / 2);
  const dy = e.clientY - (noRect.top + noRect.height / 2);

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 90) {
    moveNoButton();
  }
});

// Mobile: run away on touch
document.addEventListener("touchstart", () => {
  moveNoButton();
});
