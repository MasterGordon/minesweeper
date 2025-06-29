import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button } from "./components/Button";
import { motion } from "motion/react";
import {
  GitBranch,
  History,
  Home,
  Library,
  Menu,
  Play,
  Settings,
  Store,
} from "lucide-react";
import Hr from "./components/Hr";
import NavLink from "./components/NavLink";
import { useMediaQuery } from "@uidotdev/usehooks";
import Header from "./components/Header";
import { Tag } from "./components/Tag";
import Feed from "./components/Feed/Feed";

const drawerWidth = 256;
const drawerWidthWithPadding = drawerWidth;

const Shell: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const x = isOpen ? 0 : -drawerWidthWithPadding;
  const width = isOpen ? drawerWidthWithPadding : 0;
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        isMobile
      ) {
        setIsOpen(false);
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.addEventListener("click", onOutsideClick);
    return () => {
      document.removeEventListener("click", onOutsideClick);
    };
  });

  return (
    <div className="bg-black min-h-screen">
      <motion.div
        className="bg-black p-4 fixed h-screen w-64 flex border-white/10 border-1"
        ref={drawerRef}
        animate={{ x }}
        transition={{ type: "tween" }}
      >
        <div
          className="w-full p-2 flex flex-col gap-6"
          onClick={() => {
            if (isMobile) {
              setIsOpen(false);
            }
          }}
        >
          <h2 className="[background:var(--bg-brand)] [-webkit-text-fill-color:transparent] font-black [-webkit-background-clip:text!important] font-mono text-3xl">
            Business
            <br />
            Minesweeper
          </h2>
          <Hr />
          <NavLink href="/">
            <Home />
            Home
          </NavLink>
          <NavLink href="/play">
            <Play />
            Play
          </NavLink>
          <NavLink href="/history">
            <History />
            History
          </NavLink>
          <NavLink href="/store">
            <Store />
            Store
          </NavLink>
          <NavLink href="/collection">
            <Library />
            Collection <Tag size="sm">NEW</Tag>
          </NavLink>
          <NavLink href="/settings">
            <Settings />
            Settings
          </NavLink>
          <Hr />
          <Feed />
          {/* <Hr /> */}
          <div className="grow" />
          <NavLink href="https://github.com/MasterGordon/minesweeper" external>
            <GitBranch />
            Source
          </NavLink>
        </div>
        <div className="relative">
          <Button
            className="absolute left-4 bg-black border-white/10 border-y-1 border-r-1 rounded-l-none"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((isOpen) => !isOpen);
            }}
            aria-label="Menu"
          >
            <Menu />
          </Button>
        </div>
      </motion.div>
      <motion.div className="flex max-w-[100vw]">
        <motion.div
          className="hidden md:block"
          animate={{ width: width }}
          transition={{ type: "tween" }}
          layout
        />
        <motion.div className="flex flex-col gap-4 grow max-w-7xl mx-auto w-[calc(100vw-256px)]">
          <div className="flex flex-col justify-center gap-4 sm:mx-16 mt-16 sm:mt-2 mx-2">
            <Header />
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Shell;
