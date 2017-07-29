"use strict";
module.exports = {
  calculate: (amount) => {
    let bonus = 0;
    if (amount >= 63) {
      bonus = 50;
    }
    return bonus;
  }
};