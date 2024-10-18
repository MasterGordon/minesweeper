import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { formatTimeSpan } from "../../../shared/time";
import GemsIcon from "../GemIcon";
import type { Rarity as RarityType } from "../../../shared/lootboxes";
import { Rarity } from "../Rarity";
import { themes } from "../../themes";

interface BaseFeedItem {
  decay: number;
  id: string;
}

interface GameStartedItem extends BaseFeedItem {
  type: "gameStarted";
  user: string;
}

interface GameFinishedItem extends BaseFeedItem {
  type: "gameFinished";
  user: string;
  stage: number;
  time: number;
}

interface GemsEarnedItem extends BaseFeedItem {
  type: "gemsEarned";
  gems: number;
  stage: number;
}

interface LootboxPurchasedItem extends BaseFeedItem {
  type: "lootboxPurchased";
  lootbox: string;
  user: string;
  reward: string;
  rarity: RarityType;
}

export type FeedItem =
  | GameStartedItem
  | GameFinishedItem
  | GemsEarnedItem
  | LootboxPurchasedItem;

const FeedItemWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const FeedItemElement: React.FC<{ item: FeedItem }> = ({ item }) => {
  switch (item.type) {
    case "gameStarted":
      return <FeedItemWrapper>{item.user} started a game</FeedItemWrapper>;
    case "gameFinished":
      return (
        <FeedItemWrapper>
          {item.user} finished in{" "}
          <span className="whitespace-nowrap">stage {item.stage}</span> after{" "}
          {formatTimeSpan(item.time)}
        </FeedItemWrapper>
      );
    case "gemsEarned":
      return (
        <FeedItemWrapper>
          You got {item.gems} <GemsIcon /> for <span>stage {item.stage}</span>
        </FeedItemWrapper>
      );
    case "lootboxPurchased":
      return (
        <FeedItemWrapper>
          {item.user} got{" "}
          <Rarity rarity={item.rarity}>
            {themes.find((i) => i.id == item.reward)?.name}
          </Rarity>
        </FeedItemWrapper>
      );
  }
};

export default FeedItemElement;
