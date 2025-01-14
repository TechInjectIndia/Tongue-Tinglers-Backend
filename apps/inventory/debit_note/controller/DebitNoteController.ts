import { NextFunction, Request, Response } from "express";
import { IMarkDebitNotePaid } from "../models/IDebitNote";
import { get } from "lodash";
import RepoProvider from "apps/RepoProvider";

export class DebitNoteController {

    static async create(req: Request, res: Response, next: NextFunction) {

        // const userId = get(req, "user_id");

        // const payload = pick(req.body, ["name", "status",]) as ICreateDebitNote;
        // payload.status = ITEM_CATEGORY_STAUS.ACTIVE;
        // payload.createdById = Number(userId);
        // payload.name = payload.name.toLowerCase();

        // const result = await RepoProvider.DebitNoteRepo.create(payload);
        // if (!result.success) {
        //     res.status(500).send(result);
        //     return;
        // }
        // res.status(200).send(result);
    }

    static async markPaid(req: Request, res: Response, next: NextFunction) {

        const userId = get(req, "user_id");

        const payload: IMarkDebitNotePaid = {
            purchaseInvoiceId: req.body.purchaseInvoiceId,
            note: req.body.note,
            updatedId: Number(userId),
        };

        const result = await RepoProvider.debitNoteRepo.markPaid(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }



    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.debitNoteRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getByPurchasInvoiceId(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.debitNoteRepo.getByPurchasInvoiceId(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }


}