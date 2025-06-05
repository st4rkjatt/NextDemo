import { getDataToken } from "@/app/utils/helper/getDataToken";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import ConversationModel from "@/app/models/conversationModel";
import MessageModel from "@/app/models/messageModel";

connect();

export async function POST(request: NextRequest ) {
    try {
        const senderId = await getDataToken(request);

        if (!senderId) {
            return NextResponse.json({ message: "Unauthorized", status: false }, { status: 401 });
        }
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        const receiverId = id
        const message = await request.json();

        // console.log(senderId, receiverId, message, 'send, receiver,message')

        const chatExists = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }

        })

        // console.log(chatExists, 'chatexists')


        const sender = await User.findById(senderId).select("-password");
        const receiver = await User.findById(senderId).select("-password");

        if (!sender || !receiver) {
            return NextResponse.json({ message: `${sender ? "Sender" : "Receiver" + "user not found"}`, status: false }, { status: 404 });
        }

        if (!chatExists) {
            const conversation = await ConversationModel.create({
                participants: [senderId, receiverId]
            })
            // console.log(conversation, 'conversation');

            const createMessage = await MessageModel.create({
                senderId: senderId,
                receiverId: receiverId,
                message: message
            })

            // console.log(createMessage, 'createMessage');

            conversation.messages.push(createMessage._id)

            await conversation.save()

            return NextResponse.json({ message: "Message sent successfully.", status: true, result: createMessage }, { status: 200 })
        }

        // find chatExists and update that
        const updateChat = await ConversationModel.findOneAndUpdate(
            { participants: { $all: [senderId, receiverId] } },
            { $setOnInsert: { participants: [senderId, receiverId] } },
            { new: true, upsert: true }
        )


        const createMessage = await MessageModel.create({
            senderId,
            receiverId,
            message
        })

         updateChat.messages.push(createMessage._id)
         await updateChat.save()

        return NextResponse.json({ message: "Message sent successfully.", status: true, result: createMessage }, { status: 200 })

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}
