// src/controllers/CampaignController.ts
import {NextFunction, Request, Response} from "express";
import {get, isEmpty} from "lodash";
import {sendResponse} from "../../../libraries"; // Adjust this import path as
                                                 // necessary
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "../../../constants"; // Adjust this import path as necessary
import {OrganizationRepo} from "../models";
import {
    IOrganizationPayloadDataWithMeta,
    Organization,
} from "../../../interfaces/organization";
import {Pagination} from "../../../interfaces";
import {ContractRepo} from "../../contracts/models/ContractRepo";
import { ContractsPayload } from "../../contracts/interface/contracts";

export default class OrganizationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, "user_id", 1);

            console.log(user_id);

            const body = req.body;

            const prospectId = body.prospectId ?? null;

            console.log(prospectId);


            const payload: IOrganizationPayloadDataWithMeta = {
                ...req.body,
                createdBy: 1,
                rootUser: 1,
            };
            const data = await new OrganizationRepo().create(payload, user_id);

            if (prospectId) {
                await new ContractRepo().update(prospectId,
                    {organizationId: data.id} as Partial<ContractsPayload>);
            }
            return res
                .status(201)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED,
                        data),
                );
        }
        catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = parseInt(get(req.params, "id", ));
            if(!id || isNaN(id)) throw Error("missing id in params")
            // todo remove type casting
            const existingOrganization = await new OrganizationRepo().get(
                id
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.NOT_EXISTS));
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingOrganization,
                    ),
                );
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const user_id = get(req, "user_id", "");
            const id = get(req.params, "id", "");
            const payload = {...req.body, createdBy: user_id};

            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number,
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.NOT_EXISTS));
            }

            const updatedOrganization = await new OrganizationRepo().update(
                id as unknown as number,
                payload,
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedOrganization,
                    ),
                );
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");

            const existingOrganization = await new OrganizationRepo().get(
                id as unknown as number,
            );
            if (isEmpty(existingOrganization)) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.NOT_EXISTS));
            }

            const deletedCount = await new OrganizationRepo().delete(id);

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED, {
                    deletedCount,
                }),
            );
        }
        catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }


    static async list(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const page = parseInt(get(req.query, 'page').toString(), 0) || 1;
            const limit = parseInt(get(req.query, 'limit').toString(), 10) ||
                10;

            const search = <string>get(req.query, "search", ""); // For text search
            const filters = <string>get(req.query,"filters");

            // Parse filters into an object
            let filterObj = {};
            if (filters) {
                try {
                    filterObj = JSON.parse(filters);
                }
                catch (error) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                "Invalid filter format. It should be a valid JSON string.",
                            ),
                        );
                }
            }
            const Franchise: Pagination<Organization> =
                await new OrganizationRepo().list(page, limit, search,
                    filterObj);
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, {
                    ...Franchise,
                    currentPage: page,
                }),
            );
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }
}
