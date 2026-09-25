import { Product, type IProduct } from "../models/product/product.model";

export async function createProduct(
    data: Partial<IProduct>
): Promise<IProduct> {
    return Product.create(data)
}


export async function findProductById(
    productId: string
): Promise<IProduct | null> {
    return Product.findById(productId).exec();
}


export async function updateProductById(
    productId: string,
    data: Partial<IProduct>
): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(
        productId,
        data,
        {
            new: true,
            runValidators: true,
        }
    ).exec();
}