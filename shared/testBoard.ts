import { ServerGame } from "./gameType";

const rotate = (arr: boolean[][]) => {
  return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
};

export const testBoard: (theme: string) => ServerGame = (theme: string) => ({
  user: "TestUser",
  uuid: "C270D7CD-AF97-42CE-A6C9-CB765102CA17",
  width: 11,
  height: 4,
  isRevealed: rotate([
    [false, false, false, false, false, ...Array<boolean>(6).fill(true)],
    [...Array<boolean>(11).fill(true)],
    [...Array<boolean>(11).fill(true)],
    [...Array<boolean>(6).fill(true), ...Array<boolean>(5).fill(false)],
  ]),
  isFlagged: rotate([
    [true, ...Array<boolean>(10).fill(false)],
    [...Array<boolean>(11).fill(false)],
    [...Array<boolean>(11).fill(false)],
    [...Array<boolean>(11).fill(false)],
  ]),
  finished: 1,
  started: 1,
  stage: 420,
  lastClick: [2, 2],
  mines: rotate([
    [false, false, false, false, false, ...Array<boolean>(6).fill(true)],
    [...Array<boolean>(8).fill(false), true, false, true],
    [false, false, ...Array<boolean>(9).fill(true)],
    [...Array<boolean>(11).fill(false)],
  ]),
  minesCount: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8,
  isQuestionMark: rotate([
    [false, true, ...Array<boolean>(9).fill(false)],
    [...Array<boolean>(11).fill(false)],
    [...Array<boolean>(11).fill(false)],
    [...Array<boolean>(11).fill(false)],
  ]),
  theme,
});
