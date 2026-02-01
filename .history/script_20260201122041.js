const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("tease-text");
const container = document.querySelector(".buttons");

const messages = [
  "Nice try 😏",
  "Hey! That was rude 😤",
  "Why are you running after No? 🤨",
  "Just click Yes already 💕",
  "Okay now you’re just playing 🙄",
  "YES is literally right there 😭"
];

let messageIndex = 0;

function isOverlapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

noBtn.addEventListener("mouseenter", () => {
  const containerRect = container.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  let tries = 0;
  let newLeft, newTop;

  do {
    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    newLeft = Math.random() * maxX;
    newTop = Math.random() * maxY;

    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;

    const noRect = noBtn.getBoundingClientRect();
    tries++;
    
    if (!isOverlapping(noRect, yesRect)) break;
  } while (tries < 50); // safety limit

  teaseText.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
});
