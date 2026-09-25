
import mongoose, { Schema, type Document } from "mongoose";


export interface IProduct extends Document {
    title: string;
    description?: string;
    category: string;
    mrp: number;
    discountPercentage?: number;
    salePrice: number;
    rating?: number;
    stock: number;
    images: string[];
    returnPolicy?: string;
    warrantyInformation?: string;
}

const productSchema = new Schema<IProduct>({

    title: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        unique: true,

    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    mrp: {
        type: Number,
        required: true,
        min: 0,
    },
    salePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    images: {
        type: [String],
        default: [],
    },

    returnPolicy: {
        type: String,
        trim: true,
    },
    warrantyInformation: {
        type: String,
        trim: true,
    },

},
    {
        timestamps: true
    }
)

export const Product = mongoose.model<IProduct>(
    'Product',
    productSchema
)

