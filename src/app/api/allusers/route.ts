import { getDataToken } from "@/app/helpers/getDataToken";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
    try {
        
        const userId = await getDataToken(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized", status: false }, { status: 401 });
        }
        
        const result = await User.find({ _id: { $ne: userId } }).select("-password");

        if (!result) {
            return NextResponse.json({ message: "User not found", status: false }, { status: 404 });
        }
        return NextResponse.json({ message: "User data fetched successfully", status: true, result }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }
}