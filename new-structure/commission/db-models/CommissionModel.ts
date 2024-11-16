import { Model } from "sequelize";
import { Commission } from "../models/Commission";

class CommissionModel extends Model<Commission> implements Commission {
    id: string;
    updatedBy: string;
    updatedAt: Date;
    createdBy: string;
    createdAt: Date;
    deletedBy: string;
    deletedAt: Date;

    title: string;
    from: Date;
    to: Date;
    status: string;
}

export { CommissionModel };
