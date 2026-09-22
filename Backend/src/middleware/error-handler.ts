import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            ...(error.details ? { details: error.details } : {}),

        })

    }

    return res.status(500).json({
        success: false,
        message: "internal server error"
    })
}