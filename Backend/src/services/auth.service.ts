import { AppError } from "../errors/app-error";
import * as userRepository from "../repositories/user.repository"
import { hashPassword } from "../utils/password"
import { sendVerificationOtp } from "./email.service";
import { createOtp } from "./otp.service";

import * as otpRepository from '../repositories/otp.repository'
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt";

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
        email, otp
    };
}


export async function verifyOtp(
    email: string,
    otp: string
) {

    const otpRecord = await otpRepository.findOtpByEmail(email)

    if (!otpRecord) {
        throw new AppError("Ivalied or expired OTP", 400)
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
        await otpRepository.deleteOtpByEmail(email);
        throw new AppError("Ivalied or expired OTP", 400)
    }

    const isOtpValid = await bcrypt.compare(
        otp,
        otpRecord.otpHash
    )

    if (!isOtpValid) {
        throw new AppError("Ivalied or expired OTP", 400)
    }

    const user = await userRepository.findUserByEmail(email)

    if (!user) {
        throw new AppError("User Not Found", 400)
    }

    user.isEmailVerified = true
    await user.save()

    const accessToken = generateAccessToken(
        user._id.toString(),
        user.role,
    );
    await otpRepository.deleteOtpByEmail(email)

    return { user, accessToken };
}