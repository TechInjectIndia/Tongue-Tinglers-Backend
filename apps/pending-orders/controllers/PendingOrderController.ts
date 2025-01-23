import { Request, Response } from "express";
import { get } from "lodash";
import { PendingOrderRepo } from "../repos/PendingOrderRepo";

export default class PendingOrderController {

    static async create(req: Request, res: Response) {
        try{
            const user_id = parseInt(get(req, "user_id"));
            if (isNaN(user_id)) throw Error('Missing user_id or isNaN');
            const payload = req.body;
            payload.createdBy = user_id;
            const pendingOrderCreated = await new PendingOrderRepo().create(payload, user_id);
            if(!pendingOrderCreated) throw Error('Error creating pending order');
            return res.send(pendingOrderCreated)
        }catch(error){
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

    static async getPendingOrderById(req: Request, res: Response){
        try{
            const pendingOrderId = parseInt(get(req.params, "id"));
            const pendingOrder = await new PendingOrderRepo().getPendingOrderById(pendingOrderId);
            if(!pendingOrder) throw Error('Error getting pending order');
            return res.send(pendingOrder);
        }catch(error){
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }


    static async getPendingOrderByAttributes(req: Request, res: Response){
        try{
            const payload = req.body;
            const pendingOrder = await new PendingOrderRepo().getPendingOrderByAttributes(payload);
            if(!pendingOrder) throw Error('Error getting pending order');
            return res.send(pendingOrder);
        }catch(error){
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

    static async deleteAllPendingOrderByOrderId(req: Request, res: Response){
        try{
            const pendingOrderId = parseInt(get(req.params, "id"));
            if (isNaN(pendingOrderId)) throw Error('Missing pendingOrderId or isNaN');
            const pendingOrderDeleted = await new PendingOrderRepo().deleteAllPendingOrderByOrderId(pendingOrderId);
            if(!pendingOrderDeleted) throw Error('Error deleting pending order');
            return res.send(pendingOrderDeleted);
        }catch(error){
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

}
