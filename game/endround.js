"use strict";
module.exports = {
  execute: (gameId, selectedResult, games, calculator) => {
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);

    // Depending on what user selected. Add result to game table.
    let calculatedTable = calculator.calculate(games[index].dice);
    const checkList = [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
      "onePair",
      "twoPairs",
      "threeOfAKind",
      "fourOfAKind",
      "smallStraight",
      "largeStraight",
      "fullHouse",
      "chance",
      "yatzy"
    ];
    checkList.forEach(check => {
      if (
        selectedResult == check &&
        games[index].gameTable[check + "Done"] == false
      ) {
        games[index].gameTable[check] = calculatedTable[check];
        games[index].gameTable[check + "Done"] = true;
      }
    });

    // Calculate bonus and total points.
    let calculateSingles =
      games[index].gameTable.ones +
      games[index].gameTable.twos +
      games[index].gameTable.threes +
      games[index].gameTable.fours +
      games[index].gameTable.fives +
      games[index].gameTable.sixes;
    games[index].gameTable.bonus = calculator.bonus(calculateSingles);
    games[index].total =
      calculateSingles +
      games[index].gameTable.bonus +
      games[index].gameTable.onePair +
      games[index].gameTable.twoPairs +
      games[index].gameTable.threeOfAKind +
      games[index].gameTable.fourOfAKind +
      games[index].gameTable.smallStraight +
      games[index].gameTable.largeStraight +
      games[index].gameTable.fullHouse +
      games[index].gameTable.chance +
      games[index].gameTable.yatzy;
    return games;
  }
};
