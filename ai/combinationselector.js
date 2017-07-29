module.exports = {
  execute: (gameId, games, calculator) => {
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);
    let calculatedTable = calculator.calculate(games[index].dice);

    // Select the big price combinations if those score points.
    const keepAll = ["yatzy", "largeStraight", "smallStraight", "fullHouse"];
    for (let keep of keepAll) {
      if (
        calculatedTable[keep] > 0 &&
        games[index].gameTable[keep + "Done"] == false
      ) {
        return keep;
      }
    }

    // Select singles if those have 3 or more dices.
    const keepSame = [
      { name: "sixes", value: 18, diceValue: 6 },
      { name: "fives", value: 15, diceValue: 5 },
      { name: "fours", value: 12, diceValue: 4 },
      { name: "threes", value: 9, diceValue: 3 },
      { name: "twos", value: 6, diceValue: 2 },
      { name: "ones", value: 3, diceValue: 1 }
    ];
    for (let keep of keepSame) {
      if (
        calculatedTable[keep.name] >= keep.value &&
        games[index].gameTable[keep.name + "Done"] == false
      ) {
        return keep.name;
      }
    }

    // Select if combination scores any points.
    const keepAny = [
      "fourOfAKind",
      "twoPairs",
      "threeOfAKind",
      "onePair",
      "chance"
    ];
    for (let keep of keepAny) {
      if (
        calculatedTable[keep] > 0 &&
        games[index].gameTable[keep + "Done"] == false
      ) {
        return keep;
      }
    }

    // Select even though combination scores points or not.
    const keepFinal = [
      "smallStraight",
      "largeStraight",
      "fullHouse",
      "fourOfAKind",
      "twoPairs",
      "threeOfAKind",
      "onePair",
      "yatzy",
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes"
    ];
    for (let keep of keepFinal) {
      if (games[index].gameTable[keep + "Done"] == false) {
        return keep;
      }
    }
  }
};
