import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const MessageModel = mongoose.models.message || mongoose.model("message", messageSchema); // ✅ prevent overwrite on hot reload
export default MessageModel;
