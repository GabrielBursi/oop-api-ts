import { Address } from "./Address";
import { Common } from "./Common";

export interface Client extends Common {
    name: string;
    email: string;
    passwordHash: string; 
    address: Address
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}