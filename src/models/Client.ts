import mongoose, { Schema } from "mongoose";
import { Client } from '../interfaces';

const clientSchema = new Schema<Client>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        phoneNumber: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        collection: 'clients',
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

export const ClientModel = mongoose.model<Client>("Client", clientSchema);
