import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { registerAuth, verifyOtpController } from "../controllers/auth.controller";
import { sendOtpSchema, verifyOtpSchema } from "../validations/auth.validation";

const router = Router();


router.post("/send-otp", validate(sendOtpSchema), registerAuth)
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpController)


export default router;

