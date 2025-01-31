class Game {
  /**
   * Creates a new game instance.
   * @param {number[][]} initialState The initial state of the board.
   * Default: 4x4 grid filled with zeros.
   */
  constructor(
    initialState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ) {
    this.score = 0;
    this.board = initialState;
    this.status = 'idle'; // 'idle', 'playing', 'win', 'lose'
  }

  /**
   * Starts the game with initial random tiles.
   */
  start() {
    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
  }

  /**
   * Resets the game to its initial state.
   */
  restart() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.status = 'idle';
    this.start();
  }

  /**
   * Returns the current score.
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * Returns the current state of the board.
   * @returns {number[][]}
   */
  getState() {
    return this.board;
  }

  /**
   * Returns the current game status.
   * @returns {string}
   */
  getStatus() {
    return this.status;
  }

  /**
   * Adds a random tile (2 or 4) to a random empty cell on the board.
   */
  addRandomTile() {
    const emptyCells = [];

    // Collect all empty cells
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push([row, col]);
        }
      }
    }

    if (emptyCells.length > 0) {
      const [row, col] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

      this.board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  /**
   * Slides and merges tiles to the left.
   */
  moveLeft() {
    let moved = false;

    for (let row = 0; row < this.board.length; row++) {
      const newRow = this.slideAndMerge(this.board[row]);

      if (newRow.toString() !== this.board[row].toString()) {
        moved = true;
        this.board[row] = newRow;
      }
    }

    if (moved) {
      this.addRandomTile();
    }

    return moved;
  }

  /**
   * Slides and merges tiles to the right.
   */
  moveRight() {
    let moved = false;

    for (let row = 0; row < this.board.length; row++) {
      const reversedRow = [...this.board[row]].reverse();
      const newRow = this.slideAndMerge(reversedRow).reverse();

      if (newRow.toString() !== this.board[row].toString()) {
        moved = true;
        this.board[row] = newRow;
      }
    }

    if (moved) {
      this.addRandomTile();
    }

    return moved;
  }

  /**
   * Slides and merges tiles upward.
   */
  moveUp() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
      const column = [
        this.board[0][col],
        this.board[1][col],
        this.board[2][col],
        this.board[3][col],
      ];
      const newColumn = this.slideAndMerge(column);

      for (let row = 0; row < 4; row++) {
        if (this.board[row][col] !== newColumn[row]) {
          moved = true;
          this.board[row][col] = newColumn[row];
        }
      }
    }

    if (moved) {
      this.addRandomTile();
    }

    return moved;
  }

  /**
   * Slides and merges tiles downward.
   */
  moveDown() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
      const column = [
        this.board[0][col],
        this.board[1][col],
        this.board[2][col],
        this.board[3][col],
      ].reverse();
      const newColumn = this.slideAndMerge(column).reverse();

      for (let row = 0; row < 4; row++) {
        if (this.board[row][col] !== newColumn[row]) {
          moved = true;
          this.board[row][col] = newColumn[row];
        }
      }
    }

    if (moved) {
      this.addRandomTile();
    }

    return moved;
  }

  /**
   * Slides and merges a row or column of tiles.
   * @param {number[]} tiles The row or column to slide and merge.
   * @returns {number[]} The new row or column after sliding and merging.
   */
  slideAndMerge(tiles) {
    // Filter out zeros and merge tiles
    const filtered = tiles.filter((tile) => tile !== 0);

    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        this.score += filtered[i];
        filtered[i + 1] = 0;
      }
    }

    // Remove zeros again and pad the row/column with zeros
    const merged = filtered.filter((tile) => tile !== 0);
    const padding = new Array(4 - merged.length).fill(0);

    return merged.concat(padding);
  }

  /**
   * Checks if the game is over (no valid moves).
   * @returns {boolean}
   */
  checkGameOver() {
    // Check if there are any empty cells
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === 0) {
          return false;
        }

        // Check if adjacent tiles can be merged
        if (col < 3 && this.board[row][col] === this.board[row][col + 1]) {
          return false;
        }

        if (row < 3 && this.board[row][col] === this.board[row + 1][col]) {
          return false;
        }
      }
    }
    this.status = 'lose';

    return true;
  }

  /**
   * Checks if the game is won (a tile with value 2048 exists).
   */
  checkWinCondition() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === 2048) {
          this.status = 'win';

          return true;
        }
      }
    }

    return false;
  }
}

module.exports = Game;
