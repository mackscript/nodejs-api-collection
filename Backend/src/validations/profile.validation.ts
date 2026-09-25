import { z } from "zod/v3";

export const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .max(100, "Name must be at most 100 characters")
        .optional(),

    phNumner: z
        .string()
        .trim()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number")
        .optional(),
    avatar: z
        .string()
        .trim()
        .url("Avatar must be a valid URL")
        .optional(),
})