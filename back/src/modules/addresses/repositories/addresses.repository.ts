import { UpdateAddressDto } from "../dto/update-address.dto";
import { Address } from "../entities/address.entity";

export abstract class AddressesRepository {
    abstract findOne(id: string, userId: string): Promise<Address> | Address
    abstract update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> | Address
}