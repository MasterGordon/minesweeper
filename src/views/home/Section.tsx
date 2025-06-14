import {
  easeInOut,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface SectionProps {
  text: string;
  image: OutputMetadata[];
  left?: boolean;
}

const Section = ({ text, image, left }: SectionProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (wrapperRef.current) {
        setWidth(wrapperRef.current.clientWidth);
      }
    });
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);
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
          // translate: ["0 0", "5 10", "0 0"],
          // transform: ["translate"]
          x: [0, 10, 0],
          y: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        <div
          ref={wrapperRef}
          style={{
            aspectRatio: `${image[0].width / image[0].height}`,
          }}
          className="h-[80%] min-h-36"
        >
          <motion.img
            alt=""
            ref={ref}
            style={{
              translateY,
            }}
            transition={{
              type: "spring",
              delay: 0.5,
            }}
            srcSet={image.map((i) => `${i.src} ${i.width}w`).join(", ")}
            sizes={`${width}px`}
            loading="lazy"
            className="h-[80%]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Section;
