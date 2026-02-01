const container = document.querySelector(".container");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const teaseText = document.getElementById("tease-text");

const SAFE_DISTANCE = 5;

const messages = [
  "Nice try 😏",
  "Absolutely not 🙄",
  "Why are you chasing No? 🤨",
  "This is embarrassing for you 😭",
  "YES is right there 💕",
  "You know what you want 😌"
];

let messageIndex = 0;

// Initial placement: right of Yes
function placeNoNearYes() {
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const x = yesRect.right - containerRect.left + 20;
  const y =
    yesRect.top -
    containerRect.top +
    (yesRect.height - noBtn.offsetHeight) / 2 +
    10; // Move down a bit

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function isOverlapping(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

// Move No when pointer is too close
function moveNo() {
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    const noRect = {
      left: containerRect.left + x,
      right: containerRect.left + x + noBtn.offsetWidth,
      top: containerRect.top + y,
      bottom: containerRect.top + y + noBtn.offsetHeight
    };

    if (!isOverlapping(noRect, yesRect)) {
      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;
      
      // Update tease text
      teaseText.textContent = messages[messageIndex];
      messageIndex = (messageIndex + 1) % messages.length;
      
      return;
    }
  }
}

// Pointer proximity detection
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const nearX =
    e.clientX >= rect.left - SAFE_DISTANCE &&
    e.clientX <= rect.right + SAFE_DISTANCE;

  const nearY =
    e.clientY >= rect.top - SAFE_DISTANCE &&
    e.clientY <= rect.bottom + SAFE_DISTANCE;

  if (nearX && nearY) {
    moveNo();
  }
});

// Init
placeNoNearYes();

// Handle Yes button click
yesBtn.addEventListener("click", () => {
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");
  
  // Close celebration after 4 seconds
  setTimeout(() => {
    celebration.classList.add("hidden");
  }, 4000);
});
