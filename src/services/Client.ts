import { Client } from "../interfaces";
import { ClientRepository } from "../repository";

export class ClientService {
    private readonly clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async createClient(clientData: Client): Promise<Client> {
        const existingClient = await this.clientRepository.findByEmail(clientData.email);
        if (existingClient) {
            throw new Error(`Cliente com email ${clientData.email} já existe`);
        }

        return this.clientRepository.create(clientData);
    }

    async getAllClients(): Promise<Client[]> {
        return this.clientRepository.findAll();
    }

    async getClientById(id: string): Promise<Client | null> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new Error(`Cliente com ID ${id} não encontrado`);
        }
        return client;
    }

    async updateClient(id: string, clientData: Partial<Client>): Promise<Client | null> {
        const updatedClient = await this.clientRepository.update(id, clientData);
        if (!updatedClient) {
            throw new Error(`Cliente com ID ${id} não encontrado para atualizar`);
        }
        return updatedClient;
    }

    async deleteClient(id: string): Promise<Client | null> {
        const deletedClient = await this.clientRepository.delete(id);
        if (!deletedClient) {
            throw new Error(`Cliente com ID ${id} não encontrado para deletar`);
        }
        return deletedClient;
    }

    async getClientByEmail(email: string): Promise<Client | null> {
        const client = await this.clientRepository.findByEmail(email);
        if (!client) {
            throw new Error(`Cliente com email ${email} não encontrado`);
        }
        return client;
    }
}
