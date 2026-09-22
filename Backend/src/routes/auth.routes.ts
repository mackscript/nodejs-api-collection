import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { registerAuth } from "../controllers/auth.controller";
import { sendOtpSchema } from "../validations/auth.validation";

const router = Router();


router.post("/send-otp", validate(sendOtpSchema), registerAuth)
// router.post("/auth/register", validate(registerSchema), register);
// router.post("/verify-otp", verifyOtp);

export default router;

