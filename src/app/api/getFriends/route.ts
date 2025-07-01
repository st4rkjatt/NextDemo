import { getDataToken } from "@/app/utils/helper/getDataToken";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import ConversationModel from "@/app/models/conversationModel";
import mongoose from "mongoose";
import MessageModel from "@/app/models/messageModel";

connect();
export async function GET(request: NextRequest) {
    try {

        const userId = await getDataToken(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized", status: false }, { status: 401 });
        }


        const result = await User.find({ _id: { $ne: userId } }).select("-password");
        const allFriend = await Promise.all(result?.map(async (usr) => {


            const conversation = await ConversationModel.findOne({
                participants: { $all: [userId, usr._id.toString()] },
                friendStatus: 'accepted',
            })
            let friendStatus
          
            let lastmessageId
            if (conversation) {
                friendStatus = conversation.friendStatus
                lastmessageId = conversation.messages[conversation.messages.length - 1]
            }
            const lastChat = await MessageModel.findById(lastmessageId);

            return {
                _id: usr._id,
                fullName: usr.fullName,
                mobile: usr.mobile,
                email: usr.email,
                isVerified: usr.isVerified,
                isAdmin: usr.isAdmin,
                friendStatus: friendStatus,
                lastChat: lastChat
            };
        }) || []);

            // if (!result) {
        //     return NextResponse.json({ message: "User not found", status: false }, { status: 404 });
        // }
        return NextResponse.json({ message: "User data fetched successfully", status: true, result: allFriend }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}