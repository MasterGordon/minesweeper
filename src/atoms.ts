import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gameId = atom<string | undefined>(undefined);
export const loginToken = atomWithStorage<string | undefined>(
  "loginToken",
  undefined,
);
