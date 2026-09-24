import { Router } from "express";
import { createProfile } from "../controllers/profile.controller";



const profileRoute = Router()

profileRoute.post('/create', createProfile)


export default profileRoute;