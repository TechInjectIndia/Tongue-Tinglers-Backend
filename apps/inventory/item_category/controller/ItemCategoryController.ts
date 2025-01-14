import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { ITEM_CATEGORY_STAUS } from "../models/ItemCategoryMisc";
import { ICreateItemCategory } from "../models/IItemCategory";
import RepoProvider from "apps/RepoProvider";

export class ItemCategoryController {

    static async create(req: Request, res: Response, next: NextFunction) {

        const userId = get(req, "user_id");

        const payload = pick(req.body, ["name", "status",]) as ICreateItemCategory;
        payload.status = ITEM_CATEGORY_STAUS.ACTIVE;
        payload.createdBy = Number(userId);
        payload.name = payload.name.toLowerCase();

        const result = await RepoProvider.itemCategoryRepo.create(payload);
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

        const result = await RepoProvider.itemCategoryRepo.update(id, payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const ids: any = pick(req.body, "ids");
        const userId = get(req, "user_id",);


        const result = await RepoProvider.itemCategoryRepo.delete(ids, Number(userId));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.itemCategoryRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.itemCategoryRepo.getById(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        const text = get(req.query, "text") as string;
        const result = await RepoProvider.itemCategoryRepo.search(text);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }
}