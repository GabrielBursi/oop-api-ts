import mongoose from "mongoose";
import { Category, Product } from '../interfaces';

const productSchema = new mongoose.Schema<Product>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: Number,
            required: true,
            enum: Object.values(Category)
        },
        stockQuantity: { type: Number, required: true },
        imageUrl: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        collection: 'products',
        minimize: true,
        strict: true,
        toJSON: {
            transform: (_doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

export const ProductModel = mongoose.model<Product>("Product", productSchema);