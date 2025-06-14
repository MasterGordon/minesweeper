import { useMemo } from "react";
import { useWSQuery } from "../../hooks";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/Tooltip";
import PastMatch from "../../components/PastMatch";

const Profile: React.FC = () => {
  const { data: username } = useWSQuery("user.getSelf", null);
  const { data: heatmap } = useWSQuery(
    "user.getHeatmap",
    { id: username! },
    !!username,
  );
  const { data: profile } = useWSQuery(
    "user.getProfile",
    { id: username! },
    !!username,
  );
  const { data: pastGames } = useWSQuery(
    "game.getGames",
    {
      user: username!,
      page: 0,
    },
    !!username,
  );
  const now = useMemo(() => dayjs(), []);
  const firstOfYear = useMemo(() => now.startOf("year"), [now]);
  const weeks = now.diff(firstOfYear, "weeks") + 1;
  const maxHeat = heatmap ? Math.max(...heatmap) : 0;

  return (
    <div className="grid md:[grid-template-columns:_2fr_3fr] gap-6">
      <div className="m-8 text-white flex self-center">
        <div className="p-2 flex items-center text-2xl">{username}</div>
        <div className="border-l-white border-l p-2 text-lg">
          <p>Total Games: {profile?.totalGames}</p>
          <p>Highest Stage: {profile?.highestStage}</p>
          <p>Average Stage: {profile?.averageStage}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {pastGames?.data
          .slice(0, 4)
          .map((game) => <PastMatch key={game.uuid} game={game} />)}
      </div>
      {heatmap && (
        <div className="col-span-full">
          <h2 className="text-white text-2xl font-semibold mb-4">Activity</h2>
          <div className="flex gap-2 ">
            {Array.from({ length: weeks }).map((_, w) => (
              <div key={w} className="w-6 flex gap-2 flex-col">
                {Array.from({ length: 7 }).map((_, d) => {
                  const index = w * 7 + d;
                  if (index >= heatmap.length) return;
                  return (
                    <Tooltip key={d}>
                      <TooltipTrigger>
                        <div className="w-5 h-5 border border-white">
                          <div
                            className="w-5 h-5 bg-brand -m-px"
                            style={{
                              opacity: heatmap[index] / maxHeat,
                            }}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {firstOfYear
                            .clone()
                            .add(index, "days")
                            .format("DD/MM/YYYY")}
                        </p>
                        <p>{heatmap[index]} Games Played</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
