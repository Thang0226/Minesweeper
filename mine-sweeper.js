let numRows;
let numCols;
let numMines;
let mode;

function startPlay() {
  mode = document.getElementById("mode").value;
  switch (mode) {
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
  let game_board = new GameBoard(numRows, numCols, numMines, "game-board");
  game_board.initBoard();
  game_board.startClock();
}
