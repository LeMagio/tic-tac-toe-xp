const game = require("./game");

describe("Scenario 1: Game board creation", () => {
    it('Game board layout', () => {
        expect(game.start())
        .toBe("Game Board Creation... ||/n-+-+- || -+-+- ||/nBoard Created./nThe game will start with player X");
    });
});

describe("Scenario 2: Game board creation", () => {
    it('Player X won with a vertical line ', () => {
        expect(game.start())
        .toBe("Player X:/nX| | /n-+-+-X|O| /n-+-+-X| |O/nPLAYER XWON!");
    });
});