import type { Request, Response, NextFunction } from "express";


import { ZodError, type ZodSchema } from "zod/v3";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.flatten().fieldErrors,
                });
            }

            next(error);
        }
    }

}

