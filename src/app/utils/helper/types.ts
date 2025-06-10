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