import crypto from "node:crypto"
import bcrypt from "bcryptjs"

import * as otpRepository from '../models/auth/otp.repository'



const OTP_EXPIRY_MINUTES = 5;


function generateOtp(): string {
    return crypto.randomInt(10000, 1000000).toString()
}


export async function createOtp(email: string) {
    const otp = generateOtp();

    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000,
    );


    await otpRepository.deleteOtpByEmail(email);

    await otpRepository.createOtp({
        email,
        otpHash,
        expiresAt,
    });

    return otp;
}

