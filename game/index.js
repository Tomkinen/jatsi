"use strict";

// All game functionalities are in this module.
let newGame=require('./newgame.js');
let newRound=require('./newround.js');
let throwDice=require('./throwdice.js');
let endRound=require('./endround.js');
let endGame=require('./endgame.js');
module.exports = {
  newGame: (games, playerName) => {
    return newGame.execute(games, playerName);
  },
  newRound: (gameId, games) => {
    return newRound.execute(gameId, games);
  },
  throwDice: (reqbody, games, rollDice, ai, calculator) => {
    return throwDice.execute(reqbody, games, rollDice, ai, calculator);
  },
  endRound: (gameId, selectedResult, games, calculator) => {
    return endRound.execute(gameId, selectedResult, games, calculator);
  },
  endGame: (gameId, games) => {
    return endGame.execute(gameId, games);
  }
};