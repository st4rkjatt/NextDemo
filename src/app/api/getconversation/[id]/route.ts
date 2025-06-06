import { getDataToken } from "@/app/utils/helper/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import ConversationModel from "@/app/models/conversationModel";

connect();
export async function GET(request: NextRequest) {
    try {
        const senderId = await getDataToken(request);

        if (!senderId) {
            return NextResponse.json({ message: "Unauthorized", status: false }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        const receiverId = id;

        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({ path: 'messages' });

        if (!conversation) {
            return NextResponse.json({ message: "Conversation not found", status: true, result: [] }, { status: 200 });
        }
        // console.log(conversation, 'coversation')

        return NextResponse.json({ message: "Conversation  found", status: true, result: conversation.messages }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}