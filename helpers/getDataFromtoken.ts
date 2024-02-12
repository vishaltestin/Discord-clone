import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
export const getDataFromToken = () => {
    try {
        const cookieStore  = cookies()
        const encodedtoken = cookieStore.get('token')?.value || ''
        const decodedToken: any = jwt.verify(encodedtoken, process.env.JWT_SECRET || "")
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
            redirect('/login');
        }
        return String(decodedToken.userId)
    } catch (error: any) {
        console.log(error,"error")
        throw new Error(error.message)
    }
}


// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const getDataFromToken = (input: NextRequest | string) => {
//     try {
//         let encodedToken: string;
//         if (typeof input === 'string') {
//             encodedToken = input;
//         } else {
//             encodedToken = input.cookies.get('token')?.value || '';
//         }
//         const decodedToken: any = jwt.verify(encodedToken, process.env.JWT_SECRET || "");
//         return String(decodedToken.userId);
//     } catch (error: any) {
//         console.log(error, "error");
//         throw new Error(error.message);
//     }
// };
