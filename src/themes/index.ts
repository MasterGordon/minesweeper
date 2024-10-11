import { basicTheme } from "./basic";
import { blackAndWhiteTheme } from "./black-and-white";
import { catsTheme } from "./cats";
import { defaultTheme } from "./default";
import { dinoTheme } from "./dinos";
import { eldenRingTheme } from "./elden-ring";
import { flowersTheme } from "./flowers";
import { janitorTreshTheme } from "./janitor-tresh";
import { leagueTeemoTheme } from "./league-teemo";
import { leagueZiggsTheme } from "./league-ziggs";
import { mineDogsTheme } from "./mine-dogs";
import { minecraftNetherTheme } from "./minecraft-nether";
import { minecraftOverworldTheme } from "./minecraft-overworld";
import { retroWaveTheme } from "./retro-wave";
import { romanceTheme } from "./romance";
import { techiesDireTheme } from "./techies-dire";
import { techiesRadiantTheme } from "./techies-radiant";
import { Theme } from "./Theme";
import { tronBlueTheme } from "./tron-blue";
import { tronOrangeTheme } from "./tron-orange";

interface ThemeEntry {
  name: string;
  tags: string[];
  /** dont't ever change this! */
  id: string;
  theme: Theme;
}

export const themes: ThemeEntry[] = [
  {
    name: "Default",
    tags: ["Simple"],
    id: "default",
    theme: defaultTheme,
  },
  {
    name: "Basic",
    tags: ["Simple"],
    id: "basic",
    theme: basicTheme,
  },
  {
    name: "Black and White",
    tags: ["Simple", "Monochrome"],
    id: "black-and-white",
    theme: blackAndWhiteTheme,
  },
  {
    name: "Cats",
    tags: ["Animals"],
    id: "cats",
    theme: catsTheme,
  },
  {
    name: "Retro Wave",
    tags: ["Retro", "High Contrast"],
    id: "retro-wave",
    theme: retroWaveTheme,
  },
  {
    name: "Dinos",
    tags: ["Animals"],
    id: "dinos",
    theme: dinoTheme,
  },
  {
    name: "Elden Ring",
    tags: ["Video Games"],
    id: "elden-ring",
    theme: eldenRingTheme,
  },
  {
    name: "Flowers",
    tags: ["No Numbers"],
    id: "flowers",
    theme: flowersTheme,
  },
  {
    name: "Janitor Tresh",
    tags: ["Video Games"],
    id: "janitor-tresh",
    theme: janitorTreshTheme,
  },
  {
    name: "Teemo",
    tags: ["Video Games"],
    id: "teemo",
    theme: leagueTeemoTheme,
  },
  {
    name: "Ziggs",
    tags: ["Video Games"],
    id: "ziggs",
    theme: leagueZiggsTheme,
  },
  {
    name: "Mine Dogs",
    tags: ["Animals"],
    id: "mine-dogs",
    theme: mineDogsTheme,
  },
  {
    name: "Minecraft Nether",
    tags: ["Video Games"],
    id: "minecraft-nether",
    theme: minecraftNetherTheme,
  },
  {
    name: "Minecraft",
    tags: ["Video Games"],
    id: "minecraft-overworld",
    theme: minecraftOverworldTheme,
  },
  {
    name: "Romance",
    tags: [],
    id: "romance",
    theme: romanceTheme,
  },
  {
    name: "Techies Dire",
    tags: ["Video Games"],
    id: "techies-dire",
    theme: techiesDireTheme,
  },
  {
    name: "Techies Radiant",
    tags: ["Video Games"],
    id: "techies-radiant",
    theme: techiesRadiantTheme,
  },
  {
    name: "Tron Blue",
    tags: ["Video Games"],
    id: "tron-blue",
    theme: tronBlueTheme,
  },
  {
    name: "Tron Orange",
    tags: ["Video Games"],
    id: "tron-orange",
    theme: tronOrangeTheme,
  },
];
