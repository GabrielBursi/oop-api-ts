import { Address } from "../interfaces";
import { AddressRepository } from "../repository";

export class AddressService {
    private readonly addressRepository: AddressRepository;

    constructor() {
        this.addressRepository = new AddressRepository();
    }

    async createAddress(addressData: Address): Promise<Address> {
        return this.addressRepository.create(addressData);
    }

    async getAllAddresses(): Promise<Address[]> {
        return this.addressRepository.findAll();
    }

    async getAddressById(id: string): Promise<Address | null> {
        const address = await this.addressRepository.findById(id);
        if (!address) {
            throw new Error(`Endereço com ID ${id} não encontrado`);
        }
        return address;
    }

    async updateAddress(id: string, addressData: Partial<Address>): Promise<Address | null> {
        return this.addressRepository.update(id, addressData);
    }

    async deleteAddress(id: string): Promise<Address | null> {
        return this.addressRepository.delete(id);
    }

    async getAddressesWithFilter(filter: any, page: number, limit: number): Promise<Address[]> {
        return this.addressRepository.findAllPaginatedWithFilter(filter, page, limit);
    }
}