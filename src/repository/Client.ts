import { Client } from "../interfaces";
import { ClientModel } from "../models";
import { GenericRepository } from "./Generic";

export class ClientRepository extends GenericRepository<Client> {
    constructor() {
        super(ClientModel);
    }

    async findByEmail(email: string): Promise<Client | null> {
        return ClientModel.findOne({ email }).exec();
    }
}