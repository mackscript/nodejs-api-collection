import type { NextFunction, Request, Response } from "express";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);

}