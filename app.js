require('dotenv').config();
const game = require('./src/module/game');
const turnList = eval(process.env.TURN_LIST);
const startingPlayer = process.env.STARTING_PLAYER;

console.log(game.playTurn(startingPlayer, turnList));