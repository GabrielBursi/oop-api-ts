import { Category } from "./Category";
import { Common } from "./Common";

export interface Product extends Common {
    name: string;
    description: string;
    price: number;
    category: Category;
    stockQuantity: number;
    imageUrl?: string; 
    createdAt: Date;
    updatedAt: Date;
}