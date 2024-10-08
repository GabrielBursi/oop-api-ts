import { Category, Product } from "../interfaces";
import { ProductModel } from "../models";
import { GenericRepository } from "./Generic";

export class ProductRepository extends GenericRepository<Product> {
    constructor() {
        super(ProductModel);
    }

    async findByCategory(category: Category): Promise<Product[]> {
        return ProductModel.find({ category }).exec();
    }

    async findAvailable(): Promise<Product[]> {
        return ProductModel.find({ stockQuantity: { $gt: 0 } }).exec();
    }
}