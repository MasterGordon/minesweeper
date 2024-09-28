export type EventType = "new" | "finished" | "updateGame" | "updateStage";

export type Events =
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
    }
  | {
      type: "updateStage";
      game: string;
      stage: number;
      started: number;
    };
