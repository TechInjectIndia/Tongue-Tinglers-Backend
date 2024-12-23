import { get } from "lodash";
import { BaseOrder, Order} from '../../../interfaces/orders'
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";

export default class OrderController {
    static async createOrder(req: any, res: any) {
        try {
            const payload:any = req?.body;
            const user_id = get(req, "user_id", 0);
            payload.createdBy = user_id
            if(payload.notes && payload.notes.length > 0){
                payload.notes.map((element)=> {
                    element.isNew = false
                    element.createdBy = user_id
                })
            }
            const order = await RepoProvider.orderRepo.createOrder(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        order,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while creating orders.'),
            );
        }
    }

    static async updateOrder(req: any, res: any) {
        try {
            const payload: any = req?.body;
            payload.id = get(req, "params.id", 0);
            const order = await RepoProvider.orderRepo.updateOrder(payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        order,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while updating orders.'),
            );
        }
    }

    static async getOrderById(req: any, res: any) {
        try {
            const id = get(req, "params.id", 0);
            const order = await RepoProvider.orderRepo.getOrderById(id);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        order,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching orders.'),
            );
        }
    }

    static async getAllOrders(req: any, res: any) {
        try {
            const page = get(req, "query.page", 1);
            const limit = get(req, "query.limit", 10);
            const search = get(req, "query.search", "");
            const filters = get(req, "query.filters", {});
            const orders = await RepoProvider.orderRepo.getAllOrders(page, limit, search, filters);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        orders,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching orders.'),
            );
        }
    }
}