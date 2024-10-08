import { Cart } from "../interfaces";
import { CartRepository } from "../repository";

export class CartService {
    private readonly cartRepository: CartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async createCart(cartData: Cart): Promise<Cart> {

        // cartData.totalAmount = cartData.products.reduce((total, product) => total + product.price * product.stockQuantity, 0);
        return this.cartRepository.create(cartData);
    }

    async getAllCarts(): Promise<Cart[]> {
        return this.cartRepository.findAll();
    }

    async getCartById(id: string): Promise<Cart | null> {
        const cart = await this.cartRepository.findById(id);
        if (!cart) {
            throw new Error(`Carrinho com ID ${id} não encontrado`);
        }
        return cart;
    }

    async updateCart(id: string, cartData: Partial<Cart>): Promise<Cart | null> {

        if (cartData.products) {
            cartData.totalAmount = cartData.products.reduce((total, product) => total + product.price * product.stockQuantity, 0);
        }
        return this.cartRepository.update(id, cartData);
    }

    async deleteCart(id: string): Promise<Cart | null> {
        return this.cartRepository.delete(id);
    }

    async getCartsWithFilter(filter: any, page: number, limit: number): Promise<Cart[]> {
        return this.cartRepository.findAllPaginatedWithFilter(filter, page, limit);
    }

    async addProductToCart(cartId: string, product: Cart["products"][number]): Promise<Cart | null> {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error("Carrinho não encontrado");
        }


        const productIndex = cart.products.findIndex((p) => p.id === product.id);

        if (productIndex > -1) {

            cart.products[productIndex].stockQuantity += product.stockQuantity;
        } else {

            cart.products.push(product);
        }


        cart.totalAmount = cart.products.reduce((total, p) => total + p.price * p.stockQuantity, 0);

        return this.cartRepository.update(cartId, cart);
    }

    async removeProductFromCart(cartId: string, productId: string): Promise<Cart | null> {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error("Carrinho não encontrado");
        }


        cart.products = cart.products.filter((product) => product.id !== productId);


        cart.totalAmount = cart.products.reduce((total, p) => total + p.price * p.stockQuantity, 0);

        return this.cartRepository.update(cartId, cart);
    }
}