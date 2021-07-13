const game = require("./game");

describe("Scenario 1: Game board creation", () => {
    it('Game board layout', () => {
        expect(game.start())
        .toBe("Game Board Creation... ||/n-+-+- || -+-+- ||/nBoard Created./nThe game will start with player X");
    });
});