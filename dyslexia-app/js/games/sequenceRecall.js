// sequenceRecall.js

/**
 * Sequence Recall Game
 * Enhances memory by challenging users to recall a sequence of numbers or symbols.
 * Features:
 * - Displays a sequence to the user which they must recall.
 * - Tracks number of attempts and correct recalls.
 * - Provides visual feedback for correct and incorrect entries.
 */

document.addEventListener("DOMContentLoaded", () => {
  const sequenceRecallButton = document.getElementById("sequenceRecallGame");
  sequenceRecallButton.addEventListener("click", launchSequenceRecallGame);
});

function launchSequenceRecallGame() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
        <div id="sequence-recall-game">
            <h3>Sequence Recall Game</h3>
            <div id="sequence-display"></div>
            <input type="text" id="input-sequence" placeholder="Enter sequence" />
            <button id="submit-sequence">Submit</button>
            <div id="sequence-stats">
                <p>Attempts: <span id="attempts">0</span></p>
                <p>Correct: <span id="correct">0</span></p>
            </div>
        </div>
    `;
  initializeSequenceRecallGame();
}

function initializeSequenceRecallGame() {
  const sequence = generateSequence(5);
  const sequenceDisplay = document.getElementById("sequence-display");
  const inputSequence = document.getElementById("input-sequence");
  const submitSequence = document.getElementById("submit-sequence");
  let attempts = 0;
  let correct = 0;

  sequenceDisplay.textContent = sequence.join(" ");

  submitSequence.addEventListener("click", () => {
    attempts++;
    document.getElementById("attempts").textContent = attempts;
    const userSequence = inputSequence.value.split(" ");
    if (compareSequences(userSequence, sequence)) {
      correct++;
      document.getElementById("correct").textContent = correct;
    } else {
      alert("Incorrect! Try again.");
    }
    inputSequence.value = "";
  });
}

function generateSequence(length) {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(Math.floor(Math.random() * 10));
  }
  return sequence;
}

function compareSequences(userSequence, originalSequence) {
  if (userSequence.length !== originalSequence.length) return false;
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== originalSequence[i].toString()) return false;
  }
  return true;
}
