"use strict";
module.exports = {
  calculate: (dice) => {
    let found = 0;
    let foundResult2 = 0;
    let foundResult3 = 0;
    let foundResultTotal = 0;
    let three = false;
    let two = false;
    for (let j = 6; j > 0; j--) {
      found = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i] == j) {
          found++;
          foundResult2 = Math.floor(parseInt(dice[i])*2);
          foundResult3 = Math.floor(parseInt(dice[i])*3);
        }
      }
      if (found > 1) {
        if (found == 2 && two == false) {
          foundResultTotal += foundResult2;
          two = true;
        }
        if (found == 3 && three == false) {
            foundResultTotal += foundResult3;
            three = true;
        }
        if (two == true && three == true) {
          return foundResultTotal;
        }
      }
    }
    return 0;
  }
};