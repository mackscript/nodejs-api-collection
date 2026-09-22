import { z } from "zod/v3";


export const sendOtpSchema = z.object({
    email: z
        .string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),

})

export const verifyOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address"),

    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "OTP must be 6 digits"),
});