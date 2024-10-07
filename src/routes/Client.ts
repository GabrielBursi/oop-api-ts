import { Router } from "express";
import { ClientController } from "../controllers";

export class ClientRouter {
    private readonly clientController: ClientController;
    public readonly router: Router;

    constructor() {
        this.clientController = new ClientController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.clientController.create.bind(this.clientController));
        this.router.get("/", this.clientController.findAll.bind(this.clientController));
    }
}
