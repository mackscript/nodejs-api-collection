import { Router } from "express";
import { createProfile, getMyProfile, updateMyProfile } from "../controllers/profile.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import { profileSchema } from "../validations/profile.validation";
import { validate } from "../middleware/validate.middleware";



const profileRoute = Router()



profileRoute.post('/create', authmiddleware, validate(profileSchema), createProfile)
profileRoute.get(
    "/me",
    authmiddleware,
    getMyProfile
);
profileRoute.patch(
    "/update",
    authmiddleware,
    updateMyProfile
);

export default profileRoute;