import { getDataToken } from "@/app/utils/helper/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import ConversationModel from "@/app/models/conversationModel";
import MessageModel from "@/app/models/messageModel";
import { enums } from "@/app/utils/helper/enums";

connect();
export async function GET(request: NextRequest) {
    try {
        const senderId = await getDataToken(request);
        console.log(senderId, 'senderId')
        if (!senderId) {
            return NextResponse.json({ message: "Unauthorized", status: false }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        const receiverId = id;
        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {

            await ConversationModel.create({
                participants: [senderId, receiverId],
                friendStatus: enums.Null
            })

            return NextResponse.json({ message: "Any request not found.", status: true, result: { data: [], friendStatus: enums.Null, friendRequestBy: null } }, { status: 200 });

        }

        console.log(conversation, 'conversation')
        if (conversation && conversation.friendStatus !== enums.Accepted) {
            return NextResponse.json({
                message: "Conversation not found", status: true, result: {
                    data: [],
                    friendStatus: conversation.friendStatus,
                    friendRequestBy: conversation.friendRequestBy
                }
            }, { status: 200 });
        }

        const newMessage = await Promise.all(
            conversation.messages.map(async (id: string) => {
                return await MessageModel.findById(id);
            })
        );


        return NextResponse.json({
            message: "Conversation  found", status: true, result: { data: newMessage, friendStatus: conversation.friendStatus }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}