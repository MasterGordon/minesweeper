import { Button } from "./Button";
import Timer from "./Timer";
import Options from "./Options";
import useGameStore from "./GameState";

function App() {
  const game = useGameStore();

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Options />
      <button onClick={() => game.quickStart()}>Quick Start</button>
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
        <pre>Version: 1.0.1</pre>
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
