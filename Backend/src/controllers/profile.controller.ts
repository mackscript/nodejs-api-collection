import type { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../middleware/async-handler"
import { createProfileService, getProfile, updateProfile } from "../services/profile.service"



export const createProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {


        const userId = req.user?.userId
        const data = req.body



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



export const getMyProfile = asyncHandler(
    async (req: Request, res: Response) => {

        const userId = req.user?.userId

        const profile = await getProfile(userId);

        return res.status(200).json({
            success: true,
            data: profile,
            message: "Profile fetched successfully",
        });
    }
);

export const updateMyProfile = asyncHandler(
    async (req: Request, res: Response) => {

        const userId = req.user?.userId
        const data = req.body

        console.log('userId :>> ', userId);
        const profile = await updateProfile(
            userId,
            data
        );

        return res.status(200).json({
            success: true,
            data: profile,
            message: "Profile updated successfully",
        });
    }
);