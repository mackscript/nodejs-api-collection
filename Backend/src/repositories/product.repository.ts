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

export async function findProducts(
    skip: number,
    limit: number
): Promise<IProduct[]> {
    return Product
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
}



export async function countProducts(): Promise<number> {
    return Product.countDocuments().exec();
}