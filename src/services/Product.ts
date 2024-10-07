import { Product } from "../interfaces";
import { ProductRepository } from "../repository";

export class ProductService {
    private readonly productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(productData: Product): Promise<Product> {
        return this.productRepository.create(productData);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async getProductById(id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }
        return product;
    }

    async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
        const updatedProduct = await this.productRepository.update(id, productData);
        if (!updatedProduct) {
            throw new Error(`Produto com ID ${id} não encontrado para atualizar`);
        }
        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<Product | null> {
        const deletedProduct = await this.productRepository.delete(id);
        if (!deletedProduct) {
            throw new Error(`Produto com ID ${id} não encontrado para deletar`);
        }
        return deletedProduct;
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return this.productRepository.findByCategory(category);
    }

    async getAvailableProducts(): Promise<Product[]> {
        return this.productRepository.findAvailable();
    }
}