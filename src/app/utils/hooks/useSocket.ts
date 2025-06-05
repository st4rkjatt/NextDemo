import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type UseSocketReturn = {
  socketId: string | null;
  isConnected: boolean;
  error: unknown;
};

const useSocket = (socket: Socket | null): UseSocketReturn => {
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("✅ Connected:", socket.id);
      setSocketId(socket.id ?? null);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🚫 Disconnected");
      setIsConnected(false);
      setSocketId(null);
    };

    const handleError = (err: unknown) => {
      console.error("❌ Socket error:", err);
      setError(err);
    };

    const handleReceiveMessage = (data: unknown) => {
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
