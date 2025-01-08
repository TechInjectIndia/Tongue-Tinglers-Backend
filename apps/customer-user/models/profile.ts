const { Op } = require("sequelize");
import {
    TProfile,
    TEditUserProfile,
} from "../../../types/";
import { UserModel } from "../../user/models/UserTable";
import { USER_TYPE } from '../../user/interface/user';
import IBaseRepo from '../controllers/controller/IProfileController';

export class ProfileRepo implements IBaseRepo<TProfile> {
    constructor() { }

    public async update(id: number, data: TEditUserProfile): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
                type: USER_TYPE.GUEST_USER
            },
        });
    }

    public async get(id: number): Promise<TProfile> {
        const data = await UserModel.findOne({
            raw: true,
            attributes: ['id', 'email', 'firstName', 'lastName', 'phoneNumber', 'profilePhoto', 'status'],
            where: {
                id,
                type: USER_TYPE.GUEST_USER
            },
        });
        return data;
    }

}
