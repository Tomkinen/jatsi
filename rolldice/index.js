"use strict";
module.exports = {
  throwDice: () => {
    // Random number between 1 to 6.
    let rand = 1 + Math.floor(Math.random() * 6);
    return rand;
  }
};
