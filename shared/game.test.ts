import { describe, it, expect } from "bun:test";
import { getValue, isServerGame, isClientGame, ServerGame, ClientGame, serverToClientGame } from "./game";

describe("Game", () => {
  it("should get value", () => {
    const mines = [
      [false, false, true, true, true],
      [true, false, true, false, true],
      [false, false, true, true, true],
      [false, false, false, false, false],
    ];
    expect(getValue(mines, 0, 0)).toEqual(1);
    expect(getValue(mines, 0, 1)).toEqual(3);
    expect(getValue(mines, 3, 0)).toEqual(0);
    expect(getValue(mines, 1, 3)).toEqual(8);
  });

  it("should identify server game", () => {
    const serverGame: ServerGame = {
      theme: "default",
      mines: [[false]],
      minesCount: 0,
      isRevealed: [[false]],
      isFlagged: [[false]],
      isQuestionMark: [[false]],
      started: Date.now(),
      finished: 0,
      lastClick: [0, 0],
      uuid: "test-uuid",
      width: 1,
      height: 1,
      user: "TestUser",
      stage: 1,
    };
    expect(isServerGame(serverGame)).toBe(true);
  });

  it("should identify client game", () => {
    const clientGame: ClientGame = {
      theme: "default",
      minesCount: 0,
      isRevealed: [[false]],
      isFlagged: [[false]],
      isQuestionMark: [[false]],
      values: [[0]],
      started: Date.now(),
      lastClick: [0, 0],
      uuid: "test-uuid",
      width: 1,
      height: 1,
      user: "TestUser",
      stage: 1,
    };
    expect(isClientGame(clientGame)).toBe(true);
    expect(isServerGame(clientGame)).toBe(false);
  });

  it("should convert server to client game", () => {
    const serverGame: ServerGame = {
      theme: "default",
      mines: [
        [false, false, true, true, true],
        [true, false, true, false, true],
        [false, false, true, true, true],
        [false, false, false, false, false],
      ],
      minesCount: 4,
      isRevealed: [
        [false, false, true, false, true],
        [true, false, true, false, true],
        [false, false, true, false, true],
        [false, false, false, false, false],
      ],
      isFlagged: [
        [false, false, true, false, true],
        [true, false, true, false, true],
        [false, false, true, false, true],
        [true, false, false, false, false],
      ],
      started: 1679599200000,
      finished: 0,
      lastClick: [0, 0] satisfies [number, number],
      uuid: "C270D7CD-AF97-42CE-A6C9-CB765102CA17",
      width: 5,
      height: 4,
      user: "TestUser",
      stage: 1,
      isQuestionMark: [
        [false, false, true, false, true],
        [true, false, true, false, true],
        [false, false, true, false, true],
        [false, false, false, false, false],
      ],
    };
    expect(serverToClientGame(serverGame)).toEqual({
      theme: "default",
      minesCount: 4,
      isRevealed: [
        [false, false, true, false, true],
        [true, false, true, false, true],
        [false, false, true, false, true],
        [false, false, false, false, false],
      ],
      isFlagged: [
        [false, false, true, false, true],
        [true, false, true, false, true],
        [false, false, true, false, true],
        [true, false, false, false, false],
      ],
      values: [
        [-1, -1, 2, -1, 2],
        [0, -1, 4, -1, 4],
        [-1, -1, 2, -1, 2],
        [-1, -1, -1, -1, -1],
      ],
      lastClick: [0, 0],
      started: 1679599200000,
      uuid: "C270D7CD-AF97-42CE-A6C9-CB765102CA17",
      width: 5,
      height: 4,
      user: "TestUser",
      stage: 1,
      isQuestionMark: [
        [false, false, true, false, true],
        [true, false, true, false, true],
        [false, false, true, false, true],
        [false, false, false, false, false],
      ],
    });
  });
});
