"use strict";

// Sort array.
const compare = (a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
};
module.exports = {
  // Sort high score by score descending.
  sortHighScores: highScores => {
    return highScores.sort(compare);
  },

  // Save high score. Push to array.
  setHighScore: (highScores, highScore) => {
    highScores.push(highScore);
    return highScores;
  }
};
