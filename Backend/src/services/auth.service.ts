import * as userRepository from "../models/auth/user.repository"
import { hashPassword } from "../utils/password"
import { sendVerificationOtp } from "./email.service";
import { createOtp } from "./otp.service";


interface SendOtpInput {
    email: string;
}

export async function sendOtp(input: SendOtpInput) {
    const email = input.email.toLowerCase().trim()

    let user = await userRepository.findUserByEmail(email);
    if (!user) {
        await userRepository.createUser({
            email,
            passwordHash: null,
            isEmailVerified: false,
            role: "user",
        });
    }


    const otp = await createOtp(email)

    await sendVerificationOtp(email, otp)

    return {
        message: `OTP sent successfully on ${email}`,
    };
}