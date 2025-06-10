import mongoose from "mongoose";

const friendReqestSchema = new mongoose.Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    
})


const FriendReqestModel = mongoose.model("friendRequest", friendReqestSchema)
export default FriendReqestModel