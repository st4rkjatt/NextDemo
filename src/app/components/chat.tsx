'use client';
import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const Chats = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState<Array<any>>([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const initializeSocket = async () => {
            // First initialize the socket server
            await fetch('/api/socket');
            
            // Then connect to the socket
            socketRef.current = io({
                path: '/api/socketio',
                withCredentials: true,
                extraHeaders: {
                    "my-custom-header": "abcd"
                }
            });

            socketRef.current.on('connect', () => {
                console.log('Connected to server');
                setIsConnected(true);
            });

            socketRef.current.on('disconnect', () => {
                console.log('Disconnected from server');
                setIsConnected(false);
            });

            socketRef.current.on('message', (msg: any) => {
                setMessages(prev => [...prev, msg]);
            });

            return () => {
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }
            };
        };

        initializeSocket().catch(console.error);

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (username && isConnected && socketRef.current) {
            socketRef.current.emit('register', username);
        }
    }, [username, isConnected]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() || !username.trim() || !socketRef.current) return;

        socketRef.current.emit("message", {
            username,
            message
        });

   
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Chat app</h1>
            
            <div className="mb-4">
                <label className="block mb-2">Enter a username</label>
                <input 
                    className="border p-2 rounded w-full" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    disabled={isConnected && username.trim() !== ''}
                />
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Messages</h2>
                <div className="border p-4 h-64 overflow-y-auto">
                    {messages.map((msg, i) => (
                        <div key={i} className="mb-2">
                            <strong>{msg.username}: </strong>
                            <span>{msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    className="border p-2 rounded flex-grow"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                    disabled={!username.trim()}
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={!username.trim() || !message.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chats;