import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { RAW_MATERIAL_STAUS } from "../models/RawMaterialMisc";
import { ICreateRawMaterial } from "../models/IRawMaterial";
import RepoProvider from "apps/RepoProvider";

export class RawMaterialController {

    static async create(req: Request, res: Response, next: NextFunction) {

        const userId = get(req, "user_id",);

        const payload = pick(req.body, ["name", "unitId", "status", "sku", "msq", "priceData", "categoryId", "hsn", "gstPercentage"]) as ICreateRawMaterial;
        payload.status = RAW_MATERIAL_STAUS.ACTIVE;
        payload.createdBy = Number(userId);
        payload.name = payload.name.toLowerCase();
        payload.sku = payload.sku.toLowerCase();


        const result = await RepoProvider.rawMaterialRepo.create(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async update(req: Request, res: Response, next: NextFunction) {

        const id = Number(get(req.params, "id"));
        const userId = get(req, "user_id",);

        const payload = {
            ...req.body,
            updatedBy: Number(userId),
        };

        const result = await RepoProvider.rawMaterialRepo.update(id, payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const ids: any = pick(req.body, "ids");

        const userId = get(req, "user_id",);


        const result = await RepoProvider.rawMaterialRepo.delete(ids, Number(userId));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.rawMaterialRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.rawMaterialRepo.getById(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }


    static async search(req: Request, res: Response, next: NextFunction) {
        const text = get(req.query, "text") as string;
        const supplierId = get(req.query, "supplierId");
        const result = await RepoProvider.rawMaterialRepo.search(text, supplierId ?
            Number(supplierId)
            : undefined);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }
}