import type { themes } from "../src/themes";
import lootbox1 from "../src/assets/illustrations/lootbox1.png?w=360&inline";
import lootboxEvent1 from "../src/assets/illustrations/lootbox-event1.png?w=360&inline";

export const rarities = [
  {
    name: "Common",
    id: "common",
    weight: 1,
  },
  {
    name: "Uncommon",
    id: "uncommon",
    weight: 0.5,
  },
  {
    name: "Rare",
    id: "rare",
    weight: 0.25,
  },
  {
    name: "Legendary",
    id: "legendary",
    weight: 0.1,
  },
] as const;

export const getWeight = (rarity: Rarity) =>
  rarities.find((r) => r.id === rarity)?.weight ?? 0;

export type Rarity = (typeof rarities)[number]["id"];
type ThemeId = (typeof themes)[number]["id"];

interface Lootbox {
  name: string;
  id: string;
  price: number;
  priceText: string;
  image: string;
  noDuplicates: boolean;
  items: {
    id: ThemeId;
    rarity: Rarity;
  }[];
}

export const series1: Lootbox = {
  name: "Series 1",
  id: "series1",
  price: 5000,
  priceText: "5.000",
  image: lootbox1,
  noDuplicates: false,
  items: [
    {
      id: "basic",
      rarity: "common",
    },
    {
      id: "black-and-white",
      rarity: "common",
    },
    {
      id: "blue",
      rarity: "common",
    },
    {
      id: "green",
      rarity: "common",
    },
    {
      id: "orange",
      rarity: "common",
    },
    {
      id: "pink",
      rarity: "common",
    },
    {
      id: "purple",
      rarity: "common",
    },
    {
      id: "red",
      rarity: "common",
    },
    {
      id: "turquoise",
      rarity: "common",
    },
    {
      id: "yellow",
      rarity: "common",
    },
    {
      id: "nautical",
      rarity: "uncommon",
    },
    {
      id: "up-in-smoke",
      rarity: "uncommon",
    },
    {
      id: "shadow-warrior",
      rarity: "uncommon",
    },
    {
      id: "crimson",
      rarity: "uncommon",
    },
    {
      id: "romance",
      rarity: "uncommon",
    },
    {
      id: "rainbow",
      rarity: "uncommon",
    },
    {
      id: "flowers",
      rarity: "rare",
    },
    {
      id: "dinos",
      rarity: "rare",
    },
    {
      id: "cats",
      rarity: "rare",
    },
    {
      id: "mine-dogs",
      rarity: "rare",
    },
    {
      id: "tron-blue",
      rarity: "rare",
    },
    {
      id: "tron-orange",
      rarity: "rare",
    },
    {
      id: "circuit",
      rarity: "rare",
    },
    {
      id: "circuit-binary",
      rarity: "rare",
    },
    {
      id: "farm",
      rarity: "rare",
    },
    {
      id: "halli-galli",
      rarity: "rare",
    },
    {
      id: "insects",
      rarity: "rare",
    },
    {
      id: "poop",
      rarity: "rare",
    },
    {
      id: "underwater",
      rarity: "rare",
    },
    {
      id: "retro-wave",
      rarity: "legendary",
    },
    {
      id: "elden-ring",
      rarity: "legendary",
    },
    {
      id: "janitor-tresh",
      rarity: "legendary",
    },
    {
      id: "teemo",
      rarity: "legendary",
    },
    {
      id: "ziggs",
      rarity: "legendary",
    },
    {
      id: "minecraft-nether",
      rarity: "legendary",
    },
    {
      id: "minecraft-overworld",
      rarity: "legendary",
    },
    {
      id: "techies-dire",
      rarity: "legendary",
    },
    {
      id: "techies-radiant",
      rarity: "legendary",
    },
    {
      id: "isaac",
      rarity: "legendary",
    },
    {
      id: "mlg",
      rarity: "legendary",
    },
  ],
};

export const halloween: Lootbox = {
  name: "Halloween",
  id: "halloween",
  price: 6000,
  priceText: "6.000",
  noDuplicates: true,
  image: lootboxEvent1,
  items: [
    {
      id: "skeleton",
      rarity: "rare",
    },
    {
      id: "vampire",
      rarity: "rare",
    },
    {
      id: "ghost",
      rarity: "rare",
    },
    {
      id: "pumpkin",
      rarity: "rare",
    },
    {
      id: "zombie",
      rarity: "rare",
    },
  ],
};

export const lootboxes = [series1, halloween];
