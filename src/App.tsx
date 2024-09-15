import { Button } from "./Button";
import Timer from "./Timer";
import explosion from "./sound/explosion.mp3";
import useGameStore from "./GameState";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface Score {
  user: string;
  stage: number;
}

function App() {
  const game = useGameStore();
  const [scores, setScores] = useState<Score[]>([]);
  const [showScores, setShowScores] = useState(false);
  const [playSound] = useSound(explosion, {
    volume: 0.5,
  });

  useEffect(() => {
    if (game.isGameOver) {
      playSound();
    }
  }, [game.isGameOver]);

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

  useEffect(() => {
    game.resetGame(4, 4, 2);
  }, []);

  return (
    <div className="App">
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
      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide" : "Show"} Scores
      </button>
      {showScores && (
        <div>
          {scores.slice(0, 10).map((score) => (
            <p key={score.user}>
              {score.user} - {score.stage}
            </p>
          ))}
        </div>
      )}
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
        <pre>Version: 1.1.3</pre>
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
