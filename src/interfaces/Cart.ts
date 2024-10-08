import { Client } from "./Client";
import { Common } from "./Common";
import { Product } from "./Product";

export interface Cart extends Common {
    client: Client; 
    products: Product[];
    totalAmount: number; 
    createdAt: Date;
    updatedAt: Date;
}