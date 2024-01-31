import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    displayName: z
        .string()
        .min(3, { message: "Display name must be at least 3 characters" })
        .max(30, { message: "Display name must be at most 30 characters" }),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be at most 20 characters" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    day: z.string(),
    month: z.string(),
    year: z.string(),
});

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email, displayName, username, password, day, month, year } =
            schema.parse(data);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            data: {
                email,
                displayName,
                username,
                password: hashedPassword,
                day,
                month,
                year,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error logging in:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
