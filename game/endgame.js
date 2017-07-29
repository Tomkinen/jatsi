"use strict";
module.exports = {
  execute: (gameId, games) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "." + mm + "." + yyyy;
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);

    // End game. Make it impossible to throw another dice in this game. Set high score.
    games[index].round = 16;
    games[index].throw = 4;
    let highScore = {
      name: games[index].playerName,
      score: games[index].total,
      date: today
    };
    games[index].highScore = highScore;
    return games;
  }
};
