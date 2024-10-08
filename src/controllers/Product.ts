import { Request, Response } from "express";
import { ProductService } from "../services";
import { Common, Product } from "../interfaces";

export class ProductController {
    private readonly productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async create(req: Request<{}, {}, Product>, res: Response): Promise<void> {
        try {
            const productData = req.body;
            const newProduct = await this.productService.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os produtos.' });
        }
    }

    async findById(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            if (!product) {
                res.status(404).json({ message: `Produto com ID ${id} não encontrado` });
            } else {
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar o produto.' });
        }
    }

    async update(req: Request<Pick<Common, 'id'>, {}, Partial<Product>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const productData = req.body;
            const updatedProduct = await this.productService.updateProduct(id, productData);
            if (!updatedProduct) {
                res.status(404).json({ message: `Produto com ID ${id} não encontrado para atualizar` });
            } else {
                res.status(200).json(updatedProduct);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async delete(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedProduct = await this.productService.deleteProduct(id);
            if (!deletedProduct) {
                res.status(404).json({ message: `Produto com ID ${id} não encontrado para deletar` });
            } else {
                res.status(200).json({ message: `Produto com ID ${id} deletado com sucesso.` });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o produto.' });
        }
    }

    async findByCategory(req: Request<Pick<Product, 'category'>>, res: Response): Promise<void> {
        try {
            const { category } = req.params;
            const products = await this.productService.getProductsByCategory(category);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os produtos pela categoria.' });
        }
    }

    async findAvailable(_req: Request, res: Response): Promise<void> {
        try {
            const availableProducts = await this.productService.getAvailableProducts();
            res.status(200).json(availableProducts);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os produtos disponíveis.' });
        }
    }
}
