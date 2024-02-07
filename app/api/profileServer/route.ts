import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
    const data = await req.json()
    const id = data.id;

try {
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: id
                }
            }
        }
    });

    if (!server) {
        return  NextResponse.json({ success: false, status: 404, message: 'Server not found' });
    }

    return NextResponse.json({ success: true, data: server });
} catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
}

};
