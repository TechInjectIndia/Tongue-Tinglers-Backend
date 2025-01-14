import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { SUPPLIER_STAUS } from "../models/SupplierMisc";
import RepoProvider from "apps/RepoProvider";

export class SupplierController {

    static async create(req: Request, res: Response, next: NextFunction) {

        const user_id = get(req, "user_id",);

        // const payload: any = pick(req.body, ["name", "email", "phone","address",

        // ]);
        const payload: any = req.body;
        payload.id = null;
        payload.address.id = null;
        payload.name = payload.name.trim().toLowerCase();
        payload.status = SUPPLIER_STAUS.ACTIVE;
        payload.createdBy = user_id;

        const result = await RepoProvider.supplierRepo.create(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async update(req: Request, res: Response, next: NextFunction) {

        const user_id = get(req, "user_id",);

        const id = Number(get(req.params, "id"));
        const payload = {
            ...req.body,
            updatedBy: user_id,
        };
        payload.name = payload.name.trim().toLowerCase();

        const result = await RepoProvider.supplierRepo.update(id, payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async delete(req: Request, res: Response, next: NextFunction) {

        const userId = get(req, "user_id",);

        const ids: any = pick(req.body, "ids");

        const result = await RepoProvider.supplierRepo.delete(ids, Number(userId));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.supplierRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.supplierRepo.getById(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        const text = get(req.query, "text") as string;
        const result = await RepoProvider.supplierRepo.search(text);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }
}