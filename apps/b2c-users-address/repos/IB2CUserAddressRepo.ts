import { B2CUserAddressPayload, ParsedB2CUserAddress } from "../interface/B2CUserAddress";

export interface IB2CUserAddressRepo {
    save(address: B2CUserAddressPayload): Promise<any>;
    getAddressByUserId(user_id: number): Promise<ParsedB2CUserAddress>;
    deleteAddressById(addressId:number): Promise<any>;
    update(addressId:number, address: B2CUserAddressPayload): Promise<any>;
    // delete(address: Address): Promise<any>;
    getById(id: number): Promise<ParsedB2CUserAddress>;
    getAll(): Promise<ParsedB2CUserAddress[]>;
    getProfileOfB2CUser(userId:number): Promise<any>;
}