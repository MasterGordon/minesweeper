import { Button } from "./Button";
import Timer from "./Timer";
import explosion from "./sound/explosion.mp3";
import useGameStore from "./GameState";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { loseGame } from "./ws";
import toast, { useToasterStore } from "react-hot-toast";

interface Score {
  user: string;
  stage: number;
}

function useMaxToasts(max: number) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= max) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts, max]);
}

function App() {
  const game = useGameStore();
  const [scores, setScores] = useState<Score[]>([]);
  const [playSound] = useSound(explosion, {
    volume: 0.5,
  });

  useEffect(() => {
    if (game.isGameOver) {
      playSound();
      loseGame(game.name, game.stage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.isGameOver]);
  useEffect(() => {
    game.resetGame(4, 4, 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch("https://mb.gordon.business")
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
      });
    const i = setInterval(() => {
      fetch("https://mb.gordon.business")
        .then((res) => res.json())
        .then((data) => {
          setScores(data);
        });
    }, 2000);
    return () => clearInterval(i);
  }, []);

  useMaxToasts(5);

  return (
    <div className="App">
      {import.meta.env.DEV && (
        <button onClick={() => game.expandBoard()}>Expand</button>
      )}
      <div className="header">
        <div>
          <h1>
            Minesweeper Endless{" "}
            <button onClick={() => game.resetGame(4, 4, 2)}>Reset</button>
          </h1>
          <p>
            Name:{" "}
            <input
              value={game.name}
              onChange={(e) => game.setName(e.target.value)}
            />
          </p>
          <p>
            Feed:{" "}
            <button
              onClick={() => game.setShowFeed(!game.showFeed)}
              style={{ padding: "0.5rem" }}
            >
              {game.showFeed ? "Shown" : "Hidden"}
            </button>
          </p>
        </div>
        <div className="scores">
          {scores.slice(0, 10).map((score) => (
            <p key={score.user}>
              {score.user} - {score.stage}
            </p>
          ))}
        </div>
      </div>
      <div className="game-wrapper">
        <div>
          <Timer />
          <div
            className="game-board"
            style={{
              gridTemplateColumns: `repeat(${game.getWidth()}, 1fr)`,
              gridTemplateRows: `repeat(${game.getHeight()}, 1fr)`,
            }}
          >
            {game.mines[0].map((_, y) =>
              game.mines.map((_, x) => (
                <Button key={`${x},${y}`} x={x} y={y} />
              )),
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        <pre>Version: 1.1.6</pre>
        <pre>
          Made by MasterGordon -{" "}
          <a target="_blank" href="https://github.com/MasterGordon/minesweeper">
            Source Code
          </a>
        </pre>
      </div>
    </div>
  );
}

export default App;
