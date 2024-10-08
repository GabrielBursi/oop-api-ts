import { Request, Response } from "express";
import { CartService } from "../services";
import { Cart, Common } from "../interfaces";

export class CartController {
    private readonly cartService: CartService;

    constructor() {
        this.cartService = new CartService();
    }

    async create(req: Request<{}, {}, Cart>, res: Response): Promise<void> {
        try {
            const cartData = req.body;
            const newCart = await this.cartService.createCart(cartData);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        try {
            const carts = await this.cartService.getAllCarts();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar os carrinhos.' });
        }
    }

    async findById(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cart = await this.cartService.getCartById(id);
            if (!cart) {
                res.status(404).json({ message: `Carrinho com ID ${id} não encontrado` });
            } else {
                res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar o carrinho.' });
        }
    }

    async update(req: Request<Pick<Common, 'id'>, {}, Partial<Cart>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cartData = req.body;
            const updatedCart = await this.cartService.updateCart(id, cartData);
            if (!updatedCart) {
                res.status(404).json({ message: `Carrinho com ID ${id} não encontrado` });
            } else {
                res.status(200).json(updatedCart);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async delete(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedCart = await this.cartService.deleteCart(id);
            if (!deletedCart) {
                res.status(404).json({ message: `Carrinho com ID ${id} não encontrado` });
            } else {
                res.status(200).json({ message: `Carrinho com ID ${id} deletado com sucesso.` });
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao deletar o carrinho.' });
        }
    }

    async addProduct(req: Request<{ cartId: string }, {}, Cart["products"][number]>, res: Response): Promise<void> {
        try {
            const { cartId } = req.params;
            const product = req.body;
            const updatedCart = await this.cartService.addProductToCart(cartId, product);
            if (!updatedCart) {
                res.status(404).json({ message: `Carrinho com ID ${cartId} não encontrado` });
            } else {
                res.status(200).json(updatedCart);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async removeProduct(req: Request<{ cartId: string, productId: string }>, res: Response): Promise<void> {
        try {
            const { cartId, productId } = req.params;
            const updatedCart = await this.cartService.removeProductFromCart(cartId, productId);
            if (!updatedCart) {
                res.status(404).json({ message: `Carrinho com ID ${cartId} não encontrado` });
            } else {
                res.status(200).json(updatedCart);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findWithFilter(req: Request<{}, {}, {}, { filter: string, page: number, limit: number }>, res: Response): Promise<void> {
        try {
            const { filter, page, limit } = req.query;
            const filterParsed = JSON.parse(filter || '{}');
            const carts = await this.cartService.getCartsWithFilter(filterParsed, page, limit);
            res.status(200).json(carts);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao aplicar filtros ou paginação.' });
        }
    }
}
