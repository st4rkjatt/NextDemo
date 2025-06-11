import React from "react";
import { enums } from "../utils/helper/enums";

interface FriendRequestButtonProps {
    friendStatus: string;
    friendRequestBy?: string;
    currentUserId: string | undefined;
    onSendRequest: () => void;
    onAcceptRequest: () => void;
}

const FriendRequestButton: React.FC<FriendRequestButtonProps> = ({
    friendStatus,
    friendRequestBy,
    currentUserId,
    onSendRequest,
    onAcceptRequest,
}) => {
    // console.log(friendRequestBy?.toString(), currentUserId?.toString(), 'friendRequestBy?.toString() !== currentUserId?.toString()')
    switch (friendStatus) {
        case enums.Null:
            return (
                <button
                    onClick={onSendRequest}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded cursor-pointer"
                >
                    Send Friend Request
                </button>
            );

        case enums.Pending:
            console.log('pending ', friendRequestBy?.toString(), currentUserId?.toString())
            if (friendRequestBy?.toString() !== currentUserId?.toString()) {
                return (
                    <button
                        onClick={onAcceptRequest}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded cursor-pointer"
                    >
                        Accept Request
                    </button>
                );
            } else {
                return (
                    <button
                        disabled
                        className="bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-600 rounded cursor-not-allowed"
                    >
                        Request in pending
                    </button>
                );
            }
        default:
            return (
                <button
                    onClick={onSendRequest}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded cursor-pointer"
                >
                    Send Friend Request
                </button>
            );

    }
};

export default FriendRequestButton;
