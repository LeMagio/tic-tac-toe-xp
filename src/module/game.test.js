const game = require("./game");

describe("Scenario 1: Game board creation", () => {
    it('Empty board', () => {
        expect(game.drawBoard('X'))
            .toBe(" | | \n-+-+-\n | | \n-+-+-\n | | ");
    });
    it('Player X on first cell of first row', () => {
        expect(game.drawBoard('X', [[1, 1]]))
            .toBe("X| | \n-+-+-\n | | \n-+-+-\n | | ");
    });
    it('Player O on third cell of third row', () => {
        expect(game.drawBoard('O', [[3, 3]]))
            .toBe(" | | \n-+-+-\n | | \n-+-+-\n | |O");
    });
    it('Header test for beginning', () => {
        expect(game.headerMessage(0,'X'))
            .toBe("Game Board Creation...");
    });
    it('Header test for player turn', () => {
        expect(game.headerMessage(1,'X'))
            .toBe("Player X (turn 1):");
    });
    it('Header test for player turn', () => {
        expect(game.headerMessage(3,'O'))
            .toBe("Player O (turn 3):");
    });
    it('Footer test for player turn', () => {
        expect(game.footerMessage(0,'X'))
            .toBe("Board Created.\nThe game will start with player X");
    });
    it('Game board layout', () => {
        expect(game.playTurn('X'))
            .toBe("Game Board Creation...\n | | \n-+-+-\n | | \n-+-+-\n | | \nBoard Created.\nThe game will start with player X");
    });
});

describe("Scenario 2: Game board creation", () => {
    it('Player X won with a vertical line ', () => {
        expect(game.playTurn('X',))
            .toBe("Player X:\nX| | \n-+-+-X|O| \n-+-+-X| |O\nPLAYER X WON!");
    });
});