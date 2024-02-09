import { initialProfile } from '@/app/utils/profile';
import { getDataFromToken } from '@/helpers/getDataFromtoken';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const userID = getDataFromToken(req)
    if(!userID) {
        redirect('/login')
    }
    try {
      const profile = await initialProfile(userID);
    
      const servers = await db.server.findMany({
        where: {
          members: {
            some: {
              profileId: profile.id
            }
          }
        }
      });
      return NextResponse.json({ success: true, data: servers });
    } catch (error) {
      console.error(error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };