// Use strict mode everywhere.
"use strict";

// Add required modules. Set up port for UI.
// Only required npm modules are: express and body-parser.
const port = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const calculator = require("./calculators/");
const rollDice = require("./rolldice/");
const game = require("./game/");
const highScore = require("./highscore/");
const ai = require("./ai/");
const app = express();
const server = require("http").Server(app);

// Parse post message body with body parser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// All backend APIs are here.
require("./api/")(calculator, rollDice, game, highScore, app, ai);

// Set up frontend -folder to be public.
app.use("/", express.static(path.join(__dirname, "frontend")));

// All other calls to open up index.html.
app.all("/*", (req, res, next) => {
  console.log(Date() + " - " + req.method + ": " + req.url + ".");
  res.sendFile("frontend/index.html", { root: path.join(__dirname) });
});

// Server is listening.
server.listen(port);
console.log(Date() + " - Server is listening. Port: " + port);
