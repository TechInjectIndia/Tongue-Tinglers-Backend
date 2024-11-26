import { CommissionTable } from "../../../database/schema/commission/CommissionTable";
import { APIResponse } from "../../common/models/ApiResponse";
import { ICommissionController } from "./ICommissionController";
import { PostgresCommisionRepo } from "../repositories/PostgresCommisionRepo";
import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { HelperMethods } from "../../common/utils/HelperMethods";

export class PostgresCommisionController implements ICommissionController {
    async create(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>> {
        /* prepare the input */
        const user_id = get(req, 'user_id', '');

        const input = { ...req.body, createdBy: user_id };

        const result = await new PostgresCommisionRepo().create(input);
        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }

    async update(req: Request, res: Response, next: NextFunction): Promise<APIResponse<CommissionTable>> {
        /* get params */
        const id = get(req.params, "id", 0);

        if (!id || typeof id !== 'number' || id <= 0) {
            return res.status(400).send(HelperMethods.getErrorResponse('Invalid request'));
        }

        /* prepare the input */
        const user_id = get(req, 'user_id', '');

        const input = { ...req.body, updatedBy: user_id };

        const result = await new PostgresCommisionRepo().update(id, input);
        if (!result.success) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);

    }
}