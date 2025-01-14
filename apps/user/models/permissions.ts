// const { Op } = require("sequelize");
// import {
//     TPermission,
//     TPermissionPayload,
//     TPermissionFilters,
//     TPermissionsList,
//     TUser,
//     TListFilters
// } from "../../../types";

// import IBaseRepo from '../controllers/IPermissionsController';
// import { USER_TYPE } from '../../../interfaces';

// export class PermissionsRepo implements IBaseRepo<TPermission, TListFilters> {
//     constructor() { }

//     public async getPermissionByName(name: string): Promise<TPermission> {
//         const data = await PermissionModel.findOne({
//             where: {
//                 name,
//             },
//         });
//         return data;
//     }

//     public async checkPermissionExist(name: string, excludeId: number): Promise<TPermission> {
//         const data = await PermissionModel.findOne({
//             where: {
//                 name: name,
//                 id: { [Op.ne]: excludeId }, // Sequelize.Op.ne means "not equal"
//             },
//         });
//         return data;
//     }

//     public async get(id: number): Promise<TPermission> {
//         const data = await PermissionModel.findOne({
//             where: {
//                 id,
//             },
//         });
//         return data;
//     }

//     public async list(filters: TPermissionFilters): Promise<TPermissionsList> {
//         const total = await PermissionModel.count({
//             where: {
//                 name: {
//                     [Op.iLike]: `%${filters.search}%`,
//                 },
//             },
//         });
//         const data = await PermissionModel.findAll({
//             order: [filters?.sorting],
//             offset: filters.offset,
//             limit: filters.limit,
//             raw: true,
//             where: {
//                 name: {
//                     [Op.iLike]: `%${filters.search}%`,
//                 },
//             },
//         });
//         return { total, data };
//     }

//     public async create(data: TPermissionPayload): Promise<TPermission> {
//         const response = await PermissionModel.create(data);
//         return response;
//     }

//     public async update(id: number, data: TPermissionPayload): Promise<[affectedCount: number]> {
//         const response = await PermissionModel.update(data, {
//             where: {
//                 id,
//             },
//         });
//         return response;
//     }

//     public async getPermissionAssigneeByPermissionId(ids: number[]): Promise<TUser[]> {
//         const data = await UserModel.findAll({
//             where: {
//                 role: ids,
//                 type: USER_TYPE.SUPER_FRANSHISE
//             },
//         });
//         return data;
//     }
// }
