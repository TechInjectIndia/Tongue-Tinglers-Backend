import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { STORAGE_LOCATION_STAUS } from "../models/StorageLocationMisc";
import { ICreateStorageLocation } from "../models/IStorageLocation";
import RepoProvider from "apps/RepoProvider";

export class StorageLocationController {

    static async create(req: Request, res: Response, next: NextFunction) {

        const userId = get(req, "user_id", );

        const payload = pick(req.body, ["name", "description", "type",]) as ICreateStorageLocation;
        payload.status = STORAGE_LOCATION_STAUS.ACTIVE;
        payload.createdBy = Number(userId);

        const result = await RepoProvider.storageLocationRepo.create(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async update(req: Request, res: Response, next: NextFunction) {

        const id = Number(get(req.params, "id"));

        const userId = get(req, "user_id", );
        const payload = {
            ...req.body,
            updatedById: userId,
        };

        const result = await RepoProvider.storageLocationRepo.update(id, payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const ids: any = pick(req.body, "ids");
        const userId = get(req, "user_id",);


        const result = await RepoProvider.storageLocationRepo.delete(ids, Number(userId));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.storageLocationRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.storageLocationRepo.getById(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }
}