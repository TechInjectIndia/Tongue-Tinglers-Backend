import {
    DTO,
    getSuccessDTO,
    getUnhandledErrorDTO,
} from "../../common/models/DTO";
import { Commission } from "../models/Commission";
import { ICommissionRepo } from "./ICommissionRepo";
import { CommissionModel } from "../db-models/CommissionModel";

class PostgresCommissionRepo implements ICommissionRepo {
    async get(id: string): Promise<DTO<Commission>> {
        try {
            const commission = await CommissionModel.findByPk(id);
            if (!commission) {
                return getUnhandledErrorDTO(
                    `Commission with id ${id} not found`,
                );
            }
            return getSuccessDTO(commission);
        } catch (error: any) {
            const message = `${error.message ?? ""}: error while getting commission`;
            return getUnhandledErrorDTO(message, error);
        }
    }
    async create(commission: Commission): Promise<DTO<Commission>> {
        try {
            const newCommission = await CommissionModel.create(commission);
            return getSuccessDTO(newCommission);
        } catch (error: any) {
            const message = `${error.message ?? ""}: error while creating commission`;
            return getUnhandledErrorDTO(message, error);
        }
    }
}

export { PostgresCommissionRepo };
