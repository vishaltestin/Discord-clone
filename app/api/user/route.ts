import { getDataFromToken } from "@/helpers/getDataFromtoken";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
    try {
        const userID = getDataFromToken();

        const user = await db.user.findUnique({
            where: {
                id: Number(userID),
            },
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}
