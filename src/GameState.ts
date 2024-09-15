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
  stage: number;
  name: string;

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
  triggerPostGame: () => void;
  expandBoard: () => void;
  setName: (name: string) => void;
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
  stage: 1,
  name: localStorage.getItem("name") || "No Name",

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
    const { triggerPostGame } = get();
    triggerPostGame();
  },

  reveal: (x, y) => {
    const { mines, isRevealed, isGameOver, getValue, triggerPostGame } = get();
    if (isGameOver || !get().isValid(x, y) || isRevealed[x][y]) return;

    const newRevealed = [...isRevealed];
    newRevealed[x][y] = true;

    if (mines[x][y]) {
      set({ isGameOver: true, isRevealed: newRevealed });
    } else {
      set({ isRevealed: newRevealed });
      const value = getValue(x, y);
      const neighborFlagCount = get()
        .getNeighborFlags(x, y)
        .filter((n) => n).length;
      if (value === 0 && neighborFlagCount === 0) {
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
    triggerPostGame();
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
        if (isFlagged[i][j] && !mines[i][j]) return false;
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
      stage: 1,
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
  triggerPostGame: () => {
    const { getHasWon, expandBoard } = get();
    if (getHasWon()) {
      expandBoard();
    }
  },
  expandBoard: () => {
    const { width, height, stage, mines, isFlagged, isRevealed } = get();
    const dir = stage % 2 === 0 ? "down" : "right";
    // Expand the board by the current board size 8x8 -> 16x8
    if (dir === "down") {
      const newHeight = Math.floor(height * 1.5);
      const newWidth = width;
      const newMinesCount = Math.floor(
        width * height * 0.5 * (0.2 + 0.003 * stage),
      );
      // expand mines array
      const newMines = Array.from({ length: newWidth }, () =>
        new Array(newHeight).fill(false),
      );
      const newIsRevealed = Array.from({ length: newWidth }, () =>
        new Array(newHeight).fill(false),
      );
      const newIsFlagged = Array.from({ length: newWidth }, () =>
        new Array(newHeight).fill(false),
      );
      for (let i = 0; i < newWidth; i++) {
        for (let j = 0; j < newHeight; j++) {
          const x = i;
          const y = j;
          if (mines[x]?.[y]) {
            newMines[i][j] = true;
          }
          if (isRevealed[x]?.[y]) {
            newIsRevealed[i][j] = true;
          }
          if (isFlagged[x]?.[y]) {
            newIsFlagged[i][j] = true;
          }
        }
      }
      // generate new mines
      let remainingMines = newMinesCount;
      while (remainingMines > 0) {
        const x = Math.floor(Math.random() * width);
        const y = height + Math.floor(Math.random() * (newHeight - height));
        if (!newMines[x][y]) {
          newMines[x][y] = true;
          remainingMines--;
        }
      }
      set({
        width: newWidth,
        height: newHeight,
        mines: newMines,
        minesCount: newMinesCount,
        stage: stage + 1,
        isRevealed: newIsRevealed,
        isFlagged: newIsFlagged,
      });
    }
    if (dir === "right") {
      const newWidth = Math.floor(width * 1.5);
      const newHeight = height;
      const newMinesCount = Math.floor(
        width * height * 0.5 * (0.2 + 0.003 * stage),
      );
      // expand mines array
      const newMines = Array.from({ length: newWidth }, () =>
        new Array(newHeight).fill(false),
      );
      const newIsRevealed = Array.from({ length: newWidth }, () =>
        new Array(newHeight).fill(false),
      );
      const newIsFlagged = Array.from({ length: newWidth }, () =>
        new Array(newHeight).fill(false),
      );
      for (let i = 0; i < newWidth; i++) {
        for (let j = 0; j < newHeight; j++) {
          const x = i;
          const y = j;
          if (mines[x]?.[y]) {
            newMines[i][j] = true;
          }
          if (isRevealed[x]?.[y]) {
            newIsRevealed[i][j] = true;
          }
          if (isFlagged[x]?.[y]) {
            newIsFlagged[i][j] = true;
          }
        }
      }
      // generate new mines
      let remainingMines = newMinesCount;
      while (remainingMines > 0) {
        const x = width + Math.floor(Math.random() * (newWidth - width));
        const y = Math.floor(Math.random() * height);
        if (!newMines[x][y]) {
          newMines[x][y] = true;
          remainingMines--;
        }
      }
      set({
        width: newWidth,
        height: newHeight,
        mines: newMines,
        minesCount: newMinesCount,
        stage: stage + 1,
        isRevealed: newIsRevealed,
        isFlagged: newIsFlagged,
      });
    }
    const newMinesCount = get()
      .mines.flat()
      .filter((m) => m).length;
    set({ minesCount: newMinesCount });
  },
  setName: (name) => {
    localStorage.setItem("name", name);
    set({ name });
  },
}));

export default useGameStore;
