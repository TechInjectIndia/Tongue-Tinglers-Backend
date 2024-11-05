import { Op } from "sequelize";
import { ILead } from "../../../interfaces";
import { LeadsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IFollowUpsController';

export class FollowUpsRepo implements IBaseRepo<ILead, any> {
    constructor() { }

    public async getTodayFollowUps(assignedToId: string, attributes: string[] = []): Promise<ILead[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const data = await LeadsModel.findAll({
            raw: true,
            attributes,
            where: {
                [Op.and]: [
                    {
                        followDetails: {
                            [Op.not]: null,
                            [Op.ne]: [],
                        },
                    },
                    {
                        [Op.or]: [
                            {
                                '$followDetails.followedDate$': {
                                    [Op.gte]: today,
                                    [Op.lt]: tomorrow,
                                },
                            },
                        ],
                    },
                    // { 'assign.assignedTo': assignedToId },
                ],
            },
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

    public async getLeadsByTodayFollowUps(attributes: string[] = []): Promise<ILead[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const data = await LeadsModel.findAll({
            raw: true,
            attributes,
            where: {
                [Op.and]: [
                    {
                        followDetails: {
                            [Op.not]: null,
                            [Op.ne]: [],
                        },
                    },
                    {
                        '$followDetails.followedDate$': {
                            [Op.gte]: today,
                            [Op.lt]: tomorrow,
                        },
                    },
                ],
            },
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
}
