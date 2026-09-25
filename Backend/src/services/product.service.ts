import { Product, type IProduct } from "../models/product/product.model";

import * as productRepository from '../repositories/product.repository'


export async function createProductService(
    data: Partial<IProduct>
): Promise<IProduct> {


    return productRepository.createProduct(data);
}