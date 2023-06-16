import { PrismaService } from "src/database/prisma.service";
import { CreateAddressDto } from "../../dto/create-address.dto";
import { UpdateAddressDto } from "../../dto/update-address.dto";
import { Address } from "../../entities/address.entity";
import { AddressesRepository } from "../addresses.repository";

export class AddressesPrismaRepository implements AddressesRepository {
    constructor(private prisma: PrismaService) {}
    // Check with project colabors if we can fix this issue.
    // Issue #1:
    // I'm not able to create a address without a user, even passing a user by parameter, the problems persists.


    async create(): Promise<Address> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Address[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(id: string): Promise<Address> {
        throw new Error("Method not implemented.");
    }

    async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
