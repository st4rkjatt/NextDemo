"use client"

import { useState } from "react"

const Input = ({ receiverId }: any) => {

    const [message, setMessage] = useState<string>()
    const [loading, setLoading] = useState<boolean>()
    const handleSubmit = (e: any) => {
        e.preventDefault()

        sendMessage(message)
    }

    const sendMessage = async (formData: any) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/sendmessage/${receiverId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
            const data = await response.json();
            console.log(data, 'data')

        } catch (error) {
            console.error('Error signing up user:', error);
        }
        finally {
            setLoading(false);
            setMessage("")
        }

    }

    return <>
        <div className=" px-4 py-4 flex items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full items-center mx-4 gap-2">
                <input
                    className="flex-1 border rounded px-2 py-2"
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
                        <path fill="#263238" fillOpacity=".7" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </form>
        </div>

    </>
}


export default Input