import type { NextFunction, Request, Response } from "express";

import { asyncHandler } from "./async-handler";
import { AppError } from "../errors/app-error";

import {
    verifyAccessToken,
    type AccessTokenPayload,
} from "../utils/jwt";

export const authmiddleware = asyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const authHeader = req.header("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            throw new AppError("Unauthorized", 401);
        }

        const token = authHeader.split(" ")[1];


        if (!token) {
            throw new AppError("Token missing", 401);
        }

        console.log('token :>> ', token);
        const decoded = verifyAccessToken(token);

        (req as Request & {
            user: AccessTokenPayload;
        }).user = decoded;


        next();
    }
);