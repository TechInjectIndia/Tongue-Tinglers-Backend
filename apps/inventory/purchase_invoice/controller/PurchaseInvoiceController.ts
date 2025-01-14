import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { IPurchaseInvoiceRequest } from "../models/IPurchaseInvoice";
import { PURCHASE_INVOICE_STATUS } from "../models/PurchaseInvoiceMisc";
import RepoProvider from "apps/RepoProvider";

export class PurchaseInvoiceController {

    static async create(req: Request, res: Response, next: NextFunction) {

        const userId = get(req, "user_id",);

        const payload: IPurchaseInvoiceRequest = {
            invoiceNumber: req.body.invoiceNumber,
            invoiceDate: req.body.invoiceDate,
            supplierId: req.body.supplierId,
            status: PURCHASE_INVOICE_STATUS.ACTIVE,
            createdBy: Number(userId),
            factoryGateId: req.body.factoryGateId,
            rawMaterials: req.body.rawMaterials,
            poNumber: req.body.poNumber,
            poDate: req.body.poDate,
            purchasedById: req.body.purchasedById,
        };

        const result = await RepoProvider.purchaseInvoiceRepo.create(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    // static async update(req: Request, res: Response, next: NextFunction) {

    //     const id = Number(get(req.params, "id"));
    //     const payload = {
    //         ...req.body,
    //         updatedById: 1,
    //     };

    //     const result = await RepoProvider.factoryGateRepo.update(id, payload);
    //     if (!result.success) {
    //         res.status(500).send(result);
    //         return;
    //     }
    //     res.status(200).send(result);
    // }

    // static async delete(req: Request, res: Response, next: NextFunction) {
    //     const ids: any = pick(req.body, "ids");

    //     const result = await RepoProvider.factoryGateRepo.delete(ids, 1);
    //     if (!result.success) {
    //         res.status(500).send(result);
    //         return;
    //     }
    //     res.status(200).send(result);
    // }

    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.factoryGateRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.factoryGateRepo.getById(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }
}