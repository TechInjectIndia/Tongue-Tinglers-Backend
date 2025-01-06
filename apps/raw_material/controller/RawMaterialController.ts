import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { RAW_MATERIAL_STAUS } from "../models/RawMaterialMisc";
import { ICreateRawMaterial, IRawMaterial } from "../models/IRawMaterial";
import RepoProvider from "apps/RepoProvider";

export class RawMaterialController {

    static async create(req: Request, res: Response, next: NextFunction) {


        const user_id = get(req, "user_id", 1);

        const payload = pick(req.body, ["name", "unitId", "status", "sku", "msq", "priceData", "categoryId",]) as ICreateRawMaterial;
        payload.status = RAW_MATERIAL_STAUS.ACTIVE;
        payload.createdBy = user_id;
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

        const user_id = get(req, "user_id", 1);

        const id = Number(get(req.params, "id"));
        const payload: ICreateRawMaterial = {
            ...req.body,
            updatedBy: user_id,
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

        const result = await RepoProvider.rawMaterialRepo.delete(ids, 1);
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
}