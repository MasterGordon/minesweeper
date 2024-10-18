import type { PropsWithChildren } from "react";
import { cn } from "../lib/utils";
import { rarities } from "../../shared/lootboxes";

export const Rarity: React.FC<PropsWithChildren<{ rarity: string }>> = ({
  rarity,
  children,
}) => {
  return (
    <span
      className={cn(
        "font-bold",
        rarity == "common" && "text-common",
        rarity == "uncommon" && "text-uncommon",
        rarity == "rare" && "text-rare",
        rarity == "legendary" && "text-legendary",
      )}
    >
      {children ?? rarities.find((r) => r.id === rarity)?.name}
    </span>
  );
};
