import { Router } from "express";
import { createProfile, getMyProfile, updateMyProfile } from "../controllers/profile.controller";



const profileRoute = Router()



profileRoute.post('/create', createProfile)
profileRoute.get(
    "/me",
    getMyProfile
);
profileRoute.patch(
    "/update",
    updateMyProfile
);

export default profileRoute;