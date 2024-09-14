import { createContext, ReactNode, useContext, useEffect } from "react";
import { Game } from "./Game";
import useSound from "use-sound";
import explosion from "./sound/explosion.mp3";
import useGameStore from "./GameState";

const GameContext = createContext<Game | null>(null);
const useGame = () => useContext(GameContext);

let updateGame: (cb: (game: Game) => void) => void;
let resetGame: (width: number, height: number, mines: number) => void;

const GameProvider = ({ children }: { children: ReactNode }) => {
  const game = useGameStore();
  const [playSound] = useSound(explosion, {
    volume: 0.5,
  });

  useEffect(() => {
    if (game.isGameOver) {
      playSound();
    }
  }, [game.isGameOver]);
  return children;
};

export { GameProvider, useGame, updateGame, resetGame };
