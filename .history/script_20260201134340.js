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

// Confetti creation function
function createConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  const colors = ["confetti-pink", "confetti-yellow", "confetti-purple", "confetti-cyan"];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    confetti.style.animationDuration = (Math.random() * 1.5 + 2.5) + "s";
    confettiContainer.appendChild(confetti);
  }
  
  // Clean up confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 5000);
}

// Handle Yes button click
yesBtn.addEventListener("click", () => {
  const celebration = document.getElementById("celebration");
  const celebrationGif = document.getElementById("celebrationGif");
  
  // Start with first GIF
  celebrationGif.src = "https://media1.tenor.com/m/9qZhM0uswAYAAAAd/bully-maguire-dance.gif";
  celebration.classList.remove("hidden");
  
  // Start confetti
  createConfetti();
  
  // Switch to second GIF after 4 seconds
  setTimeout(() => {
    celebrationGif.src = "https://media.tenor.com/7gktiH8ApJIAAAAj/gog-the-alien-alien-dog.gif";
    createConfetti(); // More confetti for second GIF
    
    // Close after another 4 seconds
    setTimeout(() => {
      celebration.classList.add("hidden");
    }, 4000);
  }, 4000);
});
