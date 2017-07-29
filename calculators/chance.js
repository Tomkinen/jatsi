"use strict";
module.exports = {
  calculate: dice => {
    let points = 0;
    dice.forEach(result => {
      points += result;
    });
    return points;
  }
};
