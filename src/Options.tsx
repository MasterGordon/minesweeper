import { useEffect, useState } from "react";
import useGameStore from "./GameState";

const presets = {
  Easy: { width: 10, height: 10, mines: 20 },
  Medium: { width: 16, height: 16, mines: 32 },
  Expert: { width: 30, height: 16, mines: 99 },
  "Max Mode": { width: 40, height: 40, mines: 350 },
} as const;

function Options() {
  const game = useGameStore();
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [mines, setMines] = useState(32);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fixWidth = Math.min(40, width);
    const fixHeight = Math.min(40, height);
    setWidth(fixWidth);
    setHeight(fixHeight);
  }, [width, height]);

  useEffect(() => {
    if (!game.isTouched()) {
      if (width <= 0 || height <= 0 || mines <= 0) {
        return;
      }
      game.resetGame(width, height, mines);
    }
  }, [width, height, mines]);

  return (
    <div>
      <button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? "Hide" : "Show"} Options
      </button>
      {showOptions && (
        <>
          <p>
            Presets:{" "}
            {(Object.keys(presets) as Array<keyof typeof presets>).map(
              (key) => (
                <button
                  key={key}
                  onClick={() => {
                    const { width, height, mines } = presets[key];
                    setWidth(width);
                    setHeight(height);
                    setMines(mines);
                  }}
                >
                  {key}
                </button>
              ),
            )}
          </p>
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
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </p>
          <p>
            Mines:{" "}
            <input
              type="number"
              value={mines}
              onChange={(e) => setMines(Number(e.target.value))}
            />
          </p>
        </>
      )}
      <button
        onClick={() => {
          game.resetGame(width, height, mines);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Options;
