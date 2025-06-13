import { useMemo } from "react";
import { useWSQuery } from "../../hooks";
import dayjs from "dayjs";

const Profile: React.FC = () => {
  const { data: heatmap } = useWSQuery("user.getHeatmap", { id: "Gordon" });
  const now = useMemo(() => dayjs(), []);
  const firstOfYear = useMemo(
    () => now.set("day", 0).set("month", 0).set("hour", 0).set("minute", 0),
    [now],
  );
  const weeks = now.diff(firstOfYear, "weeks") + 1;
  const maxHeat = heatmap ? Math.max(...heatmap) : 0;

  return (
    <div>
      {heatmap && (
        <div className="flex gap-2">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="w-4 flex gap-2 flex-col">
              {Array.from({ length: 7 }).map((_, d) => (
                <div key={d} className="w-4 h-4 border border-white">
                  <div
                    className="w-4 h-4 bg-purple-600 -m-px"
                    style={{
                      opacity: heatmap[w * 7 + d] / maxHeat,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
