import { Router } from "express";
import { OrderController } from "../controllers";

export class OrderRouter {
    private readonly orderController: OrderController;
    public readonly router: Router;

    constructor() {
        this.orderController = new OrderController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.orderController.create.bind(this.orderController));
        this.router.get("/", this.orderController.findAll.bind(this.orderController));
        this.router.get("/:id", this.orderController.findById.bind(this.orderController));
        this.router.put("/:id", this.orderController.updateStatus.bind(this.orderController));
        this.router.delete("/:id", this.orderController.delete.bind(this.orderController));
        this.router.get("/client/:clientId", this.orderController.findByClientId.bind(this.orderController));
        this.router.get("/status/:status", this.orderController.findByStatus.bind(this.orderController));
    }
}