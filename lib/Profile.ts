import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromtoken";
import { db } from "./db";

export const presentProfile = async (req: NextRequest) => {
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return null
        }
        const profile = await db.profile.findUnique({
            where: {
                userId
            }
        })

        return profile;
    } catch (error) {
        console.log(error,'error here')
        throw new Error("Authentication failed");
    }
};

