import { Ellipsis } from "lucide-react";
import { testBoard } from "../../../shared/testBoard";
import Board from "../../components/Board";
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
          const owned = collection?.entries.some(
            (e) => e.id === theme.id && e.selected,
          );
          return (
            <div key={theme.id}>
              <div className="flex gap-4 justify-between">
                <h3 className="text-white/90 text-lg">
                  {theme.name}
                  {owned && (
                    <span className="text-white/70 text-sm"> (Owned)</span>
                  )}
                </h3>
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
                        mutateShuffle.mutateAsync({ id: theme.id })
                      }
                    >
                      {" "}
                      Add to shuffle
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Board
                game={testBoard}
                theme={theme.theme}
                onLeftClick={() => {}}
                restartGame={() => {}}
                onRightClick={() => {}}
                width={11 * 32}
                height={4 * 32}
                className={cn(
                  selected && "outline-primary outline-4 rounded-md",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
