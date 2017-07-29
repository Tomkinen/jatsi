"use strict";
module.exports = {
  calculate: dice => {
    let found = 0;
    let foundResult2 = 0;
    let foundResult4 = 0;
    let foundRounds = 0;
    let foundResultTotal = 0;
    for (let j = 6; j > 0; j--) {
      found = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i] == j) {
          found++;
          foundResult2 = Math.floor(parseInt(dice[i]) * 2);
          foundResult4 = Math.floor(parseInt(dice[i]) * 4);
        }
      }
      if (found > 1) {
        if (found >= 2 && found < 4) {
          foundResultTotal += foundResult2;
        }
        if (found >= 4) {
          if (foundRounds == 1) {
            foundResultTotal += foundResult2;
          } else {
            foundResultTotal = foundResult4;
          }
          foundRounds++;
        }
        foundRounds++;
        if (foundRounds >= 2) {
          return foundResultTotal;
        }
      }
    }
    return 0;
  }
};
