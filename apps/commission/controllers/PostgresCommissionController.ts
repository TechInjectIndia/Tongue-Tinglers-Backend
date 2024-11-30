import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { APIResponse } from "../../common/models/ApiResponse";
import { ICommissionController } from "./ICommissionController";
import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { RepoProvider } from "../../common/utils/RepoProvider";
import { COMMISSION_PAID_STATUS, OrganizationCommissions } from "../../../database/schema/commission/CommissionAndEntityMappingTable";

export class PostgresCommissionController implements ICommissionController {
    async searchCommission(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable[]>> {

        const title = get(req.query, "title");

        const result = await RepoProvider.commissionRepo.search(title);

        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }

    async createMapEntry(req: Request, res: Response, next: NextFunction): Promise<APIResponse<null>> {
        /* prepare the input */
        const user_id = get(req, 'user_id',);
        const franchiseId = get(req.body, 'franchiseId',);
        const commissionsData = get(req.body, 'commissionData',) as OrganizationCommissions[];



        const entries: any[] = [];

        for (const commission of commissionsData) {
            entries.push({
                createdBy: user_id,
                franchiseId: franchiseId,
                commissionId: commission.commissionId,
                organizationId: commission.organizationId,
                status: COMMISSION_PAID_STATUS.PENDING,
            });
        }




        const result = await RepoProvider.commissionRepo.createMapEntities(entries);
        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    }

    updateMapEntry(req: Request, res: Response, next: NextFunction): Promise<APIResponse<null>> {
        throw new Error("Method not implemented.");
    }


    async getById(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>> {
        const id = get(req.params, "id");
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

        input.title = input.title.trim().toLowerCase();

        const isTitleAlreadyExists = await RepoProvider.commissionRepo.isTitleAlreadyExists(input.title.trim());


        if (!isTitleAlreadyExists.success) {
            return res.status(500).send(isTitleAlreadyExists);
        }
        else if (isTitleAlreadyExists.data) {
            return res.status(400).send({
                success: false,
                message: isTitleAlreadyExists.message,
                data: null,

            });
        }


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
        input.title = input.title.trim().toLowerCase();

        const isTitleAlreadyExists = await RepoProvider.commissionRepo.isTitleAlreadyExists(input.title.trim());


        if (!isTitleAlreadyExists.success) {
            return res.status(500).send(isTitleAlreadyExists);
        }
        else if (isTitleAlreadyExists.data) {
            return res.status(400).send({
                success: false,
                message: isTitleAlreadyExists.message,
                data: null,

            });
        }


        const result = await RepoProvider.commissionRepo.update(id, input);
        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }


}