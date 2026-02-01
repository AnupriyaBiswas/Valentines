const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("tease-text");
const container = document.querySelector(".buttons");

const messages = [
  "Nice try 😏",
  "Absolutely not 🙄",
  "Why are you chasing No? 🤨",
  "This is embarrassing for you 😭",
  "YES is right there 💕",
  "You know what you want 😌"
];

let messageIndex = 0;

function moveNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  let tries = 0;

  while (tries < 100) {
    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    const noRect = noBtn.getBoundingClientRect();

    if (!isOverlapping(noRect, yesRect)) break;
    tries++;
  }

  teaseText.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
}

function isOverlapping(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

// Track mouse globally
document.addEventListener("mousemove", (e) => {
  const noRect = noBtn.getBoundingClientRect();
  const distanceX = Math.abs(e.clientX - (noRect.left + noRect.width / 2));
  const distanceY = Math.abs(e.clientY - (noRect.top + noRect.height / 2));

  const dangerZone = 80; // px

  if (distanceX < dangerZone && distanceY < dangerZone) {
    moveNoButton();
  }
});
