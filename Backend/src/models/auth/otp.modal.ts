import { Schema, model } from "mongoose";


export interface Otp {
    email: string
    otpHash: string,
    expiresAt: Date
}

const otpSchema = new Schema<Otp>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        otpHash: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true,
        }

    },
    {
        timestamps: true,
    }


)


export const OtpModel = model<Otp>('Otp', otpSchema)
