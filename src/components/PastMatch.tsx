import { Link } from "wouter";
import type { ServerGame } from "../../shared/game";
import { formatRelativeTime, formatTimeSpan } from "../../shared/time";
import { Button } from "./Button";

interface PastMatchProps {
  game: ServerGame;
}

const PastMatch = ({ game }: PastMatchProps) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full @container">
      <div className="w-full bg-white/10 border-white/20 border-1 rounded-md grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <div className="flex-col flex">
          <div className="text-white/90 text-lg">Endless</div>
          <div className="text-white/50 text-lg">
            {formatRelativeTime(game.finished)}
          </div>
        </div>
        <div className="text-white/90 text-lg">
          <div>Stage {game.stage}</div>
          <div>
            Mines Remaining:{" "}
            {game.minesCount - game.isFlagged.flat().filter((f) => f).length}
          </div>
        </div>
        <div className="text-white/80 text-lg hidden lg:block">
          <div>Duration: {formatTimeSpan(game.finished - game.started)}</div>
        </div>
        <div className="flex justify-center sm:justify-end col-span-full sm:col-span-1">
          {/* @ts-expect-error as is cheaply typed */}
          <Button as={Link} href={`/play/${game.uuid}`} variant="outline">
            Show Board
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PastMatch;
