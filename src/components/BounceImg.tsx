import { animate } from "motion";
import { useRef } from "react";

const BounceImg = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLImageElement>(null);
  return (
    <img
      ref={ref}
      src={src}
      onClick={() => {
        if (ref.current) {
          animate(ref.current, { scale: 1.2 }, { duration: 0.3 });
          setTimeout(() => {
            if (ref.current)
              animate(ref.current, { scale: 1 }, { duration: 0.3 });
          }, 300);
        }
      }}
      className={className}
    />
  );
};

export default BounceImg;
