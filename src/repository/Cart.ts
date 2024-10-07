import { Cart } from "../interfaces";
import { CartModel } from "../models";
import { GenericRepository } from "./Generic";

export class CartRepository extends GenericRepository<Cart> {
    constructor() {
        super(CartModel);
    }
}