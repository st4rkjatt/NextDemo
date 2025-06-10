import mongoose from "mongoose";
import { enums } from "../utils/helper/enums";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
    friendStatus: { type: String, enum: enums, default: null },
    friendRequestBy:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
}, { timestamps: true });

const ConversationModel = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema); // ✅ fix here
export default ConversationModel;
