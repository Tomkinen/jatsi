"use strict";

// All Artificial Intelligence functionalities are in this module.
let diceSelector=require('./diceselector.js');
let combinationSelector=require('./combinationselector.js');

module.exports = {

	// AI to select which dice to keep and which should be thrown again.
	diceSelector: (gameId,games,calculator) => {
		return diceSelector.execute(gameId,games,calculator);
	},

	// AI to select a combination to receive scores at the end of round.
	combinationSelector: (gameId,games,calculator) => {
    return combinationSelector.execute(gameId,games,calculator);
	}
};