import { Fragment } from "react";
import { useWSQuery } from "../hooks";
import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

interface LeaderboardButtonProps {
  label?: string;
}

const LeaderboardButton = ({
  label = "View Full Leaderboard",
}: LeaderboardButtonProps) => {
  const { data: leaderboard } = useWSQuery("scoreboard.getScoreBoard", 100);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit text-white/80 self-center whitespace-nowrap" variant="outline">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leaderboard</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[min-content_2fr_1fr] grid-border-b">
          {leaderboard?.map((_, i) => (
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
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardButton;
