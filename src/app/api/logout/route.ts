import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        // Clear the token cookie
        const response = NextResponse.json({ message: "User logged out successfully", status: true }, { status: 200 });
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(), // Set expiration to the past to clear the cookie
        });
        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ message: "Internal Server Error", status: false }, { status: 500 });
    }


}