import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { FranchiseModelRepo } from '../models';
import { ImageRepo } from '../models/ImageRepo';
import { ExtraFieldRepo } from '../models/ExtraFieldRepo';

export default class FranchiseModelController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '');
            const { images, others, ...franchiseData } = req.body;

            // Create Franchise Model
            const franchiseModel = await new FranchiseModelRepo().create({ ...franchiseData, user_id });

            // Create Images
            if (images && images.length > 0) {
                const imagePromises = images.map(async image =>
                    await new ImageRepo().create({ ...image, franchiseModelId: franchiseModel.id })
                );
                await Promise.all(imagePromises);
            }

            // Create Extra Fields
            if (others && others.length > 0) {
                const extraFieldPromises = others.map(async extra =>
                    await new ExtraFieldRepo().create({ ...extra, franchiseModelId: franchiseModel.id })
                );
                await Promise.all(extraFieldPromises);
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.CREATED,
                    franchiseModel
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");
            const user_id = get(req, 'user_id', 0);

            const FranchiseModels = await new FranchiseModelRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        FranchiseModels
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, "id", 0);
            const user_id = get(req, 'user_id', 0);
            const { images, others, ...franchiseData } = req.body;

            // Update Franchise Model
            delete franchiseData.images
            delete franchiseData.others
            const franchiseModel = await new FranchiseModelRepo().update(id as number, { ...franchiseData, user_id });

            // Update Images  
            if (images && images.length > 0) {
                const imageRepo = new ImageRepo();

                // Separate images with and without id
                const imagesWithId = images.filter((image: any) => image.id);
                const newImages = images.filter((image: any) => !image.id);

                // Update images with id
                const updatePromises = imagesWithId.map(async (image) => {
                    return await imageRepo.update(image.id, { ...image, franchiseModelId: id as string });
                });

                // Add new images without id
                const createPromises = newImages.map(async (image) => {
                    return await imageRepo.create({ ...image, franchiseModelId: id as string });
                });

                await Promise.all([...updatePromises, ...createPromises]);
            }

            // Update Extra Fields
            if (others && others.length > 0) {
                // First, delete any existing extra fields associated with the franchise model
                await new ExtraFieldRepo().deleteByFranchiseModelId(id as number);

                // Add new extra fields
                const extraFieldPromises = others.map(async (extra) =>
                    await new ExtraFieldRepo().create({ ...extra, franchiseModelId: id as number })
                );
                await Promise.all(extraFieldPromises);
            }

            return res.status(200).send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.UPDATED,
                    franchiseModel
                )
            );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
            const user_id = get(req, 'user_id', 0);

            const existingFranchiseModel = await new FranchiseModelRepo().get(id as number);

            if (isEmpty(existingFranchiseModel)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingFranchiseModel
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");
            const user_id = get(req, 'user_id', 0);

            const FranchiseModel = await new FranchiseModelRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        FranchiseModel
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}