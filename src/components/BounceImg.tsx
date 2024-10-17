import { animate, motion } from "framer-motion";
import { useRef } from "react";

const BounceImg = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLImageElement>(null);
  return (
    <motion.img
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
      transition={{
        type: "spring",
      }}
      className={className}
    />
  );
};

export default BounceImg;
