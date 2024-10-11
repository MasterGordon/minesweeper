import { useInfiniteGames, useWSQuery } from "../../hooks";
import PastMatch from "../../components/PastMatch";
import { useEffect, useRef } from "react";

const MatchHistory = () => {
  const { data: user } = useWSQuery("user.getSelf", null);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGames(user);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    });
    const target = loadMoreRef.current;
    if (target) {
      intersectionObserver.observe(target);
    }
    return () => {
      if (target) {
        intersectionObserver.unobserve(target);
      }
    };
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {data?.pages.map((page) =>
        page.data.map((game) => <PastMatch key={game.uuid} game={game} />),
      )}
      {hasNextPage && (
        <div
          className="text-white/80 flex justify-center w-full"
          ref={loadMoreRef}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default MatchHistory;
