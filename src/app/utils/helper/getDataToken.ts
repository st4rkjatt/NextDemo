import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function getDataToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            throw new Error("No token found");
        }

        const decodedToken = await jwt.verify(token, 'st4rk');

  
        if (!decodedToken) {
            throw new Error("Invalid token");
        }
        return decodedToken?.id
    } catch (error: any) {
        console.error("Error getting data token:", error);
        throw new Error(error.message);

    }
}