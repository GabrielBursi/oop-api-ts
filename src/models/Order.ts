import mongoose, { Schema } from "mongoose";
import { Order } from '../interfaces';

const orderSchema = new mongoose.Schema<Order>(
    {
        client: {
            type: String,
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
        status: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        collection: 'orders',
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

export const OrderModel = mongoose.model<Order>("Order", orderSchema);