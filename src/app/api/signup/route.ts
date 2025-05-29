
import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect()


export async function POST(request: NextRequest) {
    try {
        const { fullName, email, mobile, password } = await request.json();
        console.log("Received data:", { fullName, email, mobile, password });
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists", status: false }, { status: 400 });
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const token = await jwt.sign({ email, fullName, mobile }, 'st4rk', { expiresIn: '8h' });
        const newUser = new User({ fullName, email, mobile, password: hashedPassword });
        await newUser.save();

        const response = NextResponse.json({ message: "User created successfully", status: true }, { status: 201 });
        // Set the token in the response cookies    
        response.cookies.set('token', token, {
            httpOnly: true,
        })
        return response;


    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}