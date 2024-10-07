import mongoose from "mongoose";
import { Address } from './../interfaces';

const addressSchema = new mongoose.Schema<Address>(
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    {
        timestamps: true,          
        versionKey: false,         
        autoIndex: true,           
        collection: 'addresses',   
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

export const AddressModel = mongoose.model<Address>("Address", addressSchema);