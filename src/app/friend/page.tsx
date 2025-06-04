"use client"

import { useState } from "react"
import FrindLeftBox from "../components/friendLeftBox"
import FriendRightBox from "../components/friendRightBox"
import Header from "../components/header"

export const friendPage = () => {
    const [selectedChatUser,setSelectedChatUser]=useState<any>()

    return <div>
        <Header />
        <div className="w-full h-28" style={{ backgroundColor: "#449388" }}></div>

        <div className="container mx-auto" style={{ marginTop: -130 }}>
            <div className="py-4 h-screen">
                <div className="flex  rounded shadow-lg h-full">

                    {/* Left */}
                    <div className="w-1/3 border rounded border-green-100 flex flex-col">
                        <FrindLeftBox setSelectedChatUser={setSelectedChatUser} />
                    </div>

                    {/* Right */}
                    <div className="w-2/3">
                        <FriendRightBox selectedChatUser={selectedChatUser} />
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default friendPage