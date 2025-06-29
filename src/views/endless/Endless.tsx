import { useWSMutation, useWSQuery } from "../../hooks";
import { useAtom } from "jotai";
import { gameIdAtom } from "../../atoms";
import { Button } from "../../components/Button";
import LeaderboardButton from "../../components/LeaderboardButton";
import { Fragment, startTransition, Suspense, useEffect } from "react";
import { Board } from "../../components/LazyBoard";

interface EndlessProps {
  gameId?: string;
}

const Endless: React.FC<EndlessProps> = (props) => {
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const { data: game } = useWSQuery("game.getGameState", gameId!, !!gameId);
  const { data: settings } = useWSQuery("user.getSettings", null);
  const startGame = useWSMutation("game.createGame");
  const { data: leaderboard } = useWSQuery("scoreboard.getScoreBoard", 100);
  const reveal = useWSMutation("game.reveal");
  const placeFlag = useWSMutation("game.placeFlag");
  const placeQuestionMark = useWSMutation("game.placeQuestionMark");
  const clearTile = useWSMutation("game.clearTile");

  useEffect(() => {
    if (props.gameId) {
      setGameId(props.gameId);
    }
    return () => {
      setGameId(undefined);
    };
  }, [props.gameId, setGameId]);

  return game ? (
    <>
      <div className="w-full flex text-white/90 gap-4">
        <div className="w-full h-full text-white/70 font-mono text-lg flex items-center">
          {game.minesCount - game.isFlagged.flat().filter((f) => f).length}
          {" | "}
          Stage {game.stage}
        </div>
        <div className="grow" />
        <LeaderboardButton label="View Leaderboard" />
      </div>
      <Suspense>
        <Board
          game={game}
          restartGame={async () => {
            const gameId = await startGame.mutateAsync(null);
            setGameId(gameId.uuid);
          }}
          onLeftClick={(x, y) => {
            reveal.mutateAsync({ x, y });
          }}
          onRightClick={(x, y) => {
            const isFlagged = game.isFlagged[x][y];
            const isQuestionMark = game.isQuestionMark[x][y];
            if (!isFlagged && !isQuestionMark) {
              placeFlag.mutateAsync({ x, y });
              return;
            }
            if (isFlagged && settings?.placeQuestionMark) {
              placeQuestionMark.mutateAsync({ x, y });
              return;
            } else {
              clearTile.mutateAsync({ x, y });
              return;
            }
          }}
        />
      </Suspense>
    </>
  ) : (
    <div className="w-full grid md:grid-cols-[350px_1fr]">
      <div className="flex flex-col md:border-r-white/10 md:border-r-1 gap-8 pr-12">
        <h2 className="text-white/90 text-xl">Minesweeper Endless</h2>
        <Button
          className="w-fit"
          variant="primary"
          onClick={async () => {
            const gameId = await startGame.mutateAsync(null);
            startTransition(() => {
              setGameId(gameId.uuid);
            });
          }}
        >
          Start Game
        </Button>
        <h2 className="text-white/80 text-lg mt-8">How to play</h2>
        <p className="text-white/90">
          Endless minesweeper is just like regular minesweeper but you
          can&apos;t win. Every time you clear the field you just proceed to the
          next stage. Try to get as far as possible. You might be rewarded for
          great performance!
          <br />
          <br />
          Good luck!
        </p>
      </div>
      <div className="flex flex-col gap-4 pl-12">
        <h2 className="w-full text-center text-lg text-white/90">
          Leaderboard
        </h2>
        <div className="grid grid-cols-[min-content_2fr_1fr] grid-border-b">
          {new Array(10).fill(0).map((_, i) => (
            <Fragment key={i}>
              <div className="p-4 text-white/80 text-right">{i + 1}.</div>
              <div className="p-4 text-white/90">
                {leaderboard?.[i]?.user ?? "No User"}
              </div>
              <div className="p-4 text-white/90">
                Stage {leaderboard?.[i]?.stage ?? 0}
              </div>
            </Fragment>
          ))}
        </div>
        <LeaderboardButton />
      </div>
    </div>
  );
};

export default Endless;
