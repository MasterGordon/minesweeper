import { basicTheme } from "./basic";
import { blackAndWhiteTheme } from "./black-and-white";
import { catsTheme } from "./cats";
import { circuitTheme } from "./circuit";
import { circuitBinaryTheme } from "./circuit-binary";
import { crimsonTheme } from "./color-palettes/crimson";
import { nauticalTheme } from "./color-palettes/nautical";
import { shadowWarriorTheme } from "./color-palettes/shadow-warrior";
import { upInSmokeTheme } from "./color-palettes/up-in-smoke";
import { blueTheme } from "./colors/blue";
import { greenTheme } from "./colors/green";
import { orangeTheme } from "./colors/orange";
import { pinkTheme } from "./colors/pink";
import { purpleTheme } from "./colors/purple";
import { redTheme } from "./colors/red";
import { turquoiseTheme } from "./colors/turquoise";
import { yellowTheme } from "./colors/yellow";
import { defaultTheme } from "./default";
import { dinoTheme } from "./dinos";
import { eldenRingTheme } from "./elden-ring";
import { farmTheme } from "./farm";
import { flowersTheme } from "./flowers";
import { halliGalliTheme } from "./halli-galli";
import { ghostTheme } from "./halloween/ghost";
import { pumpkinTheme } from "./halloween/pumpkin";
import { skeletonTheme } from "./halloween/skeleton";
import { vampireTheme } from "./halloween/vampire";
import { zombieTheme } from "./halloween/zombie";
import { insectsTheme } from "./insects";
import { isaacTheme } from "./isaac";
import { janitorTreshTheme } from "./janitor-tresh";
import { leagueTeemoTheme } from "./league-teemo";
import { leagueZiggsTheme } from "./league-ziggs";
import { mineDogsTheme } from "./mine-dogs";
import { minecraftNetherTheme } from "./minecraft-nether";
import { minecraftOverworldTheme } from "./minecraft-overworld";
import { MLGTheme } from "./MLG";
import { poopTheme } from "./poop";
import { rainbowTheme } from "./rainbow";
import { retroWaveTheme } from "./retro-wave";
import { romanceTheme } from "./romance";
import { techiesDireTheme } from "./techies-dire";
import { techiesRadiantTheme } from "./techies-radiant";
import type { Theme } from "./Theme";
import { tronBlueTheme } from "./tron-blue";
import { tronOrangeTheme } from "./tron-orange";
import { underwaterTheme } from "./underwater";

interface ThemeEntry {
  name: string;
  tags: string[];
  /** dont't ever change this! */
  id: string;
  theme: Readonly<Theme>;
}

export const themes = [
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
  {
    name: "Blue",
    tags: ["Monochrome"],
    id: "blue",
    theme: blueTheme,
  },
  {
    name: "Green",
    tags: ["Monochrome"],
    id: "green",
    theme: greenTheme,
  },
  {
    name: "Orange",
    tags: ["Monochrome"],
    id: "orange",
    theme: orangeTheme,
  },
  {
    name: "Pink",
    tags: ["Monochrome"],
    id: "pink",
    theme: pinkTheme,
  },
  {
    name: "Purple",
    tags: ["Monochrome"],
    id: "purple",
    theme: purpleTheme,
  },
  {
    name: "Red",
    tags: ["Monochrome"],
    id: "red",
    theme: redTheme,
  },
  {
    name: "Turquoise",
    tags: ["Monochrome"],
    id: "turquoise",
    theme: turquoiseTheme,
  },
  {
    name: "Yellow",
    tags: ["Monochrome"],
    id: "yellow",
    theme: yellowTheme,
  },
  {
    name: "Circuit",
    tags: [],
    id: "circuit",
    theme: circuitTheme,
  },
  {
    name: "Circuit Binary",
    tags: ["No Numbers"],
    id: "circuit-binary",
    theme: circuitBinaryTheme,
  },
  {
    name: "Farm",
    tags: [],
    id: "farm",
    theme: farmTheme,
  },
  {
    name: "Halli Galli",
    tags: ["No Numbers"],
    id: "halli-galli",
    theme: halliGalliTheme,
  },
  {
    name: "Insects",
    tags: ["No Numbers"],
    id: "insects",
    theme: insectsTheme,
  },
  {
    name: "Binding of Isaac",
    tags: ["Video Games"],
    id: "isaac",
    theme: isaacTheme,
  },
  {
    name: "MLG",
    tags: [],
    id: "mlg",
    theme: MLGTheme,
  },
  {
    name: "Poop",
    tags: [],
    id: "poop",
    theme: poopTheme,
  },
  {
    name: "Underwater",
    tags: [],
    id: "underwater",
    theme: underwaterTheme,
  },
  {
    name: "Nautical",
    tags: [],
    id: "nautical",
    theme: nauticalTheme,
  },
  {
    name: "Up in Smoke",
    tags: [],
    id: "up-in-smoke",
    theme: upInSmokeTheme,
  },
  {
    name: "Shadow Warrior",
    tags: [],
    id: "shadow-warrior",
    theme: shadowWarriorTheme,
  },
  {
    name: "Crimson",
    tags: [],
    id: "crimson",
    theme: crimsonTheme,
  },
  {
    name: "Rainbow",
    tags: [],
    id: "rainbow",
    theme: rainbowTheme,
  },
  {
    name: "Ghost",
    tags: ["halloween"],
    id: "ghost",
    theme: ghostTheme,
  },
  {
    name: "Pumpkin",
    tags: ["halloween"],
    id: "pumpkin",
    theme: pumpkinTheme,
  },
  {
    name: "Skeleton",
    tags: ["halloween"],
    id: "skeleton",
    theme: skeletonTheme,
  },
  {
    name: "Vampire",
    tags: ["halloween"],
    id: "vampire",
    theme: vampireTheme,
  },
  {
    name: "Zombie",
    tags: ["halloween"],
    id: "zombie",
    theme: zombieTheme,
  },
] as const satisfies ThemeEntry[];
