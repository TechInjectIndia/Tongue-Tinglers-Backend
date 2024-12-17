import {Request, Response} from "express";
import {get} from "lodash";
import {sendResponse,} from "../../../libraries";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "../../../constants";
import RepoProvider from "../../RepoProvider";
import {Franchise, FranchiseDetails, Pagination} from "../../../interfaces";

export default class FranchiseController {
    static async createFranchise(req: Request, res: Response) {
        try {
            const payload = req.body;
            const user_id = parseInt(get(req, "user_id"));
            if (isNaN(user_id)) throw Error('Missing user_id or isNaN');

            const franchise: FranchiseDetails = {
                ...payload,
                createdBy: user_id,
            };


            const franchiseDetails = await RepoProvider.franchise.create(
                franchise);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        franchiseDetails,
                    ),
                );
        }
        catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getById(req: Request, res: Response) {

        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            const franchiseDetails = await RepoProvider.franchise.getById(id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        franchiseDetails,
                    ),
                );
        }
        catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page.toString(), 0) || 1;
            const limit = parseInt(req.query.limit.toString(), 10) || 10;
            const search = (req.query.search as string) || ''; // For text
                                                               // search
            const filters = (req.query.filters as string) || '';

            // Parse filters into an object
            let filterObj = {};
            if (filters) {
                try {
                    filterObj = JSON.parse(filters);
                }
                catch (error) {
                    return res.status(400).send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            'Invalid filter format. It should be a valid JSON string.',
                        ),
                    );
                }
            }
            const Franchise: Pagination<Franchise> = await RepoProvider.franchise.getAll(
                page, limit, search, filterObj);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        {
                            ...Franchise,
                            currentPage: page,
                        }
                    ),
                );

        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

}
