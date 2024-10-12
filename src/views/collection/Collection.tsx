import { testBoard } from "../../../shared/testBoard";
import Board from "../../components/Board";
import { themes } from "../../themes";

const Collection = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-white/90 text-xl">Collection</h2>
      <div className="flex flex-row gap-y-4 gap-x-8 items-center w-full flex-wrap justify-center mb-10">
        {themes.map((theme) => (
          <div key={theme.id}>
            <h3 className="text-white/90 text-lg">{theme.name}</h3>
            <Board
              game={testBoard}
              theme={theme.theme}
              onLeftClick={() => {}}
              restartGame={() => {}}
              onRightClick={() => {}}
              width={11 * 32}
              height={4 * 32}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
