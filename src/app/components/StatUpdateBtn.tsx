"use client"
import { useContext } from "react";
import { UpdateIndicator } from "../../pages/api/socket";
import { SocketContext } from "../containers/SocketProvider";
import useSocket from "../utils/hooks/useSocket";



interface StatUpdateBtnProps {
  text: string;
  update: UpdateIndicator;
}
const StatUpdateBtn: React.FC<StatUpdateBtnProps> = ({ text, update }) => {
  const { socket } = useContext(SocketContext);
  const { isConnected } = useSocket(socket);

  return isConnected && socket ? (
    <button type="button" onClick={() => socket.emit("update", update)}>
      {text}
    </button>
  ) : null;
};

export default StatUpdateBtn;
