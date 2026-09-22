

import { model, Schema, type HydratedDocument } from "mongoose";

export interface IUser {
    email: string;
    passwordHash: string | null;
    isEmailVerified: boolean;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}


export type UserDocument = HydratedDocument<IUser>;


const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: false,
            select: false,
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            required: true,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", userSchema);