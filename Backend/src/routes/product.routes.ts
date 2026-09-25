import { Router } from "express";
import { createProduct, updateProductController } from "../controllers/product.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProductSchema, updateProductSchema } from "../validations/product.validation";


const productRoute = Router()

productRoute.post('/create', authmiddleware, validate(createProductSchema), createProduct)
productRoute.patch(
    "/:productId",
    authmiddleware,
    validate(updateProductSchema),
    updateProductController
);
export default productRoute;