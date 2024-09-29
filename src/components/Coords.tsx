import { useAtom } from "jotai";
import { cursorXAtom, cursorYAtom } from "../atoms";

const Coords = () => {
  const [cursorX] = useAtom(cursorXAtom);
  const [cursorY] = useAtom(cursorYAtom);
  return (
    <div className="text-xs text-white/70">
      {cursorX},{cursorY}
    </div>
  );
};

export default Coords;
