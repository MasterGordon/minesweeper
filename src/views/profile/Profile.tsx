import { useMemo, useRef, useEffect, useState } from "react";
import { useWSQuery } from "../../hooks";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/Tooltip";
import PastMatch from "../../components/PastMatch";
import GemsIcon from "../../components/GemIcon";

const TouchTooltip = ({
  children,
  date,
  games,
}: {
  children: React.ReactNode;
  date: string;
  games: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timeoutRef = useRef<Timer>();

  useEffect(() => {
    // Detect if device supports touch
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouch = () => {
    if (isTouchDevice) {
      setIsOpen(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsOpen(false), 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // For touch devices, use controlled tooltip
  if (isTouchDevice) {
    return (
      <Tooltip open={isOpen}>
        <TooltipTrigger
          asChild
          onClick={handleTouch}
          onTouchStart={handleTouch}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{date}</p>
          <p>{games} Games Played</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  // For non-touch devices, use default hover behavior
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{date}</p>
        <p>{games} Games Played</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Profile: React.FC = () => {
  const [availableWeeks, setAvailableWeeks] = useState(16); // Default to 4 months
  const containerRef = useRef<HTMLDivElement>(null);
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
  const maxHeat = heatmap ? Math.max(...heatmap) : 0;

  // Calculate available space and adjust weeks accordingly
  useEffect(() => {
    const calculateAvailableWeeks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const isMobile = window.innerWidth < 640; // sm breakpoint

      // Calculate dot and gap sizes based on breakpoint
      const dotWidth = isMobile ? 16 : 24; // w-4 = 16px, w-6 = 24px
      const gapSize = isMobile ? 4 : 8; // gap-1 = 4px, gap-2 = 8px

      // Each week takes: dotWidth + gapSize
      const weekWidth = dotWidth + gapSize;

      // Calculate max weeks that fit, with some padding
      const maxWeeks = Math.floor((containerWidth - 32) / weekWidth); // 32px for padding

      // Limit between 4 weeks (1 month) and 26 weeks (6 months)
      const weeks = Math.max(4, Math.min(26, maxWeeks));

      setAvailableWeeks(weeks);
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(calculateAvailableWeeks, 0);

    window.addEventListener("resize", calculateAvailableWeeks);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateAvailableWeeks);
    };
  }, []);

  // Additional effect to recalculate when heatmap data is available
  useEffect(() => {
    if (heatmap && containerRef.current) {
      const timer = setTimeout(() => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const isMobile = window.innerWidth < 640;

        const dotWidth = isMobile ? 16 : 24;
        const gapSize = isMobile ? 4 : 8;
        const weekWidth = dotWidth + gapSize;
        const maxWeeks = Math.floor((containerWidth - 32) / weekWidth);
        const weeks = Math.max(4, Math.min(26, maxWeeks));

        setAvailableWeeks(weeks);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [heatmap]);

  return (
    <div className="grid md:[grid-template-columns:_2fr_3fr] gap-6 px-2 sm:px-0">
      <div className="mx-4 my-8 md:m-8 text-white flex flex-col sm:flex-row self-center">
        <div className="p-2 flex items-center text-2xl mb-2 sm:mb-0">
          {username}
        </div>
        <div className="border-l-0 sm:border-l-white sm:border-l p-2 text-lg">
          <p>Total Games: {profile?.totalGames}</p>
          <p>Highest Stage: {profile?.highestStage}</p>
          <p>
            Average Stage: {Math.round(profile?.averageStage ?? 1 * 100) / 100}
          </p>
          <p>
            Gems Spend:{" "}
            {(profile?.totalGems ?? 0) - (profile?.currentGems ?? 0)}{" "}
            <GemsIcon />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {pastGames?.data
          .slice(0, 4)
          .map((game) => <PastMatch key={game.uuid} game={game} />)}
      </div>
      {heatmap && (
        <div className="col-span-full mb-8">
          <h2 className="text-white text-2xl font-semibold mb-4">Activity</h2>
          <div className="overflow-x-auto" ref={containerRef}>
            <div className="flex gap-1 sm:gap-2 min-w-fit">
              {Array.from({ length: availableWeeks }).map((_, w) => (
                <div
                  key={w}
                  className="w-4 sm:w-6 flex gap-1 sm:gap-2 flex-col"
                >
                  {Array.from({ length: 7 }).map((_, d) => {
                    const index =
                      heatmap.length - availableWeeks * 7 + (w * 7 + d);
                    if (index < 0 || index >= heatmap.length) return;
                    const date = now
                      .clone()
                      .subtract(availableWeeks * 7 - 1 - (w * 7 + d), "days")
                      .format("DD/MM/YYYY");
                    return (
                      <TouchTooltip key={d} date={date} games={heatmap[index]}>
                        <button
                          className="w-3 h-3 sm:w-5 sm:h-5 border border-white touch-manipulation"
                          type="button"
                        >
                          <div
                            className="w-3 h-3 sm:w-5 sm:h-5 bg-brand -m-px pointer-events-none"
                            style={{
                              opacity: heatmap[index] / maxHeat,
                            }}
                          />
                        </button>
                      </TouchTooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
