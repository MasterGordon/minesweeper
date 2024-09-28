import { defaultTheme } from "../../themes/default";
import Board from "../../components/Board";
import toast from "react-hot-toast";
import { useWSMutation, useWSQuery } from "../../hooks";
import { useAtom } from "jotai";
import { gameIdAtom } from "../../atoms";
import { Button } from "../../components/Button";

const Endless = () => {
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const { data: game } = useWSQuery("game.getGameState", gameId!, !!gameId);
  const startGame = useWSMutation("game.createGame");
  const reveal = useWSMutation("game.reveal");

  return (
    <>
      <div className="w-full flex flex-col text-white/90 gap-4">
        <h1>Endless</h1>
        <p>A game where you have to click on the mines</p>
        <div className="flex gap-4">
          <Button
            onClick={async () => {
              const gameId = await startGame.mutateAsync(null);
              setGameId(gameId.uuid);
            }}
          >
            Start
          </Button>
        </div>
      </div>
      {game && (
        <Board
          key={game.uuid}
          theme={defaultTheme}
          game={game}
          onLeftClick={(x, y) => {
            reveal.mutateAsync({ x, y });
          }}
          onRightClick={(x, y) => {
            toast.success(`Right click ${x},${y}`);
          }}
        />
      )}
    </>
  );
};

export default Endless;
