import { Op } from "sequelize";
import { LeadsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IFollowUpsController';
import { LeadTable } from "../interface/lead";

export class FollowUpsRepo implements IBaseRepo<LeadTable, any> {
    constructor() { }

    public async getTodayFollowUps(assignedTo: string, attributes: string[] = []): Promise<LeadTable[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const data = await LeadsModel.findAll({
            raw: true,
            attributes,
            // where: {
            //     [Op.and]: [
            //         {
            //             followDetails: {
            //                 [Op.not]: null,
            //                 [Op.ne]: [],
            //             },
            //         },
            //         {
            //             [Op.or]: [
            //                 {
            //                     '$followDetails.followedDate$': {
            //                         [Op.gte]: today,
            //                         [Op.lt]: tomorrow,
            //                     },
            //                 },
            //             ],
            //         },
            //         // { 'assign.assignedTo': assignedTo },
            //     ],
            // },
            include: [{
                model: LeadsModel,
                as: 'followDetails',
                required: true,
                where: {
                    followedDate: {
                        [Op.gte]: today,
                        [Op.lt]: tomorrow,
                    },
                },
            }],
        });

        return data;
    }

    public async getLeadsByTodayFollowUps(attributes: string[] = []): Promise<LeadTable[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const data = await LeadsModel.findAll({
            raw: true,
            attributes,
            // where: {
            //     [Op.and]: [
            //         {
            //             followDetails: {
            //                 [Op.not]: null,
            //                 [Op.ne]: [],
            //             },
            //         },
            //         {
            //             '$followDetails.followedDate$': {
            //                 [Op.gte]: today,
            //                 [Op.lt]: tomorrow,
            //             },
            //         },
            //     ],
            // },
            include: [{
                model: LeadsModel,
                as: 'followDetails',
                required: true,
                where: {
                    followedDate: {
                        [Op.gte]: today,
                        [Op.lt]: tomorrow,
                    },
                },
            }],
        });

        return data 
    }
}
