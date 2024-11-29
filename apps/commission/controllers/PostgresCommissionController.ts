import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { APIResponse } from "../../common/models/ApiResponse";
import { ICommissionController } from "./ICommissionController";
import { PostgresCommissionRepo } from "../repositories/PostgresCommissionRepo";
import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { HelperMethods } from "../../common/utils/HelperMethods";
import { RepoProvider } from "../../common/utils/RepoProvider";

export class PostgresCommissionController implements ICommissionController {
    async getById(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>> {
        /* prepare the input */
        const id = get(req.params, 'id');

        const result = await RepoProvider.commissionRepo.getById(id);

        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<APIResponse<boolean>> {
        /* prepare the input */
        const userId = get(req, 'user_id');

        const ids = get(req.body, 'ids');


        const result = await RepoProvider.commissionRepo.delete(ids, userId);

        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable[]>> {
        const result = await RepoProvider.commissionRepo.getAll();

        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>> {
        /* prepare the input */
        const user_id = get(req, 'user_id', '');

        const input = { ...req.body, createdBy: user_id };

        const result = await RepoProvider.commissionRepo.create(input);
        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }

    async update(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>> {

        /* prepare the input */
        const user_id = get(req, 'user_id');


        const id = get(req.params, "id");


        const input = { ...req.body, updatedBy: user_id };


        const result = await RepoProvider.commissionRepo.update(id, input);
        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }
}