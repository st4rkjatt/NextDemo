"use client"
import moment from "moment"
import Input from "./input"
import { useEffect, useRef, useState } from "react"
import socket from "../utils/helper/socketGlobal"
import { useChatStore } from "@/stores/store"
import { acceptFriendRequest, friendRequest } from "../utils/helper/allApiCalls"
import { enums } from "../utils/helper/enums"
import FriendRequestButton from "./friendRequestButton"
import { SendFriendRequestType } from "../utils/helper/types"


interface ChatUser {
    _id: string;
    fullName?: string;

}
interface Message {
    _id?: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt?: string;
}

interface TypingType {
    senderId: string;
    receiverId: string;
}


const FriendRightBox = ({ selectedChatUser }: { selectedChatUser: ChatUser | null }) => {

    const [userData, setUserData] = useState<ChatUser | null>(null);
    const [typing, setTyping] = useState<boolean>(false);
    const { messages, setMessages, addMessage, setFriendRequest, receiveFriendRequest, receiverFriendAccept } = useChatStore();
    const getUserData = async () => {
        try {
            const response = await fetch('/api/me');
            const data = await response.json();
            setUserData(data.result);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }



    useEffect(() => {
        getUserData();
    }, [])


    useEffect(() => {
        if (selectedChatUser) {
            getConversation()
            if (!userData) return;

            const userDetails = {
                userId: userData._id,
            };

            socket.emit('registerUser', userDetails);

        }
    }, [selectedChatUser])

    const getConversation = async () => {
        try {
            const response = await fetch(`/api/getconversation/${selectedChatUser?._id}`);
            const data = await response.json();
            // console.log(data.result, 'data.result')
            setMessages(data.result);
        } catch (error) {
            console.error("Error fetching conversation:", error);
        }
    };


    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); // slight delay ensures rendering is done

        return () => clearTimeout(timer);
    }, [messages]);


    const submitMessageFunc = (msg: string) => {
        if (!userData || !selectedChatUser) return;

        const newMessage = {
            senderId: userData._id,
            receiverId: selectedChatUser._id,
            message: msg,
        };

        if (socket.connected) {
            addMessage({ ...newMessage }); // optimistic UI
            socket.emit("sendMessage", newMessage);
        }
    };


    const handleReceiveFriendRequestAccept = (data: SendFriendRequestType) => {
        receiverFriendAccept(data)
    };
    const handleReceiveFriendRequest = (data: SendFriendRequestType) => {
        receiveFriendRequest(data)
    };
    const handleIncomingMessage = (msg: Message) => {
        addMessage(msg);
    };

    const sendFriendRequest = async () => {
        if (userData && selectedChatUser) {
            const status = await friendRequest({ id: selectedChatUser?._id })
            status.to = selectedChatUser._id
            status.friendRequestBy = userData?._id
            socket.emit("sendFriendRequest", status);
            setFriendRequest(status)

        }
    }
    const acceptRequest = async () => {
        if (userData && selectedChatUser) {
            const status = await acceptFriendRequest({ id: selectedChatUser._id })
            receiveFriendRequest(status)
            status.to = selectedChatUser._id
            socket.emit("acceptFriendRequest", status);
        }
    }

    useEffect(() => {
        if (!socket) return;
        socket.on("receiveMessage", handleIncomingMessage);
        socket.on("receiveFriendRequest", handleReceiveFriendRequest);
        socket.on("receiveAcceptFriendRequest", handleReceiveFriendRequestAccept);
        socket.on("receiveTyping", handleReceivingTyping);
        return () => {
            socket.off("receiveMessage", handleIncomingMessage);
            socket.off("receiveFriendRequest", handleReceiveFriendRequest);
            socket.off("receiveAcceptFriendRequest", handleReceiveFriendRequestAccept);
            socket.off("receiveTyping", handleReceivingTyping);
        };
    }, []);

    const handleTyping = () => {
        const newMessage = {
            senderId: userData?._id,
            receiverId: selectedChatUser?._id,
        };

        if (socket.connected) {
            socket.emit("typing", newMessage);
        }
    }

    const handleReceivingTyping = (data: TypingType) => {
        console.log("Received typing data:", data);
        console.log(selectedChatUser, 'data.receiverId === selectedChatUser?._id');
        if (data.receiverId === selectedChatUser?._id) {
            console.log("Receiving typing...", data);
            setTyping(true);
            setTimeout(() => {
                setTyping(false);
            }, 2000); // Clear typing after 2 seconds
        }

    }
    console.log(typing, 'messages in friend right box')

    return <>
        {selectedChatUser ?

            <div>
                {/* Header */}
                <div className="py-2 px-3 flex flex-row justify-between items-center  ">
                    <div className="flex items-center">
                        <div>
                            <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                        </div>
                        <div className="ml-4">
                            <p className="font-bold">
                                {selectedChatUser?.fullName
                                    ? selectedChatUser.fullName.charAt(0).toUpperCase() + selectedChatUser.fullName.slice(1)
                                    : ""}
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                        </div>
                        <div className="ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                        </div>
                        <div className="ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto h-[70vh] text-black " style={{ backgroundColor: "#DAD3CC" }}>

                    <div className="py-2 px-3">
                        {
                            messages?.friendStatus === enums.Accepted ? <>

                                <div className="flex justify-center mb-2">
                                    <div className="rounded py-2 px-4" style={{ backgroundColor: "#DDECF2" }}>
                                        <p className="text-sm uppercase">
                                            February 20, 2018
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-center mb-4">
                                    <div className="rounded py-2 px-4" style={{ backgroundColor: "#FCF4CB" }}>
                                        <p className="text-xs">
                                            Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                        </p>
                                    </div>
                                </div>
                            </> : <div className="flex justify-center h-[60vh]  items-center">
                                <FriendRequestButton
                                    friendStatus={messages?.friendStatus}
                                    friendRequestBy={messages?.friendRequestBy}
                                    currentUserId={userData?._id}
                                    onSendRequest={sendFriendRequest}
                                    onAcceptRequest={acceptRequest}
                                />


                            </div>
                        }

                        {
                            messages?.friendStatus === enums.Accepted && messages?.data?.map((msg: Message, i) => {

                                return <div key={i}>
                                    {selectedChatUser?._id === msg.receiverId ? <>
                                        <div className="flex justify-end mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: "#E2F7CB" }}>
                                                <p className="text-sm mt-1">
                                                    {msg?.message}
                                                </p>
                                                <p className="text-right text-xs mt-1 text-gray-500">
                                                    {moment(msg.createdAt).format("HH:mm")}
                                                </p>
                                            </div>
                                        </div>
                                    </>

                                        : <>

                                            <div className="flex mb-2">
                                                <div className="rounded py-2 px-3" style={{ backgroundColor: "#F2F2F2" }}>
                                                    <p className="text-sm font-medium ">
                                                        {msg.message}
                                                    </p>

                                                    <p className="text-right text-xs mt-1 text-gray-500">
                                                        {moment(msg.createdAt).format("HH:mm")}
                                                    </p>
                                                </div>
                                            </div>

                                            {typing && <div className=" typingDiv"></div>}

                                        </>
                                    }
                                </div>
                            })
                        }




                    </div>
                    <div ref={messagesEndRef} />
                </div>


                {/* Input */}
                {messages?.friendStatus === enums.Accepted && <Input handleTyping={handleTyping} submitMessageFunc={submitMessageFunc} receiverId={selectedChatUser?._id} />}
            </div>
            : <>

            </>}
    </>
}

export default FriendRightBox