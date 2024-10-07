import { Order } from "../interfaces";
import { OrderRepository } from "../repository";

export class OrderService {
    private readonly orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(orderData: Order): Promise<Order> {
        return this.orderRepository.create(orderData);
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.findAll();
    }

    async getOrderById(id: string): Promise<Order | null> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new Error(`Pedido com ID ${id} não encontrado`);
        }
        return order;
    }

    async updateOrderStatus(id: string, status: string): Promise<Order | null> {
        const updatedOrder = await this.orderRepository.update(id, { status });
        if (!updatedOrder) {
            throw new Error(`Pedido com ID ${id} não encontrado para atualizar`);
        }
        return updatedOrder;
    }

    async deleteOrder(id: string): Promise<Order | null> {
        const deletedOrder = await this.orderRepository.delete(id);
        if (!deletedOrder) {
            throw new Error(`Pedido com ID ${id} não encontrado para deletar`);
        }
        return deletedOrder;
    }

    async getOrdersByClientId(clientId: string): Promise<Order[]> {
        return this.orderRepository.findByClientId(clientId);
    }

    async getOrdersByStatus(status: string): Promise<Order[]> {
        return this.orderRepository.findByStatus(status);
    }
}