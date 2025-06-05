"use client"

import { useState } from "react"

interface InputProps {
    receiverId: string;
    submitMessageFunc: (message: string) => void;
}

const Input = ({ receiverId, submitMessageFunc }: InputProps) => {
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendMessage(message)
        submitMessageFunc(message)
    }

    const sendMessage = async (message: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/sendmessage/${receiverId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
            await response.json();
            // // console.log(data, 'data')

        } catch (error) {
            console.error('Error signing up user:', error);
        }
        finally {
            setLoading(false);
            setMessage("")
        }

    }

    return <>
        <div className="border flex items-center">

            <form onSubmit={handleSubmit} className="flex w-full items-center  gap-2">
                <input
                    className="flex-1  rounded px-2 py-2"
                    type="text"
                    name="message"
                    value={message || ""}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    className="p-2 rounded hover:bg-blue-200 flex items-center justify-center cursor-pointer"
                    disabled={loading}
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#263238" fillOpacity=".7" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>

                </button>

            </form>
        </div>

    </>
}


export default Input