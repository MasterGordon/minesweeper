import { useState } from "react";
import { resetGame, useGame } from "./GameContext";

function Options() {
  const game = useGame();
  const [width, setWidth] = useState(game?.getWidth() || 20);
  const [height, setHeight] = useState(game?.getHeight() || 20);
  const [mines, setMines] = useState(game?.minesCount || 20);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? "Hide" : "Show"} Options
      </button>
      {showOptions && (
        <>
          <p>
            Width:{" "}
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </p>
          <p>
            Height:{" "}
            <input
              type="number"
              value={height}
              max="40"
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </p>
          <p>
            Mines:{" "}
            <input
              type="number"
              value={mines}
              max="40"
              onChange={(e) => setMines(Number(e.target.value))}
            />
          </p>
        </>
      )}
      <button
        onClick={() => {
          resetGame(width, height, mines);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Options;
