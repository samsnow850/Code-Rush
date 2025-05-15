// --- OVERLAYS ---
const overlayButtons = document.querySelectorAll('.overlay-btn');
overlayButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-overlay');
    document.getElementById(target).style.display = 'flex';
  });
});
function closeOverlay(id) {
  document.getElementById(id).style.display = 'none';
}

// --- GAME VARIABLES ---
let difficulty = 'easy';
let words = ['function', 'const', 'return', 'array', 'object', 'string', 'number', 'loop', 'query', 'index', 'slice', 'map', 'reduce'];
let score = 0;
let timeLeft = 0;
let currentWord = '';
let timer;
let gameActive = false;

// --- ELEMENTS ---
const titleScreen = document.getElementById('titleScreen');
const gameBox = document.getElementById('gameBox');
const startBtn = document.getElementById('startBtn');
const difficultyBtn = document.getElementById('difficultyBtn');
const restartBtn = document.getElementById('restartBtn');
const wordDisplay = document.getElementById('wordDisplay');
const userInput = document.getElementById('userInput');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');

// --- START GAME ---
startBtn.addEventListener('click', () => {
  titleScreen.style.display = 'none';
  gameBox.style.display = 'block';
  startGame();
});

function startGame() {
  gameActive = true;
  score = 0;
  timeLeft = difficulty === 'easy' ? 30 : 20;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  userInput.value = '';
  userInput.disabled = false;
  userInput.focus();
  nextWord();

  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
    } else {
      endGame();
    }
  }, 1000);
}

// --- NEW WORD ---
function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord;
}

// --- INPUT LISTENER ---
userInput.addEventListener('input', () => {
  if (!gameActive) return;
  if (userInput.value.trim() === currentWord) {
    score++;
    scoreDisplay.textContent = score;
    timeLeft += difficulty === 'easy' ? 3 : 2;
    userInput.value = '';
    nextWord();
  }
});

// --- END GAME ---
function endGame() {
  gameActive = false;
  clearInterval(timer);
  wordDisplay.textContent = `Game Over! Final Score: ${score}`;
  userInput.disabled = true;
}

// --- RESTART ---
restartBtn.addEventListener('click', () => {
  startGame();
});

// --- TOGGLE DIFFICULTY ---
difficultyBtn.addEventListener('click', () => {
  difficulty = difficulty === 'easy' ? 'hard' : 'easy';
  alert(`Difficulty set to ${difficulty.toUpperCase()}`);
});
