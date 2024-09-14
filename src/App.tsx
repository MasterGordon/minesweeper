import { Button } from "./Button";
import { useGame } from "./GameContext";
import Timer from "./Timer";
import Options from "./Options";

function App() {
  const game = useGame();

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Options />
      <div className="game-wrapper">
        <div>
          <Timer />
          <div
            className="game-board"
            style={{
              gridTemplateColumns: `repeat(${game?.getWidth()}, 1fr)`,
              gridTemplateRows: `repeat(${game?.getHeight()}, 1fr)`,
            }}
          >
            {game?.mines[0].map((_, y) =>
              game?.mines.map((_, x) => (
                <Button key={`${x},${y}`} x={x} y={y} />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
