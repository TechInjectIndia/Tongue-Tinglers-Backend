
import {APIResponse} from "../../common/models/Base";
import {ICommissionController} from "./ICommissionController";
import {NextFunction, Request, Response} from "express";
import {get} from "lodash";


import RepoProvider from "../../RepoProvider";
import { COMMISSION_PAID_STATUS, OrganizationCommissions } from "../model/CommissionEntityMapTable";
import { CommissionTable } from "../model/CommmisionTable";

export class PostgresCommissionController implements ICommissionController {
    async getMappingsData(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const result = await RepoProvider.commissionRepo.getMappingsData();
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    async searchCommission(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const title = get(req.query, "title").toString();
        const type = get(req.query, "type")?.toString();

        if (!title) {
            res.status(400).send({
                success: false,
                message: "Missing title or type",
            });
            return;
        }

        const result = await RepoProvider.commissionRepo.search(title, type);

        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    async createMapEntry(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        /* prepare the input */
        const user_id = get(req, "user_id");
        const franchiseId = get(req.body, "franchiseId");
        const mappings = get(req.body, "mappings") as OrganizationCommissions[];

        const entries: any[] = [];

        for (const commission of mappings) {
            entries.push({
                createdBy: user_id,
                franchiseId: franchiseId,
                commissionId: commission.commissionId,
                organizationId: commission.organizationId,
                status: COMMISSION_PAID_STATUS.PENDING,
            });
        }

        const result = await RepoProvider.commissionRepo.createMapEntities(
            entries);
        if (!result.success) {
             res.status(500).send(result);
             return ;
        }
        res.status(200).send(result);
    }

    updateMapEntry(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<APIResponse<null>> {
        throw new Error("Method not implemented.");
    }

    async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<APIResponse<CommissionTable>> {

        const id = parseInt(get(req.params, "id"));
        if(isNaN(id)) throw Error('Missing id or isNaN')
        const result = await RepoProvider.commissionRepo.getById(id);

        if (!result.success) {
             res.status(500).send(result);
             return;
        }
        res.status(200).send(result);
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        /* prepare the input */

        const user_id = parseInt(get(req, "user_id"));
        if (isNaN(user_id)) throw Error('Missing user_id or isNaN');

        const ids = get(req.body, "ids");

        // Check if ids exists and is an array
        if (!ids || !Array.isArray(ids)) {
            throw Error('ids must be an array');
        }

        // Convert strings to numbers and validate
        const numericIds = ids.map(id => {
            const num = typeof id === 'string' ? parseInt(id) : id;
            if (typeof num !== 'number' || isNaN(num)) {
                throw Error('all ids must be valid numbers or numeric strings');
            }
            return num;
        });

        if (numericIds.length === 0) {
            throw Error('ids array is empty');
        }

        const result = await RepoProvider.commissionRepo.delete(ids, user_id);

        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const result = await RepoProvider.commissionRepo.getAll();

        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<APIResponse<CommissionTable>> {
        /* prepare the input */
        const user_id = get(req, "user_id", "");

        const input = {...req.body, createdBy: user_id};

        input.title = input.title.trim().toLowerCase();

        // const isTitleAlreadyExists = await
        // RepoProvider.commissionRepo.isTitleAlreadyExists(input.title.trim());

        // if (!isTitleAlreadyExists.success) {
        //     return res.status(500).send(isTitleAlreadyExists);
        // }
        // else if (isTitleAlreadyExists.data) {
        //     return res.status(400).send({
        //         success: false,
        //         message: isTitleAlreadyExists.message,
        //         data: null,

        //     });
        // }

        const result = await RepoProvider.commissionRepo.create(input);
        if (!result.success) {
             res.status(500).send(result);
             return;
        }
        res.status(200).send(result);
    }

    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<APIResponse<CommissionTable>> {
        /* prepare the input */

        const user_id = parseInt(get(req, "user_id"));
        if (isNaN(user_id)) throw Error('Missing user_id or isNaN');

        const id = parseInt(get(req, "id"));
        if (isNaN(id)) throw Error('Missing id or isNaN');


        const input = {...req.body, updatedBy: user_id};
        input.title = input.title.trim().toLowerCase();

        // const isTitleAlreadyExists = await
        // RepoProvider.commissionRepo.isTitleAlreadyExists(input.title.trim());

        // if (!isTitleAlreadyExists.success) {
        //     return res.status(500).send(isTitleAlreadyExists);
        // }
        // else if (isTitleAlreadyExists.data) {
        //     return res.status(400).send({
        //         success: false,
        //         message: isTitleAlreadyExists.message,
        //         data: null,

        //     });
        // }

        const result = await RepoProvider.commissionRepo.update(id, input);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    async updateCommisionEntityStatus(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id = parseInt(get(req.params, "id"));
        if (isNaN(id)) throw Error('Missing id or isNaN');

        const status = get(req.body, "status");

        const result = await RepoProvider.commissionRepo.updateCommisionEntityStatus(id, status);

        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }
}
