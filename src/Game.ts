export class Game {
  mines: boolean[][] = [];
  minesCount: number = 0;
  isRevealed: boolean[][] = [];
  isFlagged: boolean[][] = [];
  isGameOver: boolean = false;
  startTime: number = Date.now();

  constructor(width: number, height: number, mines: number) {
    if (mines > width * height) {
      throw new Error("Too many mines");
    }
    this.minesCount = mines;
    for (let i = 0; i < width; i++) {
      this.mines.push(new Array(height).fill(false));
      this.isRevealed.push(new Array(height).fill(false));
      this.isFlagged.push(new Array(height).fill(false));
    }
    while (mines > 0) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      if (!this.mines[x][y]) {
        this.mines[x][y] = true;
        mines--;
      }
    }
  }

  getWidth() {
    return this.mines.length;
  }

  getHeight() {
    return this.mines[0].length;
  }

  isMine(x: number, y: number) {
    return this.mines[x][y];
  }

  flag(x: number, y: number) {
    this.isFlagged[x][y] = !this.isFlagged[x][y];
  }

  isValid(x: number, y: number) {
    return x >= 0 && x < this.getWidth() && y >= 0 && y < this.getHeight();
  }

  reveal(x: number, y: number) {
    if (!this.isValid(x, y)) return;
    this.isRevealed[x][y] = true;
    if (this.isMine(x, y)) {
      this.isGameOver = true;
      return;
    }
    const value = this.getValue(x, y);
    if (value === 0) {
      if (this.isValid(x - 1, y - 1) && !this.isRevealed[x - 1]?.[y - 1])
        this.reveal(x - 1, y - 1);
      if (this.isValid(x, y - 1) && !this.isRevealed[x]?.[y - 1])
        this.reveal(x, y - 1);
      if (this.isValid(x + 1, y - 1) && !this.isRevealed[x + 1]?.[y - 1])
        this.reveal(x + 1, y - 1);
      if (this.isValid(x - 1, y) && !this.isRevealed[x - 1]?.[y])
        this.reveal(x - 1, y);
      if (this.isValid(x + 1, y) && !this.isRevealed[x + 1]?.[y])
        this.reveal(x + 1, y);
      if (this.isValid(x - 1, y + 1) && !this.isRevealed[x - 1]?.[y + 1])
        this.reveal(x - 1, y + 1);
      if (this.isValid(x, y + 1) && !this.isRevealed[x]?.[y + 1])
        this.reveal(x, y + 1);
      if (this.isValid(x + 1, y + 1) && !this.isRevealed[x + 1]?.[y + 1])
        this.reveal(x + 1, y + 1);
    }
  }

  getHasWon() {
    if (this.isGameOver) {
      return false;
    }
    for (let i = 0; i < this.getWidth(); i++) {
      for (let j = 0; j < this.getHeight(); j++) {
        if (!this.isRevealed[i][j] && !this.isFlagged[i][j]) {
          return false;
        }
        if (this.isMine(i, j) && !this.isFlagged[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  getMinesLeft() {
    return this.minesCount - this.isFlagged.flat().filter((m) => m).length;
  }

  getNeighborFlags(x: number, y: number) {
    const neighbors = [
      this.isFlagged[x - 1]?.[y - 1],
      this.isFlagged[x]?.[y - 1],
      this.isFlagged[x + 1]?.[y - 1],
      this.isFlagged[x - 1]?.[y],
      this.isFlagged[x + 1]?.[y],
      this.isFlagged[x - 1]?.[y + 1],
      this.isFlagged[x]?.[y + 1],
      this.isFlagged[x + 1]?.[y + 1],
    ];
    return neighbors;
  }

  getNeighborMines(x: number, y: number) {
    const neighbors = [
      this.mines[x - 1]?.[y - 1],
      this.mines[x]?.[y - 1],
      this.mines[x + 1]?.[y - 1],
      this.mines[x - 1]?.[y],
      this.mines[x + 1]?.[y],
      this.mines[x - 1]?.[y + 1],
      this.mines[x]?.[y + 1],
      this.mines[x + 1]?.[y + 1],
    ];
    return neighbors;
  }

  getValue(x: number, y: number) {
    const neighbors = this.getNeighborMines(x, y);
    const mines = neighbors.filter((n) => n).length;
    return mines;
  }
}
