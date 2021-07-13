const CONSTANT_VALUES = {
    BOARD_SIZE: 5,
    COLUMNS: 3,
    EMPTY_CELL: ' ',
    HORIZONTAL_DIVISION: '-',
    VERTICAL_DIVISION: '|',
    INTERSECTION: '+',
    BEGIN_HEADER_MESSAGE: 'Game Board Creation...',
    BEGIN_FOOTER_MESSAGE: 'Board Created.\nThe game will start with player',
    TURN_PLAYER_HEADER_MESSAGE: 'Player',
    TURN_PLAYER_FOOTER_MESSAGE: '',
    TURNS_INTERVAL: 2000,
    ROW_EQ: { 1: 0, 2: 2, 3: 4 },
}

// Global
let currentTurn;


/**
 * Draws the board with the current distribution until last turn
 * using the turns provided switching between each player on every
 * player placing turn
 * @param {String} playerInTurn The player
 * @param {Array} turnList Array with the turns in ASC way
 * @returns String representing the board
 */
const drawBoard = (playerInTurn, turnList = [[0, 0]]) => {
    let boardLayout = Array(CONSTANT_VALUES.BOARD_SIZE).fill(CONSTANT_VALUES.HORIZONTAL_DIVISION)
        .map((dash, row) => {
            let insideValue = (row + 1) % 2 != 0 ? CONSTANT_VALUES.EMPTY_CELL : dash;

            const rowList = {};
            Array(CONSTANT_VALUES.COLUMNS).fill(insideValue)
                .forEach((value, i) => {
                    Object.assign(rowList, {
                        [`cell_${i + 1}`]: value
                    })
                });
            return rowList;
        });

    turnList.forEach(({ 0: placeRow, 1: placeColumn }) => {
        if (placeRow != 0 && placeColumn != 0)
            boardLayout[CONSTANT_VALUES.ROW_EQ[placeRow]][`cell_${placeColumn}`] = playerInTurn;
    });

    const outputBoard = boardLayout.map((v, row) => {
        return Object.values(v).join([1, 3].includes(row) ? CONSTANT_VALUES.INTERSECTION : CONSTANT_VALUES.VERTICAL_DIVISION)
    }).join('\n');

    return outputBoard;
}

/**
 * Generate the formatted message for the Header using the 
 * provided turn and player
 * @param {Number} turn Number of the turn, 
 * @param {String} player The current player for the turn
 * @returns The formatted string
 */
const headerMessage = (turn, player) => {
    if (turn == 0)
        return CONSTANT_VALUES.BEGIN_HEADER_MESSAGE;

    let output = `${CONSTANT_VALUES.TURN_PLAYER_HEADER_MESSAGE} ${player} (turn ${turn}):`;
    return output;
}

/**
 * Generate the formatted message for the Header using the 
 * provided turn and player
 * @param {Number} turn Number of the turn, 
 * @param {String} player The current player for the turn
 * @returns The formatted string
 */
const footerMessage = (turn, player) => {
    if (turn == 0)
        return `${CONSTANT_VALUES.BEGIN_FOOTER_MESSAGE} ${player}`;

    let output = `${CONSTANT_VALUES.TURN_PLAYER_FOOTER_MESSAGE}`;
    return output;
}

/**
 * Begins the game with the starting player as parameter, if not 
 * player selected starts with X
 * @param {String} player Starting player
 */
const playTurn = (player = 'X', turnList = [[0, 0]]) => {
    currentTurn = 0;

    let headerMessageOutput = headerMessage(currentTurn, player);
    let boardOutput = drawBoard(player, turnList);
    let footerMessageOutput = footerMessage(currentTurn++, player);

    const output = `${headerMessageOutput}\n${boardOutput}\n${footerMessageOutput}`;
    return output;
};

const begin = (player, turnList) => {
    //TODO implement 
}

module.exports = { begin, playTurn, drawBoard, headerMessage, footerMessage };
