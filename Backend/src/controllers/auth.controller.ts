import type { Request, Response } from "express";

import { sendOtp, verifyOtp } from "../services/auth.service";
import { asyncHandler } from "../middleware/async-handler";

export const registerAuth = asyncHandler(
    async (req: Request, res: Response) => {
        const { email } = req.body


        const result = await sendOtp({
            email,
        });

        return res.status(201).json({
            success: true,
            data: result
        });
    }
)


export const verifyOtpController = asyncHandler(
    async (req: Request, res: Response) => {

        const { email, otp } = req.body

        const user = await verifyOtp(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            data: {
                user,
            },
        });
    }
)