import { Router } from "express";
import { ProductController } from "../controllers";

export class ProductRouter {
    private readonly productController: ProductController;
    public readonly router: Router;

    constructor() {
        this.productController = new ProductController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.productController.create.bind(this.productController));
        this.router.get("/", this.productController.findAll.bind(this.productController));
        this.router.get("/:id", this.productController.findById.bind(this.productController));
        this.router.put("/:id", this.productController.update.bind(this.productController));
        this.router.delete("/:id", this.productController.delete.bind(this.productController));
        this.router.get("/category/:category", this.productController.findByCategory.bind(this.productController));
        this.router.get("/available", this.productController.findAvailable.bind(this.productController));
    }
}