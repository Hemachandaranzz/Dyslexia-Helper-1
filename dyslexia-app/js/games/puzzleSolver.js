// puzzleSolver.js

/**
 * Puzzle Solver Game
 * Enhances problem-solving skills with a sliding puzzle game.
 * Features:
 * - Generates a sliding puzzle from an image.
 * - Tracks the number of moves and time taken.
 * - Provides a shuffle and restart button.
 */

document.addEventListener("DOMContentLoaded", () => {
  const puzzleSolverButton = document.getElementById("puzzleSolverGame");
  puzzleSolverButton.addEventListener("click", launchPuzzleSolverGame);
});

function launchPuzzleSolverGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
        <div id="puzzle-game">
            <h3>Puzzle Solver Game</h3>
            <canvas id="puzzle-canvas" width="400" height="400"></canvas>
            <div id="puzzle-controls">
                <button id="shuffle-puzzle">🔀 Shuffle</button>
                <button id="restart-puzzle">🔄 Restart</button>
            </div>
            <div id="puzzle-stats">
                <p>Moves: <span id="puzzle-moves">0</span></p>
                <p>Time: <span id="puzzle-time">0</span> seconds</p>
            </div>
        </div>
    `;
  initializePuzzleSolver();
}

function initializePuzzleSolver() {
  const canvas = document.getElementById("puzzle-canvas");
  const ctx = canvas.getContext("2d");
  const TILE_SIZE = 100;
  const GRID_SIZE = 4;
  const movesSpan = document.getElementById("puzzle-moves");
  const timeSpan = document.getElementById("puzzle-time");
  let tiles = [];
  let emptyTile = { x: 3, y: 3 };
  let moves = 0;
  let startTime = null;
  let timerInterval = null;
  const image = new Image();
  image.src = "assets/images/puzzle-image.jpg";

  image.onload = () => {
    createTiles();
    drawTiles();
    startTimer();
  };

  function createTiles() {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (x === 3 && y === 3) continue; // Skip last tile for the empty space
        tiles.push({ x, y });
      }
    }
  }

  function drawTiles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tiles.forEach((tile, i) => {
      const tileX = tile.x * TILE_SIZE;
      const tileY = tile.y * TILE_SIZE;
      ctx.drawImage(
        image,
        tileX,
        tileY,
        TILE_SIZE,
        TILE_SIZE,
        tileX,
        tileY,
        TILE_SIZE,
        TILE_SIZE
      );
    });
  }

  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timeSpan.textContent = elapsed;
    }, 1000);
  }

  document.getElementById("shuffle-puzzle").addEventListener("click", () => {
    shuffleTiles();
    drawTiles();
  });

  document.getElementById("restart-puzzle").addEventListener("click", () => {
    clearInterval(timerInterval);
    moves = 0;
    movesSpan.textContent = moves;
    timeSpan.textContent = "0";
    startTimer();
    createTiles();
    drawTiles();
  });
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}
