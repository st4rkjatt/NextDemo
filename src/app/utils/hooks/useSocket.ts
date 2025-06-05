import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type UseSocketReturn = {
  socketId: string | null;
  isConnected: boolean;
  error: any;
};

const useSocket = (socket: Socket | any): UseSocketReturn => {
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("✅ Connected:", socket.id);
      setSocketId(socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🚫 Disconnected");
      setIsConnected(false);
      setSocketId(null);
    };

    const handleError = (err: any) => {
      console.error("❌ Socket error:", err);
      setError(err);
    };

    const handleReceiveMessage = (data: any) => {
      console.log("📩 Message received:", data);
      // You can set state or update UI here
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("error", handleError);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("error", handleError);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]); // Depend on socket object itself

  return {
    socketId,
    isConnected,
    error,
  };
};

export default useSocket;
