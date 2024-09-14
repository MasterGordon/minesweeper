import { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";
import useGameStore from "./GameState";

const Timer = () => {
  const game = useGameStore();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (game.isGameOver || game.getHasWon()) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [game.isGameOver, game.getHasWon()]);

  return (
    <div className="timer">
      <p style={{ width: "100px" }}>{game.getMinesLeft()}</p>
      <p
        style={{
          fontSize: "2rem",
        }}
      >
        {game.getHasWon() ? "😎" : game.isGameOver ? "😢" : "😐"}
        {game.getHasWon() && <Confetti mode="boom" particleCount={301} />}
      </p>
      <p style={{ width: "100px", textAlign: "right" }}>
        {Math.max(0, Math.floor((currentTime - (game.startTime || 0)) / 1000))}
      </p>
    </div>
  );
};

export default Timer;
