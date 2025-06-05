"use client"

import { useState } from "react"
import FriendLeftBox from "../components/friendLeftBox"
import FriendRightBox from "../components/friendRightBox"
import Header from "../components/header"

const FriendPage = () => {
    const [selectedChatUser, setSelectedChatUser] = useState<any>("")

    return <div>
        <Header />

        <div className=" h-[88vh]">
            <div className="flex  rounded shadow-lg h-full">

                {/* Left */}
                <div className="w-1/3 shadow rounded  flex flex-col">
                    <FriendLeftBox setSelectedChatUser={setSelectedChatUser} />
                </div>

                {/* Right */}
                <div className="w-2/3">
                    <FriendRightBox selectedChatUser={selectedChatUser} />
                </div>

            </div>

        </div>
    </div>
}

export default FriendPage