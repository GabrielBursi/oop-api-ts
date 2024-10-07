import { Request, Response } from "express";
import { ClientService } from "../services";
import { Client } from "../interfaces";

export class ClientController {
    private readonly clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    async create(req: Request<{}, {}, Client>, res: Response) {
        try {
            const data = req.body;
            const user = await this.clientService.createClient(data);
            res.status(201).json(user);
        } catch (error) {
            throw new Error('Houve um erro.');
        }
    }

    async findAll(_req: Request, res: Response) {
        try {
            const users = await this.clientService.getAllClients();
            res.status(200).json(users);
        } catch (error) {
            throw new Error('Houve um erro.');
        }
    }
}