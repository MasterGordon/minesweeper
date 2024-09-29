import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gameIdAtom = atom<string | undefined>(undefined);
export const loginTokenAtom = atomWithStorage<string | undefined>(
  "loginToken",
  undefined,
);
export const cursorXAtom = atom(0);
export const cursorYAtom = atom(0);
