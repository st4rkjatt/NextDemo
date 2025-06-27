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
const userSocketMap = new Map(); // Maps user IDs to socket IDs

const socket = (_: NextApiRequest, res: NextApiResponseSocketIO) => {
  console.log('request come in backend')
  if (!res.socket.server.io) {
    const io = new SocketServer(res.socket.server, {
      path: "/api/socket"
    });
    console.log('socket init')
    io.on("connection", (socket) => {
      console.log(`Socket connected ${socket.id}`);
      hardcodedDatabaseServerStats[socket.id] = 0;

      socket.on("disconnect", () => {
        // Remove the user from the map on disconnect
        const entries = userSocketMap.entries();
        for (const [userId, socketId] of entries) {
          if (socketId === socket.id) {
            userSocketMap.delete(userId);
            break;
          }
        }
        console.log(`User disconnected: ${socket.id}`);
      });

      //  ************************** custom 'sendMessage' event***************************
      socket.on("registerUser", ({ userId }) => {
        userSocketMap.set(userId, socket.id)
        console.log(`Registered user ${userId} with socket ${socket.id}`);
      })


      socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const data = {
          senderId,
          receiverId,
          message
        }
        console.log(data, 'send data')

        const recipientSocketId = userSocketMap.get(receiverId)
        console.log(recipientSocketId, 'recipientSocket?')

        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveMessage", data);
        } else {
          console.log("Recipient not connected");
        }
      });
      socket.on("typing", ({ senderId, receiverId }) => {
        const data = {
          senderId,
          receiverId,
        }
        const recipientSocketId = userSocketMap.get(receiverId)
        console.log(recipientSocketId, 'typing?')

        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveTyping", data);
        } else {
          console.log("Recipient not connected");
        }
      });

      socket.on("sendFriendRequest", (data) => {
        console.log(data, 'data friedn re')
        const recipientSocketId = userSocketMap.get(data.to)
        console.log(recipientSocketId, 'recipientSocket?')
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveFriendRequest", data);
        } else {
          console.log("Recipient not connected");
        }
      })
      socket.on("acceptFriendRequest", (data) => {
        console.log(data, 'accept friedn')
        const recipientSocketId = userSocketMap.get(data.to)
        console.log(recipientSocketId, 'recipientSocket?')
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveAcceptFriendRequest", data);
        } else {
          console.log("Recipient not connected");
        }
      })

      //************************* */ for video call************************************
      socket.on("callUser", (data) => {

        const recipientSocketId = userSocketMap.get(data.userToCall);

        console.log(recipientSocketId, 'recipientSocket? callUser')

        const send = io.to(recipientSocketId).emit("hey", {
          signal: data.signalData,
          from: data.from,
          fromName: data.fromName
        });

        if (send) {
          console.log('send call to user')
        } else {
          console.log("Recipient not connected");
        }
      })

      socket.on("endCall", ({to}) => {
        console.log(to, 'end call')
        const recipientSocketId = userSocketMap.get(to);
        console.log(recipientSocketId, 'recipientSocket? endCall')
        io.to(recipientSocketId).emit("callEnded");

      })


      socket.on("acceptCall", (data) => {
        // Find the socket ID of the user who is accepting the call
        const recipientSocketId = userSocketMap.get(data.to);
        console.log(recipientSocketId, 'recipientSocket? acceptCall')
        const ans = io.to(recipientSocketId).emit('callAccepted', data.signal);
        if (ans) {
          console.log('send call to user')
        } else {
          console.log("Recipient not connected");
        }
      })


      socket.on("rejectCall", (data) => {
        console.log(data, 'reject call')
        // Find the socket ID of the user who is rejecting the call 
        const recipientSocketId = userSocketMap.get(data.to);
        console.log(recipientSocketId, 'recipientSocket? rejectCall')
        io.to(recipientSocketId).emit("callRejected");
      });

    });

    // we can attach this to the response object to expose it to  other
    // /pages/api endpoint that has access to the response
    res.socket.server.io = io;
  }

  res.end();
};

export default socket;
