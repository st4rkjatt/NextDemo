import type { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export type ServerStats = Record<string, number>;
export type UpdateIndicator = "increment" | "decrement";

const hardcodedDatabaseServerStats: ServerStats = {};

export interface NextApiResponseSocketIO extends NextApiResponse {
  socket: NextApiResponse["socket"] & {
    server: HttpServer & {
      io?: SocketServer;
    };
  };
}

const socket = (_: NextApiRequest, res: NextApiResponseSocketIO) => {
  console.log('request come in backend')
  if (!res.socket.server.io) {
    const io = new SocketServer(res.socket.server, {
      path: "/api/socket"
    });
    console.log('socket init')
    io.on("connection", (socket) => {
      console.log(`Connected: ${socket.id}`);
      hardcodedDatabaseServerStats[socket.id] = 0;

      socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);
      });

      // custom 'get-stats' event
      socket.on("get-stats", () => {
        console.log(`Requested stats: ${socket.id}`);
        socket.emit("update-stats", hardcodedDatabaseServerStats);
      });

      // custom 'update' event
      socket.on("update", (val: UpdateIndicator) => {
        console.log(`Updated stats - ${val}: ${socket.id}`);

        hardcodedDatabaseServerStats[socket.id] =
          hardcodedDatabaseServerStats[socket.id] +
          (val === "increment" ? 1 : -1);

        // update all client stats
        io.emit("update-stats", hardcodedDatabaseServerStats);

        // inform all clients except the emitter that they triggered an update
        socket.broadcast.emit("stats-recently-updated-by", socket.id);
      });
    });

    // we can attach this to the response object to expose it to any other
    // /pages/api endpoint that has access to the response
    res.socket.server.io = io;
  }

  res.end();
};

export default socket;
