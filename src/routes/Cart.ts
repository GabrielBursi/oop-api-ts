import { Router } from "express";
import { CartController } from "../controllers";

export class CartRouter {
    private readonly cartController: CartController;
    public readonly router: Router;

    constructor() {
        this.cartController = new CartController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.cartController.create.bind(this.cartController));
        this.router.get("/", this.cartController.findAll.bind(this.cartController));
        this.router.get("/:id", this.cartController.findById.bind(this.cartController));
        this.router.put("/:id", this.cartController.update.bind(this.cartController));
        this.router.delete("/:id", this.cartController.delete.bind(this.cartController));
        this.router.post("/:id/product", this.cartController.addProduct.bind(this.cartController));
        this.router.delete("/:id/product/:productId", this.cartController.removeProduct.bind(this.cartController));
    }
}