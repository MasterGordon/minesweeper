import { Tag } from "./Tag";
import GemsIcon from "./GemIcon";

interface GemsProps {
  count: number;
}

const Gems: React.FC<GemsProps> = ({ count }) => {
  return (
    <Tag variant="outline2" className="flex gap-1 items-center">
      <span className="text-white/90">{count}</span>
      <GemsIcon />
    </Tag>
  );
};

export default Gems;
