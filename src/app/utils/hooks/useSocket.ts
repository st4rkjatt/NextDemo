import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

/**
 * Due to the socket object depending on events triggering from the socket.on()
 * event emitter, this is not a native react implementation and therefore does
 * not force the react component to re-render
 *
 * By leveraging stateful hooks we can control when a react component will
 * trigger a re-render
 *
 * Note: The states maintained by this hook could have also just been
 * states living inside the values of SocketContext.Provider but this demo
 * was intended to represent a few ways to tackle all this abstractly using both
 * hooks and context providers
 */
const useSocket = (socket: Socket | any) => {
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setSocketId(socket.id);
        setIsConnected(true);
      });

      socket.on("error", (error:any) => {
        setError(error);
        console.error("Something went wrong and the socket errored!", error);
      });

      // any additional common socket.on() events can be placed here with
      // a controlled exposed state using setState; I would not put custom
      // events inside this hook as it's purpose is mostly for connection state
      // react lifecycle sync and error handling
    } else {
      setSocketId(null);
      setIsConnected(false);
      setError(null);
    }
  }, [socket]);

  return {
    socketId,
    isConnected,
    error
  };
};

export default useSocket;
