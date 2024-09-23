import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { motion } from "framer-motion";
import {
  GitBranch,
  History,
  LayoutDashboard,
  Menu,
  Play,
  Settings,
} from "lucide-react";
import Hr from "./components/Hr";
import NavLink from "./components/NavLink";
import { useMediaQuery } from "@uidotdev/usehooks";
import Header from "./components/Header";

const drawerWidth = 256;
const drawerWidthWithPadding = drawerWidth;

const Shell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const x = isOpen ? 0 : -drawerWidthWithPadding;
  const width = isOpen ? drawerWidthWithPadding : 0;
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="relative bg-black min-h-screen">
      <motion.div
        className="bg-black p-4 absolute h-screen w-64 flex border-white/10 border-1"
        animate={{ x }}
        transition={{ type: "tween" }}
      >
        <div className="w-full p-2 flex flex-col gap-6">
          <h1 className="[background:var(--bg-brand)] [-webkit-text-fill-color:transparent] font-black [-webkit-background-clip:text!important] font-mono text-3xl">
            Minesweeper
            <br />
            Business
          </h1>
          <Hr />
          <NavLink href="/">
            <LayoutDashboard />
            Dashboard
          </NavLink>
          <NavLink href="/play">
            <Play />
            Play
          </NavLink>
          <NavLink href="/history">
            <History />
            History
          </NavLink>
          <NavLink href="/settings">
            <Settings />
            Settings
          </NavLink>
          <Hr />
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
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            <Menu />
          </Button>
        </div>
      </motion.div>
      <motion.div className="flex">
        <motion.div
          animate={{ width: width }}
          transition={{ type: "tween" }}
          layout
        />
        <motion.div className="flex flex-col gap-4 grow max-w-6xl mx-auto">
          <div className="flex flex-col justify-center gap-4 sm:mx-16 mt-16 sm:mt-2 mx-2">
            <Header />
            <div className="bg-gray-950 p-4 rounded-lg w-full"></div>
            <div className="bg-gray-950 p-4 rounded-lg w-full"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Shell;