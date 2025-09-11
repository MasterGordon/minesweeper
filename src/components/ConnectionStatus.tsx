import { useAtom } from "jotai";
import { connectionStatusAtom, type ConnectionStatus as ConnectionStatusType } from "../atoms";
import { Wifi, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const statusConfig: Record<ConnectionStatusType, { color: string; icon: React.ReactNode; label: string }> = {
  connecting: { color: "text-yellow-400", icon: <Wifi className="w-3 h-3" />, label: "Connecting..." },
  connected: { color: "text-green-400", icon: <Wifi className="w-3 h-3" />, label: "Connected" },
  disconnected: { color: "text-red-400", icon: <WifiOff className="w-3 h-3" />, label: "Disconnected" },
  reconnecting: { color: "text-yellow-400", icon: <Wifi className="w-3 h-3" />, label: "Reconnecting..." },
};

export const ConnectionStatus = () => {
  const [status] = useAtom(connectionStatusAtom);
  const config = statusConfig[status];

  // Only show when not connected
  const shouldShow = status !== 'connected';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center gap-1.5 text-xs ${config.color} bg-white/5 px-2 py-1 rounded-md backdrop-blur-sm`}
        >
          <motion.div
            animate={status === 'connecting' || status === 'reconnecting' ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {config.icon}
          </motion.div>
          <span className="font-medium">{config.label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};