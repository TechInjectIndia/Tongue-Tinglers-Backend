
import { get } from "lodash";
import { ERROR_MESSAGE, RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import {NextFunction, Request, Response} from "express";
import { B2CUserAddressRepo } from "../repos/B2CUserAddressRepo";
import { sendResponse } from "libraries";

export default class B2CUserAddressController {
    static async save(req: Request, res: Response){
        try{
            const user_id = parseInt(get(req, "user_id"));
            if (!user_id) {
                throw Error('Missing user_id or isNaN');
            }
            const payload = {
                userId: user_id,
                address: req.body.address,
            }

            const guestUserAddress = await new B2CUserAddressRepo().save(payload);
            
            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, guestUserAddress.B2CAddress));
            
        }catch(error){
            console.error(error);
            return res
                .status(500)
            .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async getAddressByUserId(req: Request, res: Response){
        try{
            const user_id = parseInt(get(req, "user_id"));
            if (!user_id) {
                throw Error('Missing user_id or isNaN');
            }
            const guestUserAddress = await new B2CUserAddressRepo().getAddressByUserId(user_id);
            if(!guestUserAddress){
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }
            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, guestUserAddress));
        }catch(error){
            console.error(error);
            return res
                .status(500)
            .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async updateAddressById(req: Request, res: Response){
        try{
            const addressId = parseInt(get(req.params, "id"));
            const user_id = parseInt(get(req, "user_id"));
            if (!user_id) {
                throw Error('Missing user_id or isNaN');
            }
            if (!addressId) {
                throw Error('Missing addressId or isNaN');
            }
            const payload = {
                address: req.body.address,
                userId: user_id
            }

            const guestUserAddress = await new B2CUserAddressRepo().update(addressId, payload);

            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, guestUserAddress));

        }catch(error){
            console.error(error);
            return res
                .status(500)
            .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async deleteAddressById(req: Request, res: Response){
        try{
            const addressId = parseInt(get(req.params, "id"));
            if (!addressId) {
                throw Error('Missing addressId or isNaN');
            }
            const guestUserAddress = await new B2CUserAddressRepo().deleteAddressById(addressId);
            if(!guestUserAddress){
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }
            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED, guestUserAddress));
        }catch(error){
            console.error(error);
            return res
                .status(500)
            .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async getProfileOfB2CUser(req: Request, res: Response){
        try{
            const user_id = parseInt(get(req, "user_id"));
            if (!user_id) {
                throw Error('Missing user_id or isNaN');
            }
            const guestUserAddress = await new B2CUserAddressRepo().getProfileOfB2CUser(user_id);
            if(!guestUserAddress){
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }
            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, guestUserAddress));
        }catch(error){
            console.error(error);
            return res
                .status(500)
            .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }
}