import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { createProductService, updateProduct } from "../services/product.service";
import { AppError } from "../errors/app-error";

export const createProduct = asyncHandler(
    async (req: Request, res: Response) => {

        const data = req.body

        const product = await createProductService(data)

        return res.status(200).json({
            success: true,
            data: product,
            message: "Product create successfully"
        })

    }
)

export const updateProductController = asyncHandler(
    async (req: Request, res: Response) => {

        const { productId } = req.params;

        if (!productId || Array.isArray(productId)) {
            throw new AppError("Invalid product ID", 400);
        }

        const product = await updateProduct(
            productId,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: product,
            message: "Product updated successfully",
        });
    }
);