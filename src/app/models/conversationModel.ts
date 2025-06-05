import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }]
}, { timestamps: true });

const ConversationModel = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema); // ✅ fix here
export default ConversationModel;
