const game = require('./src/module/game');
const turnList = process.env.TURN_LIST;
const startingPlayer = process.env.STARTING_PLAYER;

console.log(game.begin(startingPlayer, turnList));