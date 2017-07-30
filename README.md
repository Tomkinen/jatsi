## Jatsi

This is a Yatzy/Yahtzee game that runs on Node.js backend and Vue.js frontend.

You can test the game running in Heroku:
https://jatsi.herokuapp.com

## Why does this repository exist?

Developed this version of the classic game just for fun and self-learning. All the logic and data is in backend. Frontend is more or less just displaying the results and triggering events to backend.

## Installation

You must have Node.js installed. Should work with Node.js version 6.x.x or later. Developed and tested with version 6.11.0 LTS. Clone this repository. Install required modules (just express and body-parser). By default the UI can be accessed from port 8080. You can define port with process.env.PORT. I have tested UI to work fine with latest versions of Firefox, Chrome, Safari, Edge and Opera.

## API Reference

### POST /api/newgame

Parameters:

PLAYERNAME=string that contains name of the player.

### POST /api/newround

Parameters:

GAMEID=id of the game that should go to next round.

### POST /api/throwdice

Parameters:

GAMEID=id of the game that should get new dice throw.

ONE=true/false. If false, then first dice will be thrown. if true, then first dice will be kept.

TWO=true/false. If false, then second dice will be thrown. if true, then second dice will be kept.

THREE=true/false. If false, then third dice will be thrown. if true, then third dice will be kept.

FOUR=true/false. If false, then fourth dice will be thrown. if true, then fourth dice will be kept.

FIVE=true/false. If false, then fifth dice will be thrown. if true, then fifth dice will be kept.

AI=Y/N. If Y, then use backend ai-module to calculate which dice to keep and which combination to select for points. Return json will contain ai-data.

### POST /api/endround

Parameters:

GAMEID=id of the game where round should be ended.

SELECTEDRESULT=which combination to select for points (possible values: ones, twos, threes, fours, fives, sixes, onePair, twoPairs, threeOfAKind, fourOfAKind, smallStraight, largeStraight, fullHouse, chance, yatzy).

### POST /api/endgame

Parameters:

GAMEID=id of the game which should be ended. Highscore will be stored.

### GET /api/highscores

Get all highscores in descending points order.

### GET /api/uitext

Get all frontend UI texts.

## Application Structure

app.js - the main file that starts Jatsi.

#### ai/

- folder that contains all logic to run Jatsi in "AI-mode". Separate files for selecting which dice to keep (diceselector.js) and which combination to select in the end of round (combinationselector.js).

#### api/

-folder that contains all json APIs that are used.

#### calculators/

-folder that contains code for calculating points in all possible scenarios.

#### frontend/

-folder that contains all frontend files. Just three files, index.html, styles.css and frontend.js. All custom javascript is in frontend.js. Frontend gets Vue.js and Axios from cdnjs.cloudflare.com. Vue.js is javascript frontend framework. Axios is promise based http client for the browser. Furtive is small css micro-framework that handles most css styling in Jatsi UI.

#### game/

-folder that contains all game operations, like for example starting a new round or throwing dice.

#### highscore/

-folder contains highscore storing and displaying logic.

#### rolldice/

-folder contains code to get random number between 1-6.

## License

MIT license. This source code is completely free. Have fun!