import mongoose, { Schema } from "mongoose";
import { Order, Payment, StatusOrder } from '../interfaces';

const orderSchema = new mongoose.Schema<Order>(
    {
        clientId: {
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
            enum: Object.values(StatusOrder)
        },
        paymentMethod: {
            type: Number,
            required: true,
            enum: Object.values(Payment)
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