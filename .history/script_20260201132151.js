const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".container");

const SAFE_DISTANCE = 5;

// Ensure No starts exactly where CSS puts it
const noInitialRect = noBtn.getBoundingClientRect();
const containerRect = container.getBoundingClientRect();

let noX = noInitialRect.left - containerRect.left;
let noY = noInitialRect.top - containerRect.top;

noBtn.style.left = `${noX}px`;
noBtn.style.top = `${noY}px`;

// Utility: rectangle overlap check
function isOverlapping(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

// Move No to a safe random position
function moveNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  let tries = 0;

  while (tries < 100) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    const proposedRect = {
      left: containerRect.left + x,
      right: containerRect.left + x + noBtn.offsetWidth,
      top: containerRect.top + y,
      bottom: containerRect.top + y + noBtn.offsetHeight
    };

    if (!isOverlapping(proposedRect, yesRect)) {
      noX = x;
      noY = y;
      noBtn.style.left = `${noX}px`;
      noBtn.style.top = `${noY}px`;
      return;
    }

    tries++;
  }
}

// Detect pointer proximity (≤ 5px from No button boundary)
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const nearX =
    e.clientX >= rect.left - SAFE_DISTANCE &&
    e.clientX <= rect.right + SAFE_DISTANCE;

  const nearY =
    e.clientY >= rect.top - SAFE_DISTANCE &&
    e.clientY <= rect.bottom + SAFE_DISTANCE;

  if (nearX && nearY) {
    moveNoButton();
  }
});
