"use strict";

// Check if every item in array is unique.
const checkIfArrayIsUnique = myArray => {
  return myArray.length === new Set(myArray).size;
};

// Check if array (=a) contains string (=obj).
const contains = (a, obj) => {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
};
module.exports = {
  calculate: (dice, large) => {
    if (checkIfArrayIsUnique(dice) == true) {
      if (
        large == false &&
        contains(dice, 1) == true &&
        contains(dice, 6) == false
      ) {
        return 15;
      } else if (
        large == true &&
        contains(dice, 1) == false &&
        contains(dice, 6) == true
      ) {
        return 20;
      }
    }
    return 0;
  }
};
