import { NextRequest, NextResponse } from 'next/server';
import FriendRequestModel from '@/app/models/friendRequestModel'; // ✅ Ensure correct import
import { connect } from '@/app/dbConfig/dbConfig'; // ✅ Connect to DB
import { getDataToken } from '@/app/utils/helper/getDataToken';
import ConversationModel from '@/app/models/conversationModel';
import { enums } from '@/app/utils/helper/enums';

connect();

export async function GET(
    request: NextRequest,
) {
    try {
        const senderId = await getDataToken(request);

        if (!senderId) {
            return NextResponse.json({ message: "Unauthorized", status: false }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        const receiverId = id;
        const updatedConversation = await ConversationModel.findOneAndUpdate(
            { participants: { $all: [senderId, receiverId] } },
            {
                friendStatus: enums.Pending,
                friendRequestBy: senderId
            },

            { new: true }
        );

        if (!updatedConversation) {
            return NextResponse.json({ message: "Conversation not found", status: false }, { status: 404 });
        }

        console.log(updatedConversation, 'updatedConversation')
        return NextResponse.json({ message: "Friend Request sent.", status: true }, { status: 200 })


    } catch (error) {
        console.error("Error fetching friend request:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            status: false
        }, { status: 500 });
    }
}
