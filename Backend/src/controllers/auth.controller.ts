import type { Request, Response } from "express";

import { sendOtp } from "../services/auth.service";


export async function registerAuth(
    req: Request,
    res: Response
) {
    const { email } = req.body

    const result = await sendOtp({
        email,
    });

    return res.status(201).json({
        success: true,
        message: result.message,
    });
}