import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN =
    (process.env.JWT_EXPIRES_IN || "15m") as SignOptions["expiresIn"];
export interface AccessTokenPayload {
    userId: string;
    role: string;
}

export function generateAccessToken(
    userId: string,
    role: string,
): string {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
        {
            userId,
            role,
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
        },
    );
}

// verifyAccessToken
// auth.middleware.ts