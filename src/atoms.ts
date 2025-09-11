import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { FeedItem } from "./components/Feed/FeedItem";

export const gameIdAtom = atom<string | undefined>(undefined);
export const loginTokenAtom = atomWithStorage<string | undefined>(
  "loginToken",
  undefined,
);
export const cursorXAtom = atom(0);
export const cursorYAtom = atom(0);
export const feedItemsAtom = atom<FeedItem[]>([]);
interface LootboxResult {
  result: string;
  lootbox: string;
}
export const lootboxResultAtom = atom<LootboxResult | undefined>();

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';
export const connectionStatusAtom = atom<ConnectionStatus>('connecting');
