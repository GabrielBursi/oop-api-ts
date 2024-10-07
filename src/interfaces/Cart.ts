import { Common } from "./Common";
import { Product } from "./Product";

export interface Cart extends Common {
    clientId: string; 
    products: Product[];
    totalAmount: number; 
    createdAt: Date;
    updatedAt: Date;
}