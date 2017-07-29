"use strict";
module.exports = {
  execute: (reqbody, games, rollDice, ai, calculator) => {
    let gameId = reqbody.GAMEID;
    let first = reqbody.ONE;
    let second = reqbody.TWO;
    let third = reqbody.THREE;
    let fourth = reqbody.FOUR;
    let fifth = reqbody.FIVE;
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);
    games[index].throw++;

    // Throw all if first round. Otherwise select which to throw.
    // Do not throw if throw number or round number is off the scale of yatzy rules.
    if (games[index].throw < 4 && games[index].round < 16) {
      if (games[index].throw == 1 || first == false) {
        games[index].dice[0] = rollDice.throwDice();
      }
      if (games[index].throw == 1 || second == false) {
        games[index].dice[1] = rollDice.throwDice();
      }
      if (games[index].throw == 1 || third == false) {
        games[index].dice[2] = rollDice.throwDice();
      }
      if (games[index].throw == 1 || fourth == false) {
        games[index].dice[3] = rollDice.throwDice();
      }
      if (games[index].throw == 1 || fifth == false) {
        games[index].dice[4] = rollDice.throwDice();
      }
    } else {
      games[index].throw = 3;
    }

    // What AI would do in this situation? Let's find out.
    if (reqbody.AI == "Y") {
      games[index].ai = {
        dice: ai.diceSelector(gameId, games, calculator),
        combination: ai.combinationSelector(gameId, games, calculator)
      };
    }
    return games;
  }
};
