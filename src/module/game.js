/**
 * Begins the game with the starting player as parameter, if not 
 * player selected starts with X
 * @param {String} player Starting player
 */
const start = (player = 'X') => {
    return `Game Board Creation... ||/n-+-+- || -+-+- ||/nBoard Created./nThe game will start with player ${player}`;
};

module.exports = { start };