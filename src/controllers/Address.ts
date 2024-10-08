import { Request, Response } from "express";
import { AddressService } from "../services";
import { Address, Common } from "../interfaces";

export class AddressController {
    private readonly addressService: AddressService;

    constructor() {
        this.addressService = new AddressService();
    }

    async create(req: Request<{}, {}, Address>, res: Response): Promise<void> {
        try {
            const data = req.body;
            const address = await this.addressService.createAddress(data);
            res.status(201).json(address);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        try {
            const addresses = await this.addressService.getAllAddresses();
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar os endereços.' });
        }
    }

    async findById(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const address = await this.addressService.getAddressById(id);
            if (!address) {
                res.status(404).json({ message: `Endereço com ID ${id} não encontrado` });
            } else {
                res.status(200).json(address);
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao buscar o endereço.' });
        }
    }

    async update(req: Request<Pick<Common, 'id'>, {}, Partial<Address>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedAddress = await this.addressService.updateAddress(id, data);
            if (!updatedAddress) {
                res.status(404).json({ message: `Endereço com ID ${id} não encontrado` });
            } else {
                res.status(200).json(updatedAddress);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async delete(req: Request<Pick<Common, 'id'>>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedAddress = await this.addressService.deleteAddress(id);
            if (!deletedAddress) {
                res.status(404).json({ message: `Endereço com ID ${id} não encontrado` });
            } else {
                res.status(200).json({ message: `Endereço com ID ${id} deletado com sucesso.` });
            }
        } catch (error) {
            res.status(500).json({ message: 'Houve um erro ao deletar o endereço.' });
        }
    }

    async findWithFilter(req: Request<{}, {}, {}, { filter: string, page: number, limit: number }>, res: Response): Promise<void> {
        try {
            const { filter, page, limit } = req.query;
            const filterParsed = JSON.parse(filter || '{}'); 
            const addresses = await this.addressService.getAddressesWithFilter(filterParsed, page, limit);
            res.status(200).json(addresses);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao aplicar filtros ou paginação.' });
        }
    }
}