import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export const getDataFromToken = (req: NextRequest) => {
    try {
        const encodedtoken = req.cookies.get('token')?.value || ''
        console.log(encodedtoken,"test")
        const decodedToken: any = jwt.verify(encodedtoken, process.env.JWT_SECRET || "")
        console.log(decodedToken)
        return decodedToken.userId
    } catch (error: any) {
        console.log(error,"error")
        throw new Error(error.message)
    }
}
