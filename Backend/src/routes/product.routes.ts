import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { authmiddleware } from "../middleware/auth.middleware";


const productRoute = Router()

productRoute.post('/create', authmiddleware, createProduct)

export default productRoute;