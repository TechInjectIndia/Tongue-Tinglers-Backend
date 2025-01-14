import { BaseAddress, ParsedAddress } from "apps/address/interface/Address";
import { ParsedUser } from "apps/user/interface/user";

interface B2CUserAddressPayload{
    userId: number;
    address: BaseAddress;
}

interface B2CUserAddressTable{
    id: number;
    userId: number;
    addressId: number;
}

interface ParsedB2CUserAddress {
    id: number;
    userId: ParsedUser;
    address: ParsedAddress[];
}

export {B2CUserAddressTable, B2CUserAddressPayload, ParsedB2CUserAddress}