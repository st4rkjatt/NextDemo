"use client"

import moment from "moment";
import { useEffect, useState } from "react"

type AllUserType = {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    friendStatus?: string | null;
    lastChat?: {
        message: string,
        createdAt: string
    }
};
type FriendLeftBoxProps = {
    selectedChatUser: AllUserType | null,
    setSelectedChatUser: (user: AllUserType) => void;
};


const FrindLeftBox = ({ setSelectedChatUser, selectedChatUser }: FriendLeftBoxProps) => {
    const [userData, setUserData] = useState<AllUserType | undefined>(undefined);
    const [allUsers, setAllUsers] = useState<AllUserType[] | undefined>(undefined);

    useEffect(() => {
        getUserData()
        getAllUsers()
    }, [])
    
    const getAllUsers = async () => {
        try {

            const response = await fetch('api/getFriends');
            const data = await response.json();
            console.log(data, 'data');
            setAllUsers(data.result);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    const getUserData = async () => {
        try {

            const response = await fetch('api/me');
            const data = await response.json();
            setUserData(data.result);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    return <>


        {/* Header */}
        <div className="py-2 px-3  flex flex-row justify-between items-center">
            <div className="flex justify-center items-center">
                <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                <h1 className="ps-2 font-bold text-black">{userData?.fullName}</h1>
            </div>

            <div className="flex ">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                </div>
                <div className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                </div>
                <div className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                </div>
            </div>
        </div>

        {/* Search */}
        <div className="px-2 ">
            <input type="text" id="" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Search or start new chat" />
        </div>

        {/* Contacts */}
        <div className=" flex-1 overflow-auto mt-2">
            {allUsers?.map((user: AllUserType) => {
                return <div key={user._id} className={`px-3 py-3 flex items-center bg-grey-light cursor-pointer
                 border-b rounded border-green-400 text-black hover:bg-green-100 hover:shadow-md   ${selectedChatUser?._id === user?._id ? "bg-green-100" : ""}`} onClick={() => setSelectedChatUser(user)}>
                    <div>
                        <img className="h-12 w-12 rounded-full"
                            src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                    </div>
                    <div className="ml-4 flex-1 lighter ">
                        <p className="font-medium">
                            {user?.fullName?.charAt(0)?.toUpperCase() + user?.fullName?.slice(1)}
                        </p>

                        <div className="">
                            
                            {user?.friendStatus && <div className="flex items-center justify-between">
                                <p className="text-gray-600  text-sm">
                                    {user?.lastChat?.message}
                                </p>
                                <p className="text-gray-500 text-end mt-1 text-[12px]">
                                    {moment(user?.lastChat?.createdAt).format("HH:mm")}
                                </p>
                            </div>}
                        </div>
                    </div>
                </div>
            })}



        </div>
    </>
}


export default FrindLeftBox