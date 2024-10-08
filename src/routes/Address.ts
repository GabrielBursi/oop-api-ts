import { Router } from "express";
import { AddressController } from "../controllers";

export class AddressRouter {
    private readonly addressController: AddressController;
    public readonly router: Router;

    constructor() {
        this.addressController = new AddressController();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/", this.addressController.create.bind(this.addressController));
        this.router.get("/", this.addressController.findAll.bind(this.addressController));
        this.router.get("/:id", this.addressController.findById.bind(this.addressController));
        this.router.put("/:id", this.addressController.update.bind(this.addressController));
        this.router.delete("/:id", this.addressController.delete.bind(this.addressController));
    }
}