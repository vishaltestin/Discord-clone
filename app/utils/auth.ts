import { NextApiResponse } from 'next';
import jwt from "jsonwebtoken";
import { setCookie, destroyCookie } from 'nookies';
import { NextResponse } from 'next/server';

interface TokenPayload {
    userId: number;
    userEmail: string;
}

const generateToken = (res: NextResponse, payload: TokenPayload) => {
    const jwtSecret = process.env.JWT_SECRET || "";
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "1h",
    });

    // res.setHeader("Set-Cookie", `jwt=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60}`);
     setCookie({ res }, 'jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
  });


    return token;
};

const clearToken = (res: NextApiResponse) => {
    destroyCookie({ res }, 'jwt');
};

export { generateToken, clearToken };
