"use strict";
let games = [];
let highScores = [];
const uiText=require('./uitext.js');
module.exports = (calculator,rollDice,game,highScore,app,ai) => {

  // Add a new game.
  app.post('/api/newgame', (req, res) => {
    console.log(Date()+' - POST: /api/newgame. request:',req.body);
    games = game.newGame(games, req.body.PLAYERNAME);
    res.status(200).json(games[games.length - 1]);
  });

  // Start a new round.
  app.post('/api/newround', (req, res) => {
    console.log(Date()+' - POST: /api/newround. request:',req.body);
    games = game.newRound(req.body.GAMEID, games);
    res.status(200).json(games[req.body.GAMEID - 1]);
  });

  // Throw dice.
  app.post('/api/throwdice', (req, res) => {
    console.log(Date()+' - POST: /api/throwdice. request:',req.body);
    games = game.throwDice(req.body, games, rollDice, ai, calculator);
    res.status(200).json(games[req.body.GAMEID - 1]);
  });

  // End round.
  app.post('/api/endround', (req, res) => {
    console.log(Date()+' - POST: /api/endround. request:',req.body);
    games = game.endRound(req.body.GAMEID, req.body.SELECTEDRESULT, games, calculator);
    res.status(200).json(games[req.body.GAMEID - 1]);
  });

  // End game.
  app.post('/api/endgame', (req, res) => {
    console.log(Date()+' - POST: /api/endgame. request:',req.body);
    games = game.endGame(req.body.GAMEID, games);
    highScores = highScore.setHighScore(highScores, games[req.body.GAMEID - 1].highScore);
    highScores = highScore.sortHighScores(highScores);
    res.status(200).json(games[req.body.GAMEID - 1]);
  });

  // Get high scores.
  app.get('/api/highscores', (req, res) => {
    console.log(Date()+' - GET: /api/highscores.');
    res.status(200).json(highScores);
  });

  // Get UI texts to frontend.
  app.get('/api/uitext', (req, res) => {
    console.log(Date()+' - GET: /api/uitext.');
    res.status(200).json(uiText);
  });
}