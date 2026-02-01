const container = document.querySelector(".container");
const buttons = document.querySelector(".buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const SAFE_DISTANCE = 5;

// STEP 1: Capture initial position (while No is still in buttons flow)
const noRect = noBtn.getBoundingClientRect();
const containerRect = container.getBoundingClientRect();

// Convert to container-relative coordinates
let noX = noRect.left - containerRect.left;
let noY = noRect.top - containerRect.top;

// STEP 2: Move No into absolute positioning relative to container
noBtn.style.left = `${noX}px`;
noBtn.style.top = `${noY}px`;
noBtn.style.pointerEvents = "none";

// Utility: rectangle overlap
function isOverlapping(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

// Move No to a safe random position inside container
function moveNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  for (let i = 0; i < 100; i++) {
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
  }
}

// Pointer proximity detection (≤ 5px)
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
