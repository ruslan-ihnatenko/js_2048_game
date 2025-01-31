const Game = require('../modules/Game.class.js');

const game = new Game();

// HTML Elements
const gameField = document.querySelector('.game-field');
const scoreElement = document.querySelector('.game-score');
const startButton = document.querySelector('.start');
const messageContainer = document.querySelector('.message-container');

/** Starts the game and initializes the board */
startButton.addEventListener('click', () => {
  game.restart();
  renderBoard();
  showMessage('Game started! Good luck!', 'start');
  toggleStartButton();
});

/** Listen for key events */
// eslint-disable-next-line no-shadow
document.addEventListener('keydown', (event) => {
  let moved = false;

  switch (event.key) {
    case 'ArrowLeft':
      moved = game.moveLeft();
      break;
    case 'ArrowRight':
      moved = game.moveRight();
      break;
    case 'ArrowUp':
      moved = game.moveUp();
      break;
    case 'ArrowDown':
      moved = game.moveDown();
      break;
  }

  if (moved) {
    renderBoard();

    if (game.checkWinCondition()) {
      showMessage('🎉 You win! Congrats!', 'win');
    } else if (game.checkGameOver()) {
      showMessage('💀 Game Over! Restart the game?', 'lose');
    }
  }
});

/** Renders the game board based on the current state */
function renderBoard() {
  const state = game.getState();
  const rows = gameField.querySelectorAll('.field-row');

  state.forEach((row, rowIndex) => {
    const cells = rows[rowIndex].querySelectorAll('.field-cell');

    row.forEach((cellValue, colIndex) => {
      const cell = cells[colIndex];

      cell.textContent = cellValue !== 0 ? cellValue : '';
      updateCellStyle(cell, cellValue);
    });
  });

  scoreElement.textContent = game.getScore();
}

/** Updates the cell style based on its value */
function updateCellStyle(cell, value) {
  cell.className = 'field-cell'; // Reset class

  if (value !== 0) {
    cell.classList.add(`field-cell--${value}`); // Apply dynamic class
  }
}

function toggleStartButton() {
  if (startButton.textContent === 'Start') {
    startButton.textContent = 'Restart';
    startButton.classList.add('restart');
    startButton.classList.remove('start');
  }
}

/** Shows the appropriate message based on game status */
function showMessage(text, type) {
  messageContainer
    .querySelectorAll('.message')
    .forEach((msg) => msg.classList.add('hidden'));

  const messageElement = messageContainer.querySelector(`.message-${type}`);

  messageElement.textContent = text;
  messageElement.classList.remove('hidden');
}
