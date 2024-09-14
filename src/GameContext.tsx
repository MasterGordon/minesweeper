import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Game } from "./Game";
import useSound from "use-sound";
import explosion from "./sound/explosion.mp3";

const GameContext = createContext<Game | null>(null);
const useGame = () => useContext(GameContext);

let updateGame: (cb: (game: Game) => void) => void;
let resetGame: (width: number, height: number, mines: number) => void;

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [counter, setCounter] = useState(0);
  const [playSound] = useSound(explosion, {
    volume: 0.5,
  });

  useEffect(() => {
    if (game?.isGameOver) {
      playSound();
    }
  }, [game?.isGameOver]);

  useEffect(() => {
    const game = new Game(30, 20, 100);
    setGame(game);
    updateGame = (cb: (game: Game) => void) => {
      cb(game);
      setCounter((c) => c + 1);
    };
    resetGame = (width: number, height: number, mines: number) => {
      const game = new Game(width, height, mines);
      setGame(game);
      updateGame = (cb: (game: Game) => void) => {
        cb(game);
        setCounter((c) => c + 1);
      };
    };
  }, []);
  return (
    <GameContext.Provider key={counter} value={game}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, useGame, updateGame, resetGame };
