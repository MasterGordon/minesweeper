import { create } from "zustand";

interface GameState {
  mines: boolean[][];
  minesCount: number;
  isRevealed: boolean[][];
  isFlagged: boolean[][];
  isGameOver: boolean;
  startTime: number;
  width: number;
  height: number;

  initializeGame: (width: number, height: number, mines: number) => void;
  flag: (x: number, y: number) => void;
  reveal: (x: number, y: number) => void;
  getValue: (x: number, y: number) => number;
  getHasWon: () => boolean;
  getMinesLeft: () => number;
  quickStart: () => void;
  isValid: (x: number, y: number) => boolean;
  resetGame: (width: number, height: number, mines: number) => void;
  isMine: (x: number, y: number) => boolean;
  getNeighborMines: (x: number, y: number) => boolean[];
  getNeighborFlags: (x: number, y: number) => boolean[];
  getWidth: () => number;
  getHeight: () => number;
  isTouched: () => boolean;
}

const useGameStore = create<GameState>((set, get) => ({
  mines: [[]],
  minesCount: 0,
  isRevealed: [[]],
  isFlagged: [[]],
  isGameOver: false,
  startTime: Date.now(),
  width: 0,
  height: 0,

  initializeGame: (width, height, mines) => {
    mines = Math.min(mines, width * height);

    const minesArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isRevealedArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isFlaggedArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );

    let remainingMines = mines;
    while (remainingMines > 0) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      if (!minesArray[x][y]) {
        minesArray[x][y] = true;
        remainingMines--;
      }
    }

    set({
      width,
      height,
      mines: minesArray,
      isRevealed: isRevealedArray,
      isFlagged: isFlaggedArray,
      minesCount: mines,
      isGameOver: false,
      startTime: Date.now(),
    });
  },

  flag: (x, y) => {
    set((state) => {
      const isFlagged = [...state.isFlagged];
      isFlagged[x][y] = !isFlagged[x][y];
      return { isFlagged };
    });
  },

  reveal: (x, y) => {
    const { mines, isRevealed, isGameOver, getValue } = get();
    if (isGameOver || !get().isValid(x, y) || isRevealed[x][y]) return;

    const newRevealed = [...isRevealed];
    newRevealed[x][y] = true;

    if (mines[x][y]) {
      set({ isGameOver: true, isRevealed: newRevealed });
    } else {
      set({ isRevealed: newRevealed });
      const value = getValue(x, y);
      if (value === 0) {
        const revealNeighbors = (nx: number, ny: number) => {
          if (get().isValid(nx, ny) && !isRevealed[nx]?.[ny]) {
            get().reveal(nx, ny);
          }
        };

        revealNeighbors(x - 1, y - 1);
        revealNeighbors(x, y - 1);
        revealNeighbors(x + 1, y - 1);
        revealNeighbors(x - 1, y);
        revealNeighbors(x + 1, y);
        revealNeighbors(x - 1, y + 1);
        revealNeighbors(x, y + 1);
        revealNeighbors(x + 1, y + 1);
      }
    }
  },

  getValue: (x, y) => {
    const { mines } = get();
    const neighbors = [
      mines[x - 1]?.[y - 1],
      mines[x]?.[y - 1],
      mines[x + 1]?.[y - 1],
      mines[x - 1]?.[y],
      mines[x + 1]?.[y],
      mines[x - 1]?.[y + 1],
      mines[x]?.[y + 1],
      mines[x + 1]?.[y + 1],
    ];
    return neighbors.filter((n) => n).length;
  },

  getHasWon: () => {
    const { mines, isRevealed, isFlagged, isGameOver, width, height } = get();
    if (isGameOver) return false;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (!isRevealed[i][j] && !isFlagged[i][j]) return false;
        if (mines[i][j] && !isFlagged[i][j]) return false;
      }
    }

    return true;
  },

  getMinesLeft: () => {
    const { minesCount, isFlagged } = get();
    return minesCount - isFlagged.flat().filter((flag) => flag).length;
  },

  quickStart: () => {
    const { width, height, mines, getValue, reveal } = get();
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const value = getValue(i, j);
        if (value === 0 && !mines[i][j]) {
          reveal(i, j);
          return;
        }
      }
    }
  },
  isValid: (x: number, y: number) => {
    const { width, height } = get();
    return x >= 0 && x < width && y >= 0 && y < height;
  },
  resetGame: (width: number, height: number, mines: number) => {
    if (mines > width * height) {
      throw new Error("Too many mines");
    }

    const minesArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isRevealedArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );
    const isFlaggedArray = Array.from({ length: width }, () =>
      new Array(height).fill(false),
    );

    let remainingMines = mines;
    while (remainingMines > 0) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      if (!minesArray[x][y]) {
        minesArray[x][y] = true;
        remainingMines--;
      }
    }

    set({
      width,
      height,
      mines: minesArray,
      isRevealed: isRevealedArray,
      isFlagged: isFlaggedArray,
      minesCount: mines,
      isGameOver: false,
      startTime: Date.now(),
    });
  },
  isMine: (x: number, y: number) => {
    const { mines } = get();
    return mines[x][y];
  },
  getNeighborMines: (x: number, y: number) => {
    const { mines } = get();
    const neighbors = [
      mines[x - 1]?.[y - 1],
      mines[x]?.[y - 1],
      mines[x + 1]?.[y - 1],
      mines[x - 1]?.[y],
      mines[x + 1]?.[y],
      mines[x - 1]?.[y + 1],
      mines[x]?.[y + 1],
      mines[x + 1]?.[y + 1],
    ];
    return neighbors;
  },
  getNeighborFlags: (x: number, y: number) => {
    const { isFlagged } = get();
    const neighbors = [
      isFlagged[x - 1]?.[y - 1],
      isFlagged[x]?.[y - 1],
      isFlagged[x + 1]?.[y - 1],
      isFlagged[x - 1]?.[y],
      isFlagged[x + 1]?.[y],
      isFlagged[x - 1]?.[y + 1],
      isFlagged[x]?.[y + 1],
      isFlagged[x + 1]?.[y + 1],
    ];
    return neighbors;
  },
  getWidth: () => {
    const { width } = get();
    return width;
  },
  getHeight: () => {
    const { height } = get();
    return height;
  },
  isTouched: () => {
    const { isRevealed, isFlagged } = get();
    return (
      isRevealed.flat().filter((flag) => flag).length > 0 ||
      isFlagged.flat().filter((flag) => flag).length > 0
    );
  },
}));

export default useGameStore;
