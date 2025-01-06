import { NextFunction, Request, Response } from "express";
import { get, pick } from "lodash";
import { IReceiveRawMaterialStock } from "../models/IRawMaterialStock";
import RepoProvider from "apps/RepoProvider";

export class RawMaterialStockController {


    static async getAll(req: Request, res: Response, next: NextFunction) {

        const result = await RepoProvider.rawMaterialStockRepo.getAll(1, 100);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async receiveStock(req: Request, res: Response, next: NextFunction) {

        const user_id = get(req, "user_id", 1);
        const payload = pick(req.body, ["rawMaterialId", "qty",
            "supplierId",
            "unitCost",
            "storageLocationId",
            "factoryGateId",

        ]) as IReceiveRawMaterialStock;

        payload.createdBy = user_id;


        const result = await RepoProvider.rawMaterialStockRepo.receiveStock(payload);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = get(req.params, "id");
        const result = await RepoProvider.rawMaterialStockRepo.getById(Number(id));
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }

    static async getStockIn(req: Request, res: Response, next: NextFunction) {
        const result = await RepoProvider.rawMaterialStockRepo.getStockIn(1, 1000);
        if (!result.success) {
            res.status(500).send(result);
            return;
        }
        res.status(200).send(result);
    }


}