"use strict";
module.exports = {
  calculate: (dice, number) => {
    let points = 0;
    dice.forEach(result => {
      if (result == number) {
        points += result;
      }
    });
    return points;
  }
};
