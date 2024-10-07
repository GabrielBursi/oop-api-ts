import { Address } from "../interfaces";
import { AddressModel } from "../models";
import { GenericRepository } from "./Generic";

export class AddressRepository extends GenericRepository<Address> {
    constructor() {
        super(AddressModel);
    }
}