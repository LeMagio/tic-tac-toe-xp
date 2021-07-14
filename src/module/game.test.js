const game = require("./game");

const VALID_MOVE = [[1, 1]];
const VALID_MOVE_ANOTHER = [[3, 3]];
const WINING_STARTING_PLAYER_TURN_LIST = [[1, 1], [2, 2], [2, 1], [3, 3], [3, 1]];
const PLAYER_X_WINNIN_JSON = { X: true, O: false };
const PLAYER_O_WINNIN_JSON = { X: false, O: true };
const NON_WINNING_GAME = { X: false, O: false };
const TURN_INITIAL = 0;
const TURN_FIRST = 1;
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const NON_WINNING_TURN_LIST = [[1, 1], [1, 2]];


describe("Scenario 1: Game board creation", () => {
    it('Empty board', () => {
        expect(game.drawBoard(PLAYER_X))
            .toBe(" | | \n-+-+-\n | | \n-+-+-\n | | ");
    });
    it('Player X on first cell of first row', () => {
        expect(game.drawBoard(PLAYER_X, VALID_MOVE))
            .toBe("X| | \n-+-+-\n | | \n-+-+-\n | | ");
    });
    it('Player O on third cell of third row', () => {
        expect(game.drawBoard(PLAYER_O, VALID_MOVE_ANOTHER))
            .toBe(" | | \n-+-+-\n | | \n-+-+-\n | |O");
    });
    it('Any other player letter, reset to X', () => {
        expect(game.drawBoard('U', VALID_MOVE_ANOTHER))
            .toBe(" | | \n-+-+-\n | | \n-+-+-\n | |X");
    });
    it('Header message for beginning', () => {
        expect(game.headerMessage(TURN_INITIAL, PLAYER_X))
            .toBe("Game Board Creation...");
    });
    it('Header message for player turn', () => {
        expect(game.headerMessage(TURN_FIRST, PLAYER_X))
            .toBe("Player X (turn 1):");
    });
    it('Header message for player turn', () => {
        expect(game.headerMessage(3, PLAYER_O))
            .toBe("Player O (turn 3):");
    });
    it('Footer message for player turn', () => {
        expect(game.footerMessage(TURN_INITIAL, PLAYER_X))
            .toBe("Board Created.\nThe game will start with player X");
    });
    it('Analyze winning player X', () => {
        expect(game.analyzePlayerPlacement(PLAYER_X, WINING_STARTING_PLAYER_TURN_LIST))
            .toMatchObject(PLAYER_X_WINNIN_JSON);
    });
    it('Analyze winning player O', () => {
        expect(game.analyzePlayerPlacement(PLAYER_O, WINING_STARTING_PLAYER_TURN_LIST))
            .toMatchObject(PLAYER_O_WINNIN_JSON);
    });
    it('Analyze not winning', () => {
        expect(game.analyzePlayerPlacement(PLAYER_X, NON_WINNING_TURN_LIST))
            .toMatchObject(NON_WINNING_GAME);
    });
    it('Game board layout', () => {
        expect(game.playTurn(PLAYER_X, []))
            .toBe("Game Board Creation...\n | | \n-+-+-\n | | \n-+-+-\n | | \nBoard Created.\nThe game will start with player X");
    });
});

describe("Scenario 2: Game board creation", () => {
    it('Winner footer message for player X', () => {
        expect(game.footerMessage(3, PLAYER_X, PLAYER_X_WINNIN_JSON))
            .toBe("PLAYER X WON!");
    });
    it('Winner footer message for player O', () => {
        expect(game.footerMessage(3, PLAYER_O, PLAYER_O_WINNIN_JSON))
            .toBe("PLAYER O WON!");
    });
    it('Non winner game, empty messgge', () => {
        expect(game.footerMessage(3, PLAYER_O, NON_WINNING_GAME))
            .toBe("");
    });
    it('Player X two turns ', () => {
        expect(game.playTurn(PLAYER_X, NON_WINNING_TURN_LIST))
            .toBe("Player X (turn 2):\nX|O| \n-+-+-\n | | \n-+-+-\n | | \n");
    });
    it('Player X won with a vertical line ', () => {
        expect(game.playTurn(PLAYER_X, WINING_STARTING_PLAYER_TURN_LIST))
            .toBe("Player X (turn 5):\nX| | \n-+-+-\nX|O| \n-+-+-\nX| |O\nPLAYER X WON!");
    });
});