import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide username"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    mobile: {
        type: String,
        required: [true, "Please provide mobile number"],
        unique: false,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = models.User || mongoose.model("User", userSchema);

export default User;