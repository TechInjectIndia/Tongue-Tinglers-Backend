// import { NextFunction, Request, Response } from "express";
// import { GalleryRepo } from '../models/GalleryRepo';
// import { sendResponse } from '../../../libraries';
// import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';

// import { get, isEmpty } from "lodash";

// export default class GalleryController {
//     // Search for images by name or message
//     static async searchImages(req: Request, res: Response, next: NextFunction) {
//         const { name, message } = req.query;

//         try {
//             const images = await new GalleryRepo().searchImages(
//                 name as string,
//                 message as string,
//             );

//             return res.status(200).json(images);
//         } catch (error) {
//             console.error('Error searching images:', error);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }

//     static async get(req: Request, res: Response, next: NextFunction) {
//         try {
//             const id = parseInt(get(req.params, "id"));
//             if (isNaN(id)) throw Error('Missing id or isNaN');

//             const existingFranchiseModel = await new GalleryRepo().get(id);

//             if (isEmpty(existingFranchiseModel)) {
//                 return res
//                     .status(400)
//                     .send(
//                         sendResponse(
//                             RESPONSE_TYPE.ERROR,
//                             ERROR_MESSAGE.NOT_EXISTS
//                         )
//                     );
//             }

//             return res
//                 .status(200)
//                 .send(
//                     sendResponse(
//                         RESPONSE_TYPE.SUCCESS,
//                         SUCCESS_MESSAGE.FETCHED,
//                         existingFranchiseModel
//                     )
//                 );
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     // Upload multiple images with details
//     static async uploadImages(req: Request, res: Response, next: NextFunction) {
//         try {
//             const images = req.files as Express.Multer.File[];
//             let imageDetails = req.body.imageDetails;

//             // Check if images were uploaded
//             if (!images || images.length === 0) {
//                 return res.status(400).send({
//                     message: "No images uploaded.",
//                 });
//             }

//             let parsedImageDetails: { name: string; message: string; caption: string }[];
//             if (typeof imageDetails === 'string') {
//                 try {
//                     parsedImageDetails = JSON.parse(imageDetails);
//                 } catch (error) {
//                     return res.status(400).send({
//                         error: true,
//                         message: 'Invalid imageDetails format. It should be a valid JSON string.',
//                     });
//                 }
//             }

//             // Check if the length of both arrays matches
//             if (images.length !== parsedImageDetails.length) {
//                 return res.status(400).send({
//                     error: true,
//                     message: 'The number of images must match the number of image details provided.',
//                 });
//             }

//             type File = Express.Multer.File;

//             // Process each image and upload it
//             const uploadPromises = images.map(async (image: File, index: number) => {
//                 const details = parsedImageDetails[index];
//                 const imageInfo = {
//                     name: details.name || '',
//                     message: details.message || '',
//                     caption: details.caption,
//                 };

//                 const url = await new GalleryRepo().uploadImage(image, imageInfo, 'uploads');
//                 return { originalname: image.originalname, url, name: details.name, message: details.message, caption: imageInfo.caption };
//             });

//             const uploadResults = await Promise.all(uploadPromises);

//             // Return the response with URLs and details
//             return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { uploadResults }));
//         } catch (err) {
//             console.error("Error uploading images:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     static async update(req: Request, res: Response) {
//         try {

//             const id = parseInt(get(req.params, "id"));
//             if (isNaN(id)) throw Error('Missing id or isNaN');

//             let parsedImageDetails: any[] = [];
//             let uploadedFiles: any[] = [];

//             // Parse imageDetails from the request body
//             const { imageDetails } = req.body;
//             if (typeof imageDetails === 'string') {
//                 try {
//                     parsedImageDetails = JSON.parse(imageDetails);
//                 } catch (error) {
//                     return res.status(400).send({
//                         error: true,
//                         message: 'Invalid imageDetails format. It should be a valid JSON string.',
//                     });
//                 }
//             } else {
//                 parsedImageDetails = imageDetails || [];
//             }

//             let result: any;
//             if (req.files && Array.isArray(req.files) && req.files.length > 0) {
//                 uploadedFiles = req.files as Express.Multer.File[];

//                 // Process and upload each file
//                 const uploadPromises = uploadedFiles.map(async (file, index) => {
//                     const details = parsedImageDetails[index] || {};

//                     const fileInfo = {
//                         originalname: file.originalname,
//                         message: details.message || '',
//                         name: details.name || file.originalname,
//                         caption: details.caption || '',
//                     };

//                     const url = await new GalleryRepo().updateFile(id, file, fileInfo, 'uploads');
//                     return { originalname: file.originalname, url, caption: fileInfo.caption };
//                 });

//                 result = await Promise.all(uploadPromises);
//             } else {
//                 // Handle case where only file metadata is updated (no new files uploaded)
//                 const details = parsedImageDetails[0] || {};
//                 const fileInfo = {
//                     message: details.message || '',
//                     name: details.name || '',
//                     caption: details.caption || '',
//                 };

//                 result = await new GalleryRepo().update(id, fileInfo);
//             }

//             // Send success response
//             return res
//                 .status(200)
//                 .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { result }));
//         } catch (err) {
//             console.error('Error:', err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     static async update12(req: Request, res: Response, next: NextFunction) {
//         try {
//             const id = parseInt(get(req.params, "id"));
//             if (isNaN(id)) throw Error('Missing id or isNaN');

//             const payload = req.body;
//             delete payload.id;

//             const payloadUpdated = await new GalleryRepo().update(id, { ...payload });
//             return res
//                 .status(200)
//                 .send(
//                     sendResponse(
//                         RESPONSE_TYPE.SUCCESS,
//                         SUCCESS_MESSAGE.UPDATED,
//                         payloadUpdated
//                     )
//                 );
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     // Get all images
//     static async getImages(req: Request, res: Response, next: NextFunction) {
//         try {
//             const images = await new GalleryRepo().getImages(); // Make sure to implement this method in GalleryRepo
//             return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, images));
//         } catch (err) {
//             console.error("Error fetching images:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     // Delete an image by ID
//     static async deleteImage(req: Request, res: Response, next: NextFunction) {
//         try {
//             const imageId = req.params.id; // Assuming image ID is passed in the path
//             await new GalleryRepo().deleteImage(imageId); // Make sure to implement this method in GalleryRepo
//             return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED));
//         } catch (err) {
//             console.error("Error deleting image:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }
// }
