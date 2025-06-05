import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
interface DecodedToken {
    id: string;
  
}
export async function getDataToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            throw new Error("No token found");
        }

        const decodedToken = await jwt.verify(token, 'st4rk') as DecodedToken;

        if (!decodedToken) {
            throw new Error("Invalid token");
        }
        return decodedToken.id;
    } catch (error: unknown) {
        console.error("Error getting data token:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Unknown error occurred");
    }
}