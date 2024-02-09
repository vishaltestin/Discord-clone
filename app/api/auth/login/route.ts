import { z } from 'zod';
import { db } from "@/lib/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { generateToken } from '../../../utils/auth';

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

export async function POST(req: Request, res: NextResponse) {

    try {
        const data = await req.json()
        const { email, password } = schema.parse(data);
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
                return new NextResponse('Invalid credentials', { status: 403 });
            }

            const tokenPayload = {
                userId: user.id,
                userEmail: user.email,
            };
            const token = generateToken(res, tokenPayload);
            const response = NextResponse.json({ user, token });
            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            })

            return response
        } catch (error) {
            console.error('Error logging in:', error);
            return new NextResponse('Internal Error', { status: 500 });
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}