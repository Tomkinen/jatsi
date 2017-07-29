"use strict";
module.exports = {
  execute: (gameId, games) => {
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);

    // Start a new round. Check that round is in limits of Yatzy rules. Set throw number and add to round number.
    if (games[index].round < 15) {
      games[index].round = Number(games[index].round) + 1;
      games[index].throw = 0;

      // Clear dice results from previous round.
      for (let i = 0; i < 5; i++) {
        games[index].dice[i] = 0;
      }
    }
    return games;
  }
};
