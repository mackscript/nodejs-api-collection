import { Router } from "express";
import { createProfile, getMyProfile, updateMyProfile } from "../controllers/profile.controller";
import { authmiddleware } from "../middleware/auth.middleware";



const profileRoute = Router()



profileRoute.post('/create', createProfile)
profileRoute.get(
    "/me",
    authmiddleware,
    getMyProfile
);
profileRoute.patch(
    "/update",
    updateMyProfile
);

export default profileRoute;