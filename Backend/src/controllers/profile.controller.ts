import type { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../middleware/async-handler"
import { createProfileService } from "../services/profile.service"



export const createProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const { userId, ...data } = req.body


        const profile = await createProfileService(
            userId,
            data
        );



        return res.status(200).json({
            success: true,
            data: profile,
            message: "Profile created successfully",
        })
    }
)


