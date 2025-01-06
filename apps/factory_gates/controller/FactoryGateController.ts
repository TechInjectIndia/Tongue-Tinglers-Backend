import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { FACTORY_GATE_STAUS } from "../models/FactoryGateMisc";
import RepoProvider from "apps/RepoProvider";
import { IFactoryGate } from "../models/IFactoryGate";

export class FactoryGateController {

    static async create(req: Request, res: Response, next: NextFunction) {

        const user_id = get(req, "user_id");
        const payload = pick(req.body, ["name", "description",]) as IFactoryGate;
        payload.status = FACTORY_GATE_STAUS.ACTIVE;
        payload.createdBy = user_id;

        const result = await RepoProvider.factoryGateRepo.create(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async update(req: Request, res: Response, next: NextFunction) {

        const user_id = get(req, "user_id");
        const id = Number(get(req.params, "id"));
        const payload = {
            ...req.body,
            updatedBy: user_id,
        };

        const result = await RepoProvider.factoryGateRepo.update(id, payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const ids: any = pick(req.body, "ids");

        const result = await RepoProvider.factoryGateRepo.delete(ids, 1);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

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