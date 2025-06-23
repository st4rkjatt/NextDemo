"use client"

import { useState } from "react"
import FriendLeftBox from "../components/friendLeftBox"
import FriendRightBox from "../components/friendRightBox"
import Header from "../components/header"
import { AllUserType, Conversation, Message } from "../utils/helper/types"
import Sidebar from "../components/sidebar"
import ChatArea from "../components/ChatArea"


const FriendPage = () => {
    const [selectedChatUser, setSelectedChatUser] = useState<AllUserType | null>(null)
    const [selectedConversation, setSelectedConversation] = useState<AllUserType | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
    return <>
        <Header />
        <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <Sidebar
                    setSelectedChatUser={setSelectedChatUser}
                    selectedChatUser={selectedChatUser}
                    selectedConversation={selectedConversation}
                    onSelectConversation={setSelectedConversation}
                    onCloseSidebar={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col min-w-0 ">
                <ChatArea
                    selectedChatUser={selectedConversation}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />
            </div>
        </div>
    </>
}

export default FriendPage