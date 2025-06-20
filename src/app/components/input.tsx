"use client"

import { useState } from "react"
import Loader from "../utils/helper/Loader";

interface InputProps {
    receiverId: string;
    submitMessageFunc: (message: string) => void;
    handleTyping: () => void;
}

const Input = ({ receiverId, submitMessageFunc, handleTyping }: InputProps) => {
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendMessage(message)
        submitMessageFunc(message)
        setMessage("")
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
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value)
        handleTyping()
    }
    return <>
        <div className="border flex items-center">

            <form onSubmit={handleSubmit} className="flex w-full items-center  gap-2">
                <input
                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded focus:ring-green-500 focus:border-green-500 block w-full  dark:bg-gray-700 dark:border-green-500 py-3 px-2"
                    type="text"
                    name="message"
                    value={message || ""}
                    onChange={handleChange}
                    required
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    className="p-2 rounded hover:bg-blue-200 flex items-center justify-center cursor-pointer"
                    disabled={loading}
                    aria-label="Send message"
                >
                    {loading ? (
                        <Loader />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#22c55e" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    )}


                </button>

            </form>
        </div>

    </>
}


export default Input

