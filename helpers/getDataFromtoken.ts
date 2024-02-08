import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export const getDataFromToken = (req: NextRequest) => {
    try {
        const encodedtoken = req.cookies.get('token')?.value || ''
        const decodedToken: any = jwt.verify(encodedtoken, process.env.JWT_SECRET || "")
        return String(decodedToken.userId)
    } catch (error: any) {
        console.log(error,"error")
        throw new Error(error.message)
    }
}
