// socket.ts
import { io } from "socket.io-client";

const socket = io(process.env.BASE_URL as string, {
  path: "/api/socket",
});

export default socket;
