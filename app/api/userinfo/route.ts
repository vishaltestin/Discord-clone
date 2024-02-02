
import { initialProfile } from "@/app/utils/profile";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
    const data = await req.json()
    const  id  = data.userId;
    try {
      const userProfile = await initialProfile(String(id));
      return NextResponse.json({ success: true, data: userProfile });
    } catch (error) {
      console.error(error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };
  
