import { z } from 'zod';
import { db } from "@/lib/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { NextApiResponse, NextApiRequest } from 'next';
import { generateToken } from '../../../utils/auth';


const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }), username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be at most 20 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }), month: z.string(),
});
export async function POST(req: Request, res: NextResponse) {
    try {
        const { email, password } = await req.json();
        console.log(req.body,"vishal")
        if (!email || !password) {
            return new NextResponse('Invalid request. Email and password are required.', { status: 400 });
        }
        try {
            const user = await db.user.findUnique({
                where: { email },
            });

            if (!user) {
                return new NextResponse('Invalid credentials', { status: 401 });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return new NextResponse('Invalid credentials', { status: 401 });
            }

            const tokenPayload = {
                userId: user.id,
                userEmail: user.email,
            };
            const token = generateToken(res, tokenPayload);
            // res.json({ token, user });
           return NextResponse.json({user,token});
        } catch (error) {
            console.error('Error logging in:', error);
            return new NextResponse('Internal Error', { status: 500 });
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}