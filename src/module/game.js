const CONSTANT_VALUES = {
    PLAYER_X: 'X',
    PLAYER_O: 'O',
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
    SWITCH_PLAYER: { 'X': 'O', 'O': 'X' },
    WINNING_SUMS: [9, 12, 15],
    EVEN_FUNCTION: (v, index) => index % 2 == 0,
    ODD_FUNCTION: (v, index) => index % 2 != 0,
    REDUCE_FUNCTION: (acc, val) => acc + val,
    WIN_PLAYER_FOOTER_MESSAGE: "PLAYER",
}

// Global
let currentTurn;


/**
 * Draws the board with the current distribution until last turn
 * using the turns provided switching between each player on every
 * player placing turn
 * @param {String} startingPlayer The player
 * @param {Array} turnList Array with the turns in ASC way
 * @returns String representing the board
 */
const drawBoard = (startingPlayer, turnList = [[0, 0]]) => {
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

    let playerInTurn = startingPlayer === CONSTANT_VALUES.PLAYER_X ? CONSTANT_VALUES.PLAYER_X : CONSTANT_VALUES.PLAYER_O;

    turnList.forEach(({ 0: placeRow, 1: placeColumn }) => {
        if (placeRow != 0 && placeColumn != 0)
            boardLayout[CONSTANT_VALUES.ROW_EQ[placeRow]][`cell_${placeColumn}`] = playerInTurn;
        playerInTurn = CONSTANT_VALUES.SWITCH_PLAYER[playerInTurn];
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
const footerMessage = (turn, player, analyzedResult = { X: false }) => {
    if (turn == 0)
        return `${CONSTANT_VALUES.BEGIN_FOOTER_MESSAGE} ${player}`;

    let output = analyzedResult[player]
        ? `${CONSTANT_VALUES.WIN_PLAYER_FOOTER_MESSAGE} ${player} WON!`
        : '';
    return output;
}

/**
 * Begins the game with the starting player as parameter, if not 
 * player selected starts with X
 * @param {String} player Starting player
 * @param {Array} turList Array list of turns
 * @param {Number} currentTurn The current turn
 * @returns The output corresponding to the starting player and
 * provided list of turns
 */
const playTurn = (player = 'X', turnList, currentTurn = turnList.length) => {
    const headerMessageOutput = headerMessage(currentTurn, player);
    const boardOutput = drawBoard(player, turnList);
    const analyzedResult = analyzePlayerPlacement(player, turnList);
    const footerMessageOutput = footerMessage(currentTurn++, player, analyzedResult);

    const output = `${headerMessageOutput}\n${boardOutput}\n${footerMessageOutput}`;
    return output;
};

/**
 * Sums the positions from the matrix and evaluate it matematically
 * for winning combinations
 * @param {String} player The player
 * @param {Array} turnList List of turns
 * @returns 
 */
const analyzePlayerPlacement = (player, turnList = Array()) => {
    const firstPlayerList = [].concat(...turnList.filter(CONSTANT_VALUES.EVEN_FUNCTION));
    const sumFirstPlayer = (firstPlayerList.length > 0)
        ? firstPlayerList.reduce(CONSTANT_VALUES.REDUCE_FUNCTION) : 0;

    const secondPlayerList = [].concat(...turnList.filter(CONSTANT_VALUES.ODD_FUNCTION));
    const sumSecondPlayer = (secondPlayerList.length > 0)
        ? secondPlayerList.reduce(CONSTANT_VALUES.REDUCE_FUNCTION) : 0;

    return {
        [player]: CONSTANT_VALUES.WINNING_SUMS.includes(sumFirstPlayer) && firstPlayerList.length > 2,
        [CONSTANT_VALUES.SWITCH_PLAYER[player]]:
            CONSTANT_VALUES.WINNING_SUMS.includes(sumSecondPlayer) && secondPlayerList.length > 2
    };
};

const begin = (player, turnList) => {
    //TODO implement 
}

module.exports = { begin, playTurn, drawBoard, headerMessage, footerMessage, analyzePlayerPlacement };
