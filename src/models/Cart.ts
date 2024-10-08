import mongoose, { Schema } from "mongoose";
import { Cart } from '../interfaces';

const cartSchema = new Schema<Cart>(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        ],
        totalAmount: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        collection: 'cart',
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

export const CartModel = mongoose.model<Cart>("Cart", cartSchema);
