function start() {
  switch (mode.value) {
    case "easy":
      numRows = 10;
      numCols = 10;
      numMines = 10;
      break;
    case "medium":
      numRows = 15;
      numCols = 20;
      numMines = 35;
      break;
    case "hard":
      numRows = 20;
      numCols = 30;
      numMines = 70;
  }

  let game = new GameBoard(numRows, numCols, numMines);
  game.initBoard();
  game.startClock();
}
