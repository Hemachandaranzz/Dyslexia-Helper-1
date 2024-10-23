// memoryMatching.js

/**
 * Memory Matching Game
 * Enhances memory and concentration skills through card matching.
 * Features:
 * - Shuffles and displays a grid of cards with pairs.
 * - Tracks number of attempts and matches.
 * - Includes a restart button.
 * - Provides sound effects and visual feedback for matches.
 */

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const memoryMatchingButton = document.getElementById("memoryMatchingGame");
  memoryMatchingButton.addEventListener("click", launchMemoryMatchingGame);
});

function launchMemoryMatchingGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
        <div id="memory-game">
            <h3>Memory Matching Game</h3>
            <div id="game-stats">
                <p>Attempts: <span id="attempts">0</span></p>
                <p>Matches: <span id="matches">0</span></p>
            </div>
            <div id="memory-grid"></div>
            <button id="restart-game">🔄 Restart Game</button>
        </div>
    `;
  initializeMemoryGame();
}

function initializeMemoryGame() {
  const cardPairs = [
    { id: 1, img: "assets/images/imageA.png" },
    { id: 2, img: "assets/images/imageB.png" },
    { id: 3, img: "assets/images/imageC.png" },
    { id: 4, img: "assets/images/imageD.png" },
    { id: 5, img: "assets/images/imageE.png" },
    { id: 6, img: "assets/images/imageF.png" },
    { id: 7, img: "assets/images/imageG.png" },
    { id: 8, img: "assets/images/imageH.png" },
  ];

  const cards = [...cardPairs, ...cardPairs]; // Duplicate for matching pairs
  const shuffledCards = shuffleArray(cards);
  let firstCard, secondCard;
  let moves = 0;
  let matches = 0;
  const gameGrid = document.getElementById("memory-grid");
  gameGrid.innerHTML = "";

  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    cardElement.innerHTML = `
            <div class="front-face">
                <img src="${card.img}" alt="Card Image" />
            </div>
            <div class="back-face"></div>
        `;

    cardElement.addEventListener("click", () => flipCard(cardElement));
    gameGrid.appendChild(cardElement);
  });

  function flipCard(card) {
    if (card === firstCard || card.classList.contains("flip")) return;
    card.classList.add("flip");
    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      moves++;
      document.getElementById("attempts").innerText = moves;
      checkMatch();
    }
  }

  function checkMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      matches++;
      document.getElementById("matches").innerText = matches;
      resetCards();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetCards();
      }, 1000);
    }
  }

  function resetCards() {
    firstCard = null;
    secondCard = null;
  }

  document
    .getElementById("restart-game")
    .addEventListener("click", initializeMemoryGame);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
