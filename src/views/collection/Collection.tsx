import { Ellipsis } from "lucide-react";
import { testBoard } from "../../../shared/testBoard";
import { Board } from "../../components/LazyBoard";
import { Button } from "../../components/Button";
import { themes } from "../../themes";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../../components/DropdownMenu";
import { cn } from "../../lib/utils";
import { useWSMutation, useWSQuery } from "../../hooks";
import { Suspense } from "react";

const Collection = () => {
  const { data: collection, refetch } = useWSQuery(
    "user.getOwnCollection",
    null,
  );
  const mutateSelected = useWSMutation("user.selectCollectionEntry");
  const mutateShuffle = useWSMutation("user.addCollectionEntryToShuffle");

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-white/90 text-xl">Collection</h2>
      <div className="flex flex-row gap-y-6 gap-x-8 items-center w-full flex-wrap justify-center mb-10">
        {themes.map((theme) => {
          const selected = collection?.entries.some(
            (e) => e.id === theme.id && e.selected,
          );
          const owned = collection?.entries.some((e) => e.id === theme.id);
          const times =
            collection?.entries.filter((e) => e.id === theme.id).length || 0;
          if (!owned) return null;
          return (
            <div key={theme.id}>
              <div className="flex gap-4 justify-between">
                <h3 className="text-white/90 text-lg">
                  {theme.name}
                  {owned && (
                    <span className="text-white/70 text-sm">
                      {" "}
                      (Owned{times > 1 && ` ${times}x`})
                    </span>
                  )}
                </h3>
                {owned && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Ellipsis className="size-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={-12}>
                      <DropdownMenuItem
                        onClick={() => {
                          mutateSelected
                            .mutateAsync({ id: theme.id })
                            .then(() => refetch());
                        }}
                      >
                        Select
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          mutateShuffle
                            .mutateAsync({ id: theme.id })
                            .then(() => refetch())
                        }
                      >
                        {" "}
                        Add to shuffle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Suspense>
                <Board
                  game={testBoard(theme.id)}
                  onLeftClick={() => {}}
                  restartGame={() => {}}
                  onRightClick={() => {}}
                  width={11 * 32}
                  height={4 * 32}
                  className={cn(
                    selected && "outline-primary outline-4 rounded-md",
                  )}
                />
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
