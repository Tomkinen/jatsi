// Source code for this Jatsi game is available in github.com/tomkinen/jatsi.

// Run all this when page has loaded
window.onload = function() {
  // Get texts for UI from backend. Use Axios for all backend GETs and POSTs. https://github.com/mzabriskie/axios
  // Use Furtive for all css styles. http://furtive.co, https://github.com/johnotander/furtive
  axios.get("api/uitext").then(response => {
    // Use Vue.js. The Progressive JavaScript Framework. https://vuejs.org, https://github.com/vuejs/vue
    new Vue({
      el: "#vue",
      data: {
        ui: response.data.ui,
        dice1: "-",
        dice2: "-",
        dice3: "-",
        dice4: "-",
        dice5: "-",
        dice1Selected: false,
        dice2Selected: false,
        dice3Selected: false,
        dice4Selected: false,
        dice5Selected: false,
        highScoresTable: "empty",
        highScoresVisible: false,
        numberOfPlayers: 0,
        activePlayer: 0,
        activeGameId: 0,
        activePlayerName: "",
        activeRoundNumber: 0,
        activeThrowNumber: 0,
        activeAiPlayer: "N",
        gameId: [0, 0, 0, 0],
        aiPlayer: ["N", "N", "N", "N"],
        aiMessage: "",
        roundNumber: [0, 0, 0, 0],
        throwNumber: [0, 0, 0, 0],
        endGameSituation: false,
        player1NameInput: "",
        player2NameInput: "",
        player3NameInput: "",
        player4NameInput: "",
        player1TypeInput: "N",
        player2TypeInput: "N",
        player3TypeInput: "N",
        player4TypeInput: "N",
        gameStarted: false,
        playerNames: ["", "", "", ""],
        gameTable: [{}, {}, {}, {}],
        onesValue: ["", "", "", ""],
        twosValue: ["", "", "", ""],
        threesValue: ["", "", "", ""],
        foursValue: ["", "", "", ""],
        fivesValue: ["", "", "", ""],
        sixesValue: ["", "", "", ""],
        bonusValue: ["", "", "", ""],
        onePairValue: ["", "", "", ""],
        twoPairsValue: ["", "", "", ""],
        threeOfAKindValue: ["", "", "", ""],
        fourOfAKindValue: ["", "", "", ""],
        smallStraightValue: ["", "", "", ""],
        largeStraightValue: ["", "", "", ""],
        fullHouseValue: ["", "", "", ""],
        chanceValue: ["", "", "", ""],
        yatzyValue: ["", "", "", ""],
        totalValue: ["", "", "", ""],
        disableClick: { "pointer-events": "" }
      },
      methods: {
        // When player clicks 'New Game' -button. Send post with player name to api/newgame and initialize values.
        clickNewGame: function(playerCount, numberOfPlayers) {
          if (playerCount <= numberOfPlayers) {
            this.playerNames = [this.player1NameInput, "", "", ""];
            if (numberOfPlayers > 2) {
              this.playerNames[3] = this.player4NameInput;
            }
            if (numberOfPlayers > 1) {
              this.playerNames[2] = this.player3NameInput;
            }
            if (numberOfPlayers > 0) {
              this.playerNames[1] = this.player2NameInput;
            }
            this.aiPlayer = [this.player1TypeInput, "", "", ""];
            if (numberOfPlayers > 2) {
              this.aiPlayer[3] = this.player4TypeInput;
            }
            if (numberOfPlayers > 1) {
              this.aiPlayer[2] = this.player3TypeInput;
            }
            if (numberOfPlayers > 0) {
              this.aiPlayer[1] = this.player2TypeInput;
            }
            this.onesValue = ["", "", "", ""];
            this.twosValue = ["", "", "", ""];
            this.threesValue = ["", "", "", ""];
            this.foursValue = ["", "", "", ""];
            this.fivesValue = ["", "", "", ""];
            this.sixesValue = ["", "", "", ""];
            this.bonusValue = ["", "", "", ""];
            this.onePairValue = ["", "", "", ""];
            this.twoPairsValue = ["", "", "", ""];
            this.threeOfAKindValue = ["", "", "", ""];
            this.fourOfAKindValue = ["", "", "", ""];
            this.smallStraightValue = ["", "", "", ""];
            this.largeStraightValue = ["", "", "", ""];
            this.fullHouseValue = ["", "", "", ""];
            this.chanceValue = ["", "", "", ""];
            this.yatzyValue = ["", "", "", ""];
            this.totalValue = ["", "", "", ""];
            axios
              .post("api/newgame", {
                PLAYERNAME: this.playerNames[playerCount]
              })
              .then(response => {
                this.gameId[playerCount] = response.data.gameId;
                this.endGameSituation = false;
                this.totalValue[playerCount] = "";
                if (playerCount == numberOfPlayers) {
                  this.newRound(this.gameId[0], this.activePlayer);
                  this.gameStarted = true;
                }
                playerCount++;
                this.clickNewGame(playerCount, numberOfPlayers);
              });
          }
        },

        // When new round is started (either by 'New Game'-button or by ending round by selecting combination
        // from game table), empty dice values and set throw number to 1. Post to api/newround with gameid.
        newRound: function(gameId, activePlayer) {
          if (this.aiPlayer[activePlayer] == "Y") {
            this.aiMessage = this.ui.ai_message_1;
            this.disableClick = { "pointer-events": "none" };
          } else {
            this.disableClick = { "pointer-events": "" };
          }
          axios.post("api/newround", { GAMEID: gameId }).then(response => {
            this.activeGameId = gameId;
            this.dice1 = "-";
            this.dice2 = "-";
            this.dice3 = "-";
            this.dice4 = "-";
            this.dice5 = "-";
            this.dice1Selected = false;
            this.dice2Selected = false;
            this.dice3Selected = false;
            this.dice4Selected = false;
            this.dice5Selected = false;
            this.roundNumber[activePlayer] = response.data.round;
            this.throwNumber[activePlayer] = 1;
            this.activeRoundNumber = this.roundNumber[activePlayer];
            this.activeThrowNumber = this.throwNumber[activePlayer];
            this.activePlayerName = this.playerNames[activePlayer];
            this.activeAiPlayer = this.aiPlayer[activePlayer];
            if (this.activeAiPlayer == "Y") {
              setTimeout(() => {
                this.clickThrowDice(this.gameId, activePlayer);
              }, 2000);
            }
          });
        },

        // When player clicks 'Throw Dice' -button. Send post with gameid to api/throwdice.
        // Set dice values according to what backend responded.
        clickThrowDice: function(gameId, activePlayer) {
          axios
            .post("api/throwdice", {
              GAMEID: gameId[activePlayer],
              ONE: this.dice1Selected,
              TWO: this.dice2Selected,
              THREE: this.dice3Selected,
              FOUR: this.dice4Selected,
              FIVE: this.dice5Selected,
              AI: this.activeAiPlayer
            })
            .then(response => {
              this.dice1 = response.data.dice[0];
              this.dice2 = response.data.dice[1];
              this.dice3 = response.data.dice[2];
              this.dice4 = response.data.dice[3];
              this.dice5 = response.data.dice[4];
              this.gameTable[activePlayer] = response.data.gameTable;
              this.throwNumber[activePlayer] = response.data.throw;
              this.activeThrowNumber = this.throwNumber[activePlayer];
              if (this.activeAiPlayer == "Y") {
                this.aiMessage = this.ui.ai_message_2;
                setTimeout(() => {
                  this.dice1Selected = response.data.ai.dice[0];
                  this.dice2Selected = response.data.ai.dice[1];
                  this.dice3Selected = response.data.ai.dice[2];
                  this.dice4Selected = response.data.ai.dice[3];
                  this.dice5Selected = response.data.ai.dice[4];
                  if (this.activeThrowNumber < 3) {
                    this.aiMessage = this.ui.ai_message_3;
                    setTimeout(() => {
                      this.clickThrowDice(gameId, activePlayer);
                    }, 2000);
                  } else {
                    this.aiMessage =
                      this.ui.ai_message_4 +
                      ' "' +
                      response.data.ai.combination +
                      '"';
                    setTimeout(() => {
                      this.clickEndRound(
                        gameId[activePlayer],
                        response.data.ai.combination
                      );
                    }, 2000);
                  }
                }, 2000);
              }
            });
        },

        // When player clicks a combination to end round, send post to api/endround with gameid and selected result.
        // This will define how many points player will get. Points calculated in backend.
        clickEndRound: function(gameId, selectedResult) {
          if (
            this.dice1 != "-" &&
            this.gameTable[this.activePlayer][selectedResult + "Done"] == false
          ) {
            this.dice1 = "-";
            axios
              .post("api/endround", {
                GAMEID: gameId,
                SELECTEDRESULT: selectedResult
              })
              .then(response => {
                this[selectedResult + "Value"][this.activePlayer] =
                  response.data.gameTable[selectedResult];
                this.bonusValue[this.activePlayer] =
                  response.data.gameTable.bonus;
                this.totalValue[this.activePlayer] = response.data.total;
                if (this.activePlayer < this.numberOfPlayers) {
                  if (this.roundNumber[this.activePlayer] == 15) {
                    this.endGame(
                      this.gameId[this.activePlayer],
                      this.activePlayer
                    );
                  }
                  this.activePlayer++;
                  this.newRound(
                    this.gameId[this.activePlayer],
                    this.activePlayer
                  );
                } else {
                  if (this.roundNumber[this.activePlayer] == 15) {
                    this.endGame(
                      this.gameId[this.activePlayer],
                      this.activePlayer
                    );
                  } else {
                    this.activePlayer = 0;
                    this.newRound(
                      this.gameId[this.activePlayer],
                      this.activePlayer
                    );
                  }
                }
              });
          }
        },

        // When clickEndRound is run and if the round number is 15, then this method is run.
        // End game. Send post with gameid. High score will be saved in backend.
        endGame: function(gameId, activePlayer) {
          axios.post("api/endGame", { GAMEID: gameId }).then(response => {
            if (activePlayer == this.numberOfPlayers) {
              this.endGameSituation = true;
              this.activePlayer = 0;
              this.activeAiPlayer = "N";
            }
          });
        },

        // When player clicks 'High Scores' -button. Send get to api/highscores to get fresh data from backend.
        // Player will see high score list and have capability to click back by clicking 'Back to Game' -button.
        clickHighScores: function() {
          axios.get("api/highscores").then(response => {
            this.highScoresTable = response.data;
            if (this.highScoresVisible == true) {
              this.highScoresVisible = false;
            } else {
              this.highScoresVisible = true;
            }
          });
        },

        // When player selects that player is either human or AI. Set name of the player if type is AI.
        aiTrigger: function(player) {
          if (this["player" + player + "TypeInput"] == "Y") {
            this["player" + player + "NameInput"] = this.ui.ai_real_name;
          } else {
            this["player" + player + "NameInput"] = "";
          }
        }
      }
    });
  });
};
