import { Request, Response } from "express";
import { ClientService } from "../services";
import { Client, Common } from "../interfaces";

export class ClientController {
    private readonly clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    async create(req: Request<{}, {}, Client>, res: Response): Promise<void> {
        try {
            const data = req.body;
            const client = await this.clientService.createClient(data);
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        try {
            const clients = await this.clientService.getAllClients();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar os clientes.' });
        }
    }

    async findById(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const client = await this.clientService.getClientById(id);
            if (!client) {
                res.status(404).json({ message: `Cliente com ID ${id} não encontrado` });
            } else {
                res.status(200).json(client);
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar o cliente.' });
        }
    }

    async update(req: Request<Pick<Common, 'id'>, {}, Partial<Client>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedClient = await this.clientService.updateClient(id, data);
            if (!updatedClient) {
                res.status(404).json({ message: `Cliente com ID ${id} não encontrado` });
            } else {
                res.status(200).json(updatedClient);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async delete(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedClient = await this.clientService.deleteClient(id);
            if (!deletedClient) {
                res.status(404).json({ message: `Cliente com ID ${id} não encontrado` });
            } else {
                res.status(200).json({ message: `Cliente com ID ${id} deletado com sucesso.` });
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao deletar o cliente.' });
        }
    }

    async findByEmail(req: Request<Pick<Client, 'email'>>, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const client = await this.clientService.getClientByEmail(email);
            if (!client) {
                res.status(404).json({ message: `Cliente com email ${email} não encontrado` });
            } else {
                res.status(200).json(client);
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar o cliente pelo email.' });
        }
    }
}