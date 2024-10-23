import { NextFunction, Request, Response } from "express";
import { GalleryRepo } from '../models/GalleryRepo';
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { Multer } from 'multer';
import { get, isEmpty } from "lodash";

export default class GalleryController {
    // Search for images by name or message
    static async searchImages(req: Request, res: Response, next: NextFunction) {
        const { name, message } = req.query;

        try {
            const images = await new GalleryRepo().searchImages(
                name as string,
                message as string,
            );

            return res.status(200).json(images);
        } catch (error) {
            console.error('Error searching images:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Upload multiple images with details
    static async uploadImages(req: Request, res: Response, next: NextFunction) {
        try {
            const images = req.files as Multer.File[];
            let imageDetails = req.body.imageDetails;

            // Check if images were uploaded
            if (!images || images.length === 0) {
                return res.status(400).send({
                    message: "No images uploaded.",
                });
            }

            let parsedImageDetails: { name: string; message: string; caption: string }[];
            if (typeof imageDetails === 'string') {
                try {
                    parsedImageDetails = JSON.parse(imageDetails);
                } catch (error) {
                    return res.status(400).send({
                        error: true,
                        message: 'Invalid imageDetails format. It should be a valid JSON string.',
                    });
                }
            }

            // Check if the length of both arrays matches
            if (images.length !== parsedImageDetails.length) {
                return res.status(400).send({
                    error: true,
                    message: 'The number of images must match the number of image details provided.',
                });
            }

            // Process each image and upload it
            const uploadPromises = images.map(async (image: Multer.File, index: number) => {
                const details = parsedImageDetails[index];
                const imageInfo = {
                    originalname: image.originalname,
                    message: details.message || '',
                    name: details.name || '',
                    caption: details.caption,
                };

                const url = await new GalleryRepo().uploadImage(imageInfo, 'uploads');
                return { originalname: image.originalname, url, name: details.name, message: details.message, caption: imageInfo.caption };
            });

            const uploadResults = await Promise.all(uploadPromises);

            // Return the response with URLs and details
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { uploadResults }));
        } catch (err) {
            console.error("Error uploading images:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            const payload = req?.body;
            delete payload.id;

            const payloadUpdated = await new GalleryRepo().update(id as string, { ...payload });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        payloadUpdated
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Get all images
    static async getImages(req: Request, res: Response, next: NextFunction) {
        try {
            const images = await new GalleryRepo().getImages(); // Make sure to implement this method in GalleryRepo
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, images));
        } catch (err) {
            console.error("Error fetching images:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Delete an image by ID
    static async deleteImage(req: Request, res: Response, next: NextFunction) {
        try {
            const imageId = req.params.id; // Assuming image ID is passed in the path
            await new GalleryRepo().deleteImage(imageId); // Make sure to implement this method in GalleryRepo
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED));
        } catch (err) {
            console.error("Error deleting image:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
