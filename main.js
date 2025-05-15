// Overlay toggle
const overlayButtons = document.querySelectorAll('.overlay-btn');
overlayButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-overlay');
    openOverlay(target);
  });
});

function openOverlay(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeOverlay(id) {
  document.getElementById(id).style.display = 'none';
}

// Game state variables
let difficulty = 'easy'; // can be 'easy' or 'hard'

// Start Game
document.getElementById('startBtn').addEventListener('click', () => {
  alert('Game will start (build out gameplay here)...');
  // You can later replace this alert with `initGame()` or another function
});

// Difficulty toggle
document.getElementById('difficultyBtn').addEventListener('click', () => {
  if (difficulty === 'easy') {
    difficulty = 'hard';
    alert('Difficulty set to HARD');
  } else {
    difficulty = 'easy';
    alert('Difficulty set to EASY');
  }
});
