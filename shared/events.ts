import type { Rarity } from "../shared/lootboxes";
import { ClientGame, ServerGame } from "./gameType";
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
      time: number;
    }
  | {
      type: "updateGame";
      game: string;
      gameState: ServerGame | ClientGame;
    }
  | {
      type: "updateStage";
      game: string;
      stage: number;
      started: number;
    }
  | {
      type: "gemsRewarded";
      stage: number;
      gems: number;
    }
  | {
      type: "lootboxPurchased";
      lootbox: string;
      reward: string;
      user: string;
      rarity: Rarity;
    };
