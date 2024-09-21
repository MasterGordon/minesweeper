import type { ClientGame } from "../shared/game";

export type EventType = "new" | "finished" | "updateGame" | "updateStage";

type Events =
  | {
      type: "new";
      user: string;
    }
  | {
      type: "loss";
      user: string;
      stage: number;
    }
  | {
      type: "updateGame";
      game: string;
      data: ClientGame;
    }
  | {
      type: "updateStage";
      game: string;
      stage: number;
      started: number;
    };

const listeners = new Set<(event: Events) => void>();

export const on = (listener: (event: Events) => void) => {
  listeners.add(listener);
};

export const off = (listener: (event: Events) => void) => {
  listeners.delete(listener);
};

export const emit = (event: Events) => {
  listeners.forEach((listener) => listener(event));
};
