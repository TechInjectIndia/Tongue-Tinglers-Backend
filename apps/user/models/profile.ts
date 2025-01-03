const { Op } = require("sequelize");

import { TEditUserProfile, TProfile } from 'types';
import { USER_TYPE } from '../../../interfaces';
import IBaseRepo from '../controllers/IProfileController';
import { UserModel } from './UserTable';

export class ProfileRepo implements IBaseRepo<TProfile> {
    constructor() { }

    public async update(id: number, data: TEditUserProfile): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
                type: USER_TYPE.SUPER_FRANSHISE
            },
        });
    }

    public async get(id: number): Promise<TProfile> {
        const data = await UserModel.findOne({
            raw: true,
            attributes: ['id', 'email', 'firstName', 'lastName', 'phoneNumber', 'profilePhoto', 'status'],
            where: {
                id,
                type: USER_TYPE.SUPER_FRANSHISE
            },
        });
        return data;
    }

}
