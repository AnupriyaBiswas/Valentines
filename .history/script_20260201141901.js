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

  // Position to the right of Yes button
  const x = yesRect.right - containerRect.left + 15;
  // Align to exact same Y position as Yes button (top edge)
  const y = yesRect.top - containerRect.top;

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
  
  // Array of GIFs to play in sequence
  const gifs = [
    "https://media1.tenor.com/m/9qZhM0uswAYAAAAd/bully-maguire-dance.gif",
    "https://media.tenor.com/7gktiH8ApJIAAAAj/gog-the-alien-alien-dog.gif",
    "https://media1.tenor.com/m/edfhJ4r7MTkAAAAd/never-gonna-give-you-up.gif",
    "https://media.tenor.com/iA_pbov0m2kAAAAj/cat-by-ednastochi.gif",
    "https://media1.tenor.com/m/Sy2ozV34KqQAAAAd/funny.gif",
    "https://media1.tenor.com/m/d-m-p0EQpTcAAAAd/monkey-ape.gif",
    "https://media1.tenor.com/m/7dXn1Cgpq1gAAAAd/kermit-the-frog-heart-meme.gif",
    "https://media1.tenor.com/m/ExQMgXBiHzkAAAAd/in-love.gif",
    "https://media1.tenor.com/m/xowrjq53j8EAAAAd/love-you.gif",
    "https://media1.tenor.com/m/L5hCthSx6a8AAAAd/cat.gif",
    "https://media1.tenor.com/m/ucZJU_DIh8QAAAAd/love-you-in-love.gif",
    "https://media1.tenor.com/m/adNdNxSschkAAAAd/peach-goma-goma-peach.gif"
  ];
  
  let gifIndex = 0;
  
  // Show celebration
  celebration.classList.remove("hidden");
  
  // Start music
  playMusic();
  
  // Play first GIF
  celebrationGif.src = gifs[gifIndex];
  createConfetti();
  
  // Function to switch to next GIF
  function playNextGif() {
    gifIndex++;
    
    if (gifIndex < gifs.length) {
      celebrationGif.src = gifs[gifIndex];
      createConfetti();
      setTimeout(playNextGif, 2000);
    } else {
      // All GIFs done, show final message
      celebration.classList.add("hidden");
      
      // Stop the music
      const audioPlayer = document.getElementById("celebration-music");
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
      
      // Show final message
      const finalMessage = document.getElementById("finalMessage");
      finalMessage.classList.remove("hidden");
    }
  }
  
  // Start playing GIFs every 2 seconds
  setTimeout(playNextGif, 2000);
});

// Play music function - using local music file
function playMusic() {
  try {
    // Create hidden audio element with autoplay
    const audioPlayer = document.createElement("audio");
    audioPlayer.id = "celebration-music";
    audioPlayer.autoplay = true;
    audioPlayer.style.display = "none";
    
    // Use local music file
    const source = document.createElement("source");
    source.src = "PaperRings.mp3";
    source.type = "audio/mpeg";
    
    audioPlayer.appendChild(source);
    document.body.appendChild(audioPlayer);
    
    // Start music at 32 seconds
    audioPlayer.addEventListener('loadedmetadata', () => {
      audioPlayer.currentTime = 32;
    });
    
    // Try to play
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Audio playback error:", error);
      });
    }
  } catch (e) {
    console.log("Music playback unavailable");
  }
}
