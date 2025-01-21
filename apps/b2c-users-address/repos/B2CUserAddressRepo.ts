import { AddressModel } from "apps/address/models/AddressTable";
import { B2CUserAddressPayload } from "../interface/B2CUserAddress";
import { B2CUserAddressModel } from "../models/B2CUserAddressTable";
import { IB2CUserAddressRepo } from "./IB2CUserAddressRepo";
import { UserModel } from "apps/user/models/UserTable";
import { parseUser } from "apps/user/parser/user-parser";

export class B2CUserAddressRepo implements IB2CUserAddressRepo{
    async save(address: B2CUserAddressPayload): Promise<any> {
        const transaction = await B2CUserAddressModel.sequelize?.transaction();
        try{
            const addressCreated = await AddressModel.create(address.address,{transaction: transaction})
            if(!addressCreated){
                throw new Error("Address not created");
            }
            const guestUserAddressCreated = await B2CUserAddressModel.create({
                addressId: addressCreated.id,
                userId: address.userId
            }, {transaction: transaction})
            
            if(!guestUserAddressCreated){
                throw new Error("Guest user address not created");
            }

            const B2CAddress = await B2CUserAddressModel.findAll({
                where: {
                    userId: address.userId
                },
                include: [
                    {
                        model: AddressModel,
                        as: 'address'
                    },
                    {
                        model: UserModel,
                        as: 'users'
                    }
                ],
                transaction: transaction
            })

            await transaction?.commit();
            return {guestUserAddressCreated, B2CAddress};
        }catch(error){
            // Rollback the transaction in case of error
            if (transaction) {
                await transaction.rollback();
            }
            console.log(error);
            return null; 
        }
    }

    async getAddressByUserId(user_id:number): Promise<any> {
        try{
            const B2CUserAddress = await B2CUserAddressModel.findAll({
                where: {
                    userId: user_id
                },
                include: [
                    {
                        model: AddressModel,
                        as: 'address'
                    },
                    {
                        model: UserModel,
                        as: 'users'
                    }
                ]
            })
            return B2CUserAddress;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deleteAddressById(addressId: number): Promise<any> {
        const transaction = await B2CUserAddressModel.sequelize?.transaction();
        try{
            const b2CUserAddressData = await B2CUserAddressModel.findOne({
                where: { addressId },
                include: [
                    {
                        model: AddressModel,
                        as: 'address'
                    },
                    {
                        model: UserModel,
                        as: 'users'
                    }
                ],
                transaction,
            });
            const b2CUserAddressDeleted = await B2CUserAddressModel.destroy({
                where: {
                    addressId: addressId
                },
                transaction
            })
            if (!b2CUserAddressDeleted) {
                throw new Error(`No B2CUserAddress entry found for addressId: ${addressId}`);
            }

            const addressDeleted = await AddressModel.destroy({
                where: {
                   id: addressId
                },
                transaction
            })
            if (!addressDeleted) {
                throw new Error(`No Address entry found for id: ${addressId}`);
            }
            await transaction?.commit();
            return b2CUserAddressData;
        }catch(error){
            if (transaction) {
                await transaction.rollback();
            }
            console.log(error); 
            return null
        }
    }
    async update(addressId:number, address: B2CUserAddressPayload): Promise<any> {
        const transaction = await B2CUserAddressModel.sequelize?.transaction();
        try{
            const b2cUserData = await B2CUserAddressModel.findOne({
                where:{
                    userId: address.userId,
                    addressId: addressId
                }
            })
            if(!b2cUserData){
                throw new Error("Guest user address not found");
            }
            const updatedAddress = await AddressModel.findOne({
                where: {
                    id: b2cUserData.addressId
                }
            })
            if(!updatedAddress){
                throw new Error("Address not found");
            }
            updatedAddress.set(address.address);
            await updatedAddress.save({transaction: transaction});
            await transaction?.commit();
            return updatedAddress;
        }catch(error){
            // Rollback the transaction in case of error
            if (transaction) {
                await transaction.rollback();
            }
            console.log(error);
            return null;
        }
    }
    getById(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getProfileOfB2CUser(userId: number):Promise<any>{
        try{
    
          const profile = await UserModel.findOne({
            where: {
              id: userId
            }
          });
          if(!profile){
            throw new Error("User not found");
          }
          const addressData = await B2CUserAddressModel.findAll({
            where: {
              userId: userId
            },
            include:[
              {
                model: AddressModel,
                as: 'address'
              },
              {
                  model: UserModel,
                  as: 'users'
              }
            ]
          })
          return {profile: parseUser(profile), address: addressData};
    
        }catch(error){
          console.log(error);
          return null;
        }
    }
}