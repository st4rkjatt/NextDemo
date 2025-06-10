export type AllUserType = {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
};

export type FriendRequestStatusType = 'pending' | 'accepted' | 'rejected';

export type FriendRequestType = {
    sender: string; // user _id
    receiver: string; // user _id
    status: FriendRequestStatusType;
};


export interface Message {
    _id?: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt?: string;
}
export interface MessageData {
    data: Message[],
    friendStatus: string,
    friendRequestBy?: string
}

export interface ChatState {
    messages: MessageData;
}
export interface SendFriendRequestType {
    createdAt: string;
    friendStatus: string;
    id: string;
    updatedAt: string;
    friendRequestBy:string
}