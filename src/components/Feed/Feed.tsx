import { AnimatePresence, motion } from "motion/react";
import { useAtom } from "jotai";
import { feedItemsAtom, lootboxResultAtom } from "../../atoms";
import FeedItemElement from "./FeedItem";
import { useEffect } from "react";
import { addMessageListener, removeMessageListener } from "../../wsClient";
import type { Events } from "../../../shared/events";
import { useWSQuery } from "../../hooks";

const Feed: React.FC = () => {
  const [items, setItems] = useAtom(feedItemsAtom);
  const [, setLootboxResult] = useAtom(lootboxResultAtom);
  const { data: user } = useWSQuery("user.getSelf", null);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((items) => items.filter((item) => item.decay > Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [setItems]);

  useEffect(() => {
    const listener = async (event: MessageEvent) => {
      const data = JSON.parse(event.data) as Events;
      const newItems = [...items];
      if (data.type === "new" && data.user !== user) {
        newItems.push({
          type: "gameStarted",
          user: data.user,
          id: crypto.randomUUID(),
          decay: Date.now() + 1000 * 3,
        });
      }
      if (data.type === "loss") {
        newItems.push({
          type: "gameFinished",
          user: data.user,
          id: crypto.randomUUID(),
          decay: Date.now() + 1000 * 3 + data.stage * 500,
          stage: data.stage,
          time: data.time,
        });
      }
      if (data.type === "gemsRewarded" && data.gems > 0) {
        newItems.push({
          type: "gemsEarned",
          id: crypto.randomUUID(),
          decay: Date.now() + 1000 * 3 + data.stage * 1500,
          stage: data.stage,
          gems: data.gems,
        });
      }
      if (data.type === "lootboxPurchased" && data.user !== user) {
        newItems.push({
          type: "lootboxPurchased",
          id: crypto.randomUUID(),
          decay: Date.now() + 20_000,
          lootbox: data.lootbox,
          user: data.user,
          reward: data.reward,
          rarity: data.rarity,
        });
        await new Promise((res) => setTimeout(res, 2_000));
      }
      if (data.type === "lootboxPurchased" && data.user === user) {
        setLootboxResult({
          lootbox: data.lootbox,
          result: data.reward,
        });
      }
      setItems(newItems);
    };
    addMessageListener(listener);
    return () => removeMessageListener(listener);
  }, [items, setItems, setLootboxResult, user]);

  return (
    <div className="flex flex-col gap-4 w-full items-start h-[30%] overflow-y-hidden">
      <div className="text-white relative">
        <motion.div layout>
          <AnimatePresence>
            {items.map((item) => (
              <FeedItemElement key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Feed;
