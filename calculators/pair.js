"use strict";
module.exports = {
  calculate: (dice, limit, yatzy) => {
    let foundResult = 0;
    let found = 0;
    for (let j = 6; j > 0; j--) {
      found = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i] == j) {
          found++;
          foundResult = Math.floor(parseInt(dice[i]) * (limit + 1));
        }
      }
      if (found > limit) {
        if (yatzy == true) {
          return 50;
        } else {
          return foundResult;
        }
      }
    }
    return 0;
  }
};
