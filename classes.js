class Cell {
  constructor() {
    this.isMine = false;
    this.isOpen = false;
    this.isFlagged = false;
    this.mineCount = 0;
  }
}

class GameBoard {
  constructor(numRows, numCols, numMines, elementId) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.numMines = numMines;
    this.elementId = elementId;
    this.cells = [];
    this.gameOver = false;
  }

  initBoard() {
    for (let i = 0; i < this.numRows; i++) {
      let row = [];
      for (let j = 0; j < this.numCols; j++) {
        let cell = new Cell();
        row.push(cell);
      }
      this.cells.push(row);
    }

    this.placeMines();
    this.updateMineCounts();
    this.draw();
  }

  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.numMines) {
      let row = Math.floor(Math.random() * this.numRows);
      let col = Math.floor(Math.random() * this.numCols);
      if (!this.cells[row][col].isMine) {
        this.cells[row][col].isMine = true;
        minesPlaced++;
      }
    }
  }

  updateMineCounts() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (!this.cells[i][j].isMine) {
          this.cells[i][j].mineCount = this.countMinesAround(i, j);
        }
      }
    }
  }
  countMinesAround(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let r = row + i;
        let c = col + j;
        if (this.isValidCell(r, c) && this.cells[r][c].isMine) {
          count++;
        }
      }
    }
    return count;
  }
  isValidCell(row, col) {
    return row >= 0 && row < this.numRows && col >= 0 && col < this.numCols;
  }

  draw() {
    let game_board = document.getElementById(this.elementId);
    game_board.innerHTML = "";

    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        let unit = document.createElement("div");
        unit.className = "cell";

        if (this.cells[i][j].isOpen) {
          unit.classList.add("opened");
          if (this.cells[i][j].mineCount > 0) {
            unit.textContent = this.cells[i][j].mineCount;
          }
        } else {
          if (this.cells[i][j].isFlagged) {
            unit.textContent = "🚩";
          }
        }

        unit.addEventListener("click", () => this.openCell(i, j));
        unit.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          this.toggleFlag(i, j);
        });
        unit.addEventListener("dblclick", () =>
          this.openAdjacentCellsOfNumber(i, j)
        );

        game_board.appendChild(unit);
      }
      game_board.appendChild(document.createElement("br"));
    }
  }

  // click function
  openCell(x, y) {
    if (this.gameOver) return;
    if (this.cells[x][y].isOpen || this.cells[x][y].isFlagged) return;

    this.cells[x][y].isOpen = true;
    this.draw();

    if (this.cells[x][y].isMine) {
      this.endGame(false);
    } else if (this.cells[x][y].mineCount == 0) {
      this.openAdjacentCellsOfZero(x, y);
    }

    this.checkWin();
  }
  openAdjacentCellsOfZero(row, col) {
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        let newRow = row + r;
        let newCol = col + c;
        if (
          this.isValidCell(newRow, newCol) &&
          !this.cells[newRow][newCol].isMine
        ) {
          this.openCell(newRow, newCol);
        }
      }
    }
  }

  checkWin() {
    let openedCells = 0;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (this.cells[i][j].isOpen) {
          openedCells++;
        }
      }
    }

    if (openedCells === this.numRows * this.numCols - this.numMines) {
      this.endGame(true);
    }
  }
  endGame(win) {
    this.gameOver = true;
    this.drawEndGame();

    if (win) {
      alert("You Won!");
    } else {
      alert("Game Over!");
    }
  }
  drawEndGame() {
    let game_board = document.getElementById(this.elementId);
    game_board.innerHTML = "";
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        let unit = document.createElement("div");
        unit.className = "cell";
        if (this.cells[i][j].isOpen) {
          unit.classList.add("opened");
          if (this.cells[i][j].mineCount > 0) {
            unit.textContent = this.cells[i][j].mineCount;
          }
        } else {
          if (this.cells[i][j].isFlagged) {
            unit.textContent = "🚩";
          }
        }
        if (this.cells[i][j].isMine) {
          unit.classList.add("mine");
          unit.textContent = "💣";
        }
        game_board.appendChild(unit);
      }
      game_board.appendChild(document.createElement("br"));
    }
  }

  // right click function
  toggleFlag(x, y) {
    if (this.gameOver || this.cells[x][y].isOpen) return;
    if (this.cells[x][y].isFlagged) {
      this.cells[x][y].isFlagged = false;
    } else {
      this.cells[x][y].isFlagged = true;
    }
    this.draw();
  }

  // double click function
  openAdjacentCellsOfNumber(row, col) {
    if (this.cells[row][col].isFlagged) return;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newRow = row + i;
        let newCol = col + j;
        if (
          this.isValidCell(newRow, newCol) &&
          !this.cells[newRow][newCol].isFlagged
        ) {
          this.openCell(newRow, newCol);
        }
      }
    }
  }
}
