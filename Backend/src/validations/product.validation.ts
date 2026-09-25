import { z } from "zod";

export const createProductSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Product title is required")
        .max(100, "Product title must be less than 100 characters"),

    description: z
        .string()
        .trim()
        .optional(),

    category: z
        .string()
        .trim()
        .min(1, "Product category is required"),

    mrp: z
        .number()
        .min(0, "MRP cannot be negative"),

    salePrice: z
        .number()
        .min(0, "Sale price cannot be negative"),

    discountPercentage: z
        .number()
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot be more than 100")
        .default(0),

    rating: z
        .number()
        .min(0, "Rating cannot be negative")
        .max(5, "Rating cannot be more than 5")
        .default(0),

    stock: z
        .number()
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),

    images: z
        .array(z.string().url("Invalid image URL"))
        .default([]),

    returnPolicy: z
        .string()
        .trim()
        .optional(),

    warrantyInformation: z
        .string()
        .trim()
        .optional(),
});

export type CreateProductInput = z.infer<
    typeof createProductSchema
>;


export const updateProductSchema =
    createProductSchema.partial();

export type UpdateProductInput = z.infer<
    typeof updateProductSchema
>;