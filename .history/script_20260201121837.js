const noBtn = document.getElementById("noBtn");
const teaseText = document.getElementById("tease-text");
const yesBtn = document.getElementById("yesBtn");

const messages = [
  "Nice try 😏",
  "Hey! That was rude 😤",
  "Why are you running after No? 🤨",
  "Just click Yes already 💕",
  "Okay now you’re just playing 🙄",
  "YES is literally right there 😭"
];

let messageIndex = 0;

noBtn.addEventListener("mouseenter", () => {
  const container = document.querySelector(".buttons");

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  teaseText.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: linear-gradient(135deg, #ff758c, #ff7eb3);
      color: white;
      font-family: 'Pacifico', cursive;
      text-align: center;
    ">
      <h1>YAYYY 💖💖💖</h1>
      <p style="font-family: Poppins; font-size: 1.2rem;">
        Best decision you’ve made today 😌<br>
        I can’t wait to spend Valentine’s with you 💕
      </p>
      <img 
        src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
        style="width: 250px; margin-top: 20px; border-radius: 15px;"
      />
    </div>
  `;
});
