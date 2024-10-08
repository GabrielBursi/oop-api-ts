import { Address } from "./Address";
import { Client } from "./Client";
import { Common } from "./Common";
import { Payment } from "./Payment";
import { Product } from "./Product";
import { StatusOrder } from "./StatusOrder";

export interface Order extends Common {
    client: Client; 
    products: Product[];
    totalAmount: number; 
    status: StatusOrder; 
    paymentMethod: Payment;
    shippingAddress: Address;
    createdAt: Date;
    updatedAt: Date;
}