import mongoose, { Schema } from "mongoose";
import { Category } from "../interfaces";

export interface CategoryDocument  {
    name: Category;
}

const categorySchema = new Schema<CategoryDocument>(
    {
        name: {
            type: Number,
            required: true,
            enum: Object.values(Category),
        },
    },
    {
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        collection: 'categories',
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

export const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);