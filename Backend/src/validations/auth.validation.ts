import { z } from "zod/v3";


export const sendOtpSchema = z.object({
    email: z
        .string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),

})