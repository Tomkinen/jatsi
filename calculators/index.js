"use strict";
let singles = require("./singles.js");
let pair = require("./pair.js");
let twoPairs = require("./twopairs.js");
let straight = require("./straight.js");
let fullHouse = require("./fullhouse.js");
let chance = require("./chance.js");
let bonus = require("./bonus.js");
module.exports = {
  // Calculate all possible points player can get with current dice result.
  calculate: dice => {
    let results = {
      ones: singles.calculate(dice, 1),
      twos: singles.calculate(dice, 2),
      threes: singles.calculate(dice, 3),
      fours: singles.calculate(dice, 4),
      fives: singles.calculate(dice, 5),
      sixes: singles.calculate(dice, 6),
      onePair: pair.calculate(dice, 1, false),
      twoPairs: twoPairs.calculate(dice),
      threeOfAKind: pair.calculate(dice, 2, false),
      fourOfAKind: pair.calculate(dice, 3, false),
      smallStraight: straight.calculate(dice, false),
      largeStraight: straight.calculate(dice, true),
      fullHouse: fullHouse.calculate(dice),
      chance: chance.calculate(dice),
      yatzy: pair.calculate(dice, 4, true)
    };
    return results;
  },

  // Calculate if player is entitled to bonus.
  bonus: totalSum => {
    let results = bonus.calculate(totalSum);
    return results;
  }
};
