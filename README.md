# Tic-tac-toe XP-Farm TDD

Technical recruitment test

## Test Description
The exercise involves developing a Tic-Tac-Toe game strictly adhering to the TDD rules

## Game Rules:

[Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe)

# Configuration
Create and _.env_ file using the one provided as example to configure the game turns an starting player.

```sh
# The list should contain an array of positions from 1 to 3 in ASCENDING order 
# to indicate the placement of the player positions
TURN_LIST=[ [1, 1], [1, 2] ]
# Setup the stating player
STARTING_PLAYER=X
```

# Test scenarios
The main approach to build and test the scenarios is to use the _outside-in_ technique.

| Test Scenario | Status |
| ------ | ------ |
| Game Board Creation phase | ✅ |
| Player X won with a vertical line | ✅ |
| Player O won with a horizontal line | ❌ |
| Player X won with a diagonal line | ❌ |
| Game ends with a draw | ❌ |

# GOAL
The system could be run in BOT mode to print on the screen all player's moves (with a 2 seconds timeout between each round) until someone won or the game ends with a draw.

## License

MIT