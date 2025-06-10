export const friendRequest = async ({ id }: { id: string }) => {
    try {
        const response = await fetch(`/api/friendrequest/${id}`);
        const data = await response.json();
        console.log(data, 'data');
        return data.result
    } catch (error) {
        console.error("Error fetching conversation:", error);
    }
};
export const acceptFriendRequest = async ({ id }: { id: string }) => {
    try {
        const response = await fetch(`/api/acceptfriendrequest/${id}`);
        const data = await response.json();
        console.log(data, 'data');
        return data.result
    } catch (error) {
        console.error("Error fetching conversation:", error);
    }
};

export const getUserData = async () => {
    try {
        const response = await fetch('/api/me');
        const data = await response.json();
        return data.result
    }
    catch (error) {
        console.error("Error fetching user data:", error);
    }
}