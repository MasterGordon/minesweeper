import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gameIdAtom = atom<string | undefined>(undefined);
export const loginTokenAtom = atomWithStorage<string | undefined>(
  "loginToken",
  undefined,
);
