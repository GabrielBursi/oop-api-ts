import { Request, Response } from "express";
import { OrderService } from "../services";
import { Client, Common, Order } from "../interfaces";

export class OrderController {
    private readonly orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async create(req: Request<{}, {}, Order>, res: Response): Promise<void> {
        try {
            const orderData = req.body;
            const newOrder = await this.orderService.createOrder(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os pedidos.' });
        }
    }

    async findById(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                res.status(404).json({ message: `Pedido com ID ${id} não encontrado` });
            } else {
                res.status(200).json(order);
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar o pedido.' });
        }
    }

    async updateStatus(req: Request<Pick<Common, 'id'>, {}, Pick<Order, 'status'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await this.orderService.updateOrderStatus(id, status);
            if (!updatedOrder) {
                res.status(404).json({ message: `Pedido com ID ${id} não encontrado` });
            } else {
                res.status(200).json(updatedOrder);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async delete(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedOrder = await this.orderService.deleteOrder(id);
            if (!deletedOrder) {
                res.status(404).json({ message: `Pedido com ID ${id} não encontrado` });
            } else {
                res.status(200).json({ message: `Pedido com ID ${id} deletado com sucesso.` });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar o pedido.' });
        }
    }

    async findByClientId(req: Request<Pick<Client, 'id'>>, res: Response): Promise<void> {
        try {
            const { id: clientId } = req.params;
            const orders = await this.orderService.getOrdersByClientId(clientId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os pedidos do cliente.' });
        }
    }

    async findByStatus(req: Request<Pick<Order, 'status'>>, res: Response): Promise<void> {
        try {
            const { status } = req.params;
            const orders = await this.orderService.getOrdersByStatus(status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar pedidos por status.' });
        }
    }
}
