"use client"
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../containers/SocketProvider";
import useSocket from "../utils/hooks/useSocket";
import { ServerStats } from "../../pages/api/socket";



const StatsTracker = () => {
  const { socket } = useContext(SocketContext);
  const { isConnected } = useSocket(socket);
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [recentlyUpdatedBy, setRecentlyUpdatedBy] = useState("");

  // update stats on event update-stats and the 'recently updated by' info
  useEffect(() => {
    if (socket) {
      socket.on("update-stats", (updatedStats: Record<string, number>) => {
        setStats(updatedStats);
      });

      socket.on("stats-recently-updated-by", (updatedBy: string) => {
        setRecentlyUpdatedBy(updatedBy);

        // clear recently updated by
        setTimeout(() => {
          setRecentlyUpdatedBy("");
        }, 2000);
      });
    }
  }, [socket]);

  // request initial stats when stats are initially `null` and socket is established
  useEffect(() => {
    if (!stats && socket) {
      socket.emit("get-stats");
    }
  }, [stats, socket]);

  return (
    <>
      {!isConnected && <h4>Stat tracker is disconnected</h4>}
      {isConnected && <pre>{JSON.stringify(stats, null, 2)}</pre>}
      {recentlyUpdatedBy && (
        <h2>Stats were recently updated by ${recentlyUpdatedBy}</h2>
      )}
    </>
  );
};

export default StatsTracker;
