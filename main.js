// === OVERLAYS ===
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

// === GAME STATE ===
let difficulty = 'easy';
let baseWords = ['let', 'var', 'const', 'if', 'for', 'else', 'case'];
let mediumWords = ['function', 'boolean', 'console', 'element', 'document'];
let hardWords = ['querySelector', 'addEventListener', 'localStorage', 'getElementById'];

let currentWord = '';
let score = 0;
let streak = 0;
let missedWords = [];
let timeLeft = 0;
let timer;
let gameActive = false;

// === DOM ELEMENTS ===
const titleScreen = document.getElementById('titleScreen');
const gameBox = document.getElementById('gameBox');
const startBtn = document.getElementById('startBtn');
const openDifficultyOverlayBtn = document.getElementById('openDifficultyOverlay');
const restartBtn = document.getElementById('restartBtn');
const userInput = document.getElementById('userInput');
const wordDisplay = document.getElementById('wordDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const streakDisplay = document.getElementById('streakDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const timeBar = document.getElementById('timeBar');
const missedWordsDisplay = document.getElementById('missedWordsDisplay');

// === LOCAL STORAGE: HIGH SCORE ===
function updateHighScore() {
  const saved = localStorage.getItem('codeRushHighScore');
  if (!saved || score > parseInt(saved)) {
    localStorage.setItem('codeRushHighScore', score);
  }
  highScoreDisplay.textContent = localStorage.getItem('codeRushHighScore') || 0;
}

// === GAME START / RESTART ===
startBtn.addEventListener('click', () => {
  titleScreen.style.display = 'none';
  gameBox.style.display = 'block';
  startGame();
});

restartBtn.addEventListener('click', () => {
  startGame();
});

function startGame() {
  score = 0;
  streak = 0;
  timeLeft = difficulty === 'easy' ? 30 : 20;
  missedWords = [];
  gameActive = true;

  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;
  missedWordsDisplay.innerHTML = '';
  userInput.value = '';
  userInput.disabled = false;
  userInput.focus();
  updateHighScore();
  nextWord();
  updateTimeBar();

  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimeBar();
    } else {
      endGame();
    }
  }, 1000);
}

// === WORD LOGIC ===
function getWord() {
  if (score < 5) return baseWords[Math.floor(Math.random() * baseWords.length)];
  if (score < 15) return mediumWords[Math.floor(Math.random() * mediumWords.length)];
  return hardWords[Math.floor(Math.random() * hardWords.length)];
}

function nextWord() {
  currentWord = getWord();
  wordDisplay.textContent = currentWord;
}

// === TIME BAR ===
function updateTimeBar() {
  timeDisplay.textContent = timeLeft;
  const maxTime = difficulty === 'easy' ? 30 : 20;
  const percent = Math.max(0, (timeLeft / maxTime) * 100);
  timeBar.style.width = percent + '%';
}

// === INPUT HANDLER ===
userInput.addEventListener('input', () => {
  if (!gameActive) return;
  if (userInput.value.trim() === currentWord) {
    score++;
    streak++;
    if (streak % 5 === 0) timeLeft += 2; // bonus time
    timeLeft += difficulty === 'easy' ? 3 : 2;
    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
    userInput.value = '';
    nextWord();
    updateTimeBar();
  }
});

// === GAME OVER ===
function endGame() {
  gameActive = false;
  clearInterval(timer);
  userInput.disabled = true;

  if (userInput.value.trim() !== currentWord && userInput.value.trim() !== '') {
    missedWords.push(currentWord);
  }

  wordDisplay.textContent = `Game Over! Final Score: ${score}`;
  updateHighScore();

  if (missedWords.length > 0) {
    missedWordsDisplay.innerHTML = `<strong>Missed Words:</strong> ${missedWords.join(', ')}`;
  }
}

// === DIFFICULTY OVERLAY ===
document.getElementById('openDifficultyOverlay').addEventListener('click', () => {
  document.getElementById('difficultyOverlay').style.display = 'flex';
});

function setDifficulty(level) {
  difficulty = level;
  closeOverlay('difficultyOverlay');
}
