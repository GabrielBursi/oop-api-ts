import { Order, StatusOrder } from "../interfaces";
import { OrderModel } from "../models";
import { GenericRepository } from "./Generic";

export class OrderRepository extends GenericRepository<Order> {
    constructor() {
        super(OrderModel);
    }

    async findByClientId(clientId: string): Promise<Order[]> {
        return OrderModel.find({ clientId }).exec();
    }

    async findByStatus(status: StatusOrder): Promise<Order[]> {
        return OrderModel.find({ status }).exec();
    }
}