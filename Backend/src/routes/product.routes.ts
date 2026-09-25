import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProductSchema } from "../validations/product.validation";


const productRoute = Router()

productRoute.post('/create', authmiddleware, validate(createProductSchema), createProduct)

export default productRoute;