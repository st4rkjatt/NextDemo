"use client"
import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import useSocket from "../utils/hooks/useSocket";



export interface SocketContextValues {
    socket: Socket | null;
}
export const SocketContext = createContext<SocketContextValues>({
    socket: null
});

interface SocketProviderProps {
    autoConnect?: boolean;
    children: React.ReactNode;
}
const SocketProvider: React.FC<SocketProviderProps> = ({
    autoConnect = false,
    children
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { socketId, isConnected } = useSocket(socket);

    // initialize connection with api
    useEffect(() => {
        console.log('init ')
        const socket = io(process.env.BASE_URL as string, {
            path: "/api/socket",
            autoConnect
        });
        console.log(socket, 'socket')
        // set socket to local state to be passed into SocketContext.Provider
        setSocket(socket);

        // disconnect socket on component unmount
        return () => {
            console.log('socket disconnect.')
            socket.disconnect();
        };
    }, [autoConnect]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {socket && (
                <>
                    {!isConnected && (
                        <div style={{ marginBottom: "24px" }}>
                            <h3>socket.io enabled but not connected</h3>
                            <button type="button" onClick={() => socket.connect()}>
                                Connect
                            </button>
                        </div>
                    )}

                    {isConnected && (
                        <h3>Connected to socket.io with unique ID ${socketId}</h3>
                    )}

                    {children}
                </>
            )}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
