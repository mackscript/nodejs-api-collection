import { AppError } from "../errors/app-error";
import { Product, type IProduct } from "../models/product/product.model";

import * as productRepository from '../repositories/product.repository'


export async function createProductService(
    data: Partial<IProduct>
): Promise<IProduct> {


    return productRepository.createProduct(data);
}

export async function updateProduct(
    productId: string,
    data: Partial<IProduct>
): Promise<IProduct> {

    const existingProduct =
        await productRepository.findProductById(productId);

    if (!existingProduct) {
        throw new AppError("Product not found", 404);
    }

    if (
        data.mrp !== undefined &&
        data.salePrice !== undefined &&
        data.salePrice > data.mrp
    ) {
        throw new AppError(
            "Sale price cannot be greater than MRP",
            400
        );
    }

    const updatedProduct =
        await productRepository.updateProductById(
            productId,
            data
        );

    if (!updatedProduct) {
        throw new AppError(
            "Failed to update product",
            500
        );
    }

    return updatedProduct;
}

export async function getProducts(
    page: number,
    limit: number
) {
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
        productRepository.findProducts(skip, limit),
        productRepository.countProducts(),
    ]);

    const totalPages = Math.ceil(
        totalProducts / limit
    );

    return {
        products,
        pagination: {
            page,
            limit,
            totalProducts,
            totalPages,
        },
    };
}

export async function getProductById(
    productId: string,

) {

    const product = await productRepository.findProductById(productId);


    if (!product) {
        throw new AppError("Product not found", 404);
    }


    return {
        product
    };
}