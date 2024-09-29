import {
  easeInOut,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

interface SectionProps {
  text: string;
  image: string;
  left?: boolean;
}

const Section = ({ text, image, left }: SectionProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const transform = useTransform(scrollYProgress, [0, 1], [-50, 50], {
    ease: easeInOut,
  });
  const translateY = useMotionTemplate`${transform}px`;
  return (
    <div
      className={cn(
        "flex flex-col-reverse md:flex-row gap-8 items-center mx-24",
        left && "md:flex-row-reverse",
      )}
    >
      <p className="text-white/80 text-lg text-center md:w-[50%]">{text}</p>
      <motion.div
        className="md:w-[50%] h-90"
        // float up and down
        animate={{
          translateY: [0, 10, 0],
          translateX: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        <motion.img
          ref={ref}
          style={{
            translateY,
          }}
          transition={{
            type: "just",
            delay: 0.5,
          }}
          src={image}
          className="h-[80%]"
        />
      </motion.div>
    </div>
  );
};

export default Section;
