import { Product, type IProduct } from "../models/product/product.model";

export async function createProduct(
    data: Partial<IProduct>
): Promise<IProduct> {
    return Product.create(data)
}
