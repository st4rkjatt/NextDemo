
import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect()


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Check if the user already exists
        const userDetails = await User.findOne({ email });
        if (!userDetails) {
            return NextResponse.json({ message: "User not found", status: false }, { status: 400 });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password", status: false }, { status: 400 });
        }
        // Create a JWT token
        const token = await jwt.sign({ email: userDetails.email, fullName: userDetails.fullName, mobile: userDetails.mobile }, 'st4rk', { expiresIn: '8h' });
        // Create a response object

        const response = NextResponse.json({ message: "User logged in successfully", status: true }, { status: 200 });
        // Set the token in the response cookies
        response.cookies.set('token', token, {
            httpOnly: true,
        });
        return response;


    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}