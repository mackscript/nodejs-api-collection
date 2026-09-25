import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { createProductService } from "../services/product.service";

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