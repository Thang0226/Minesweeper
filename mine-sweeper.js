function restart() {
  document.location.reload();
}

let game_board = new GameBoard(10, 10, 10, "game-board");
game_board.initBoard();
