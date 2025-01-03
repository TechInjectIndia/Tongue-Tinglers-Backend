// import express from 'express';
// import GalleryController from '../controllers/GalleryController';
// import { } from '../validations/validateGallery';

// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });
// const router = express.Router();

// /**
//  * @swagger
//  * /api/admin/gallery/search:
//  *   get:
//  *     summary: Search for images by name or message
//  *     tags: [Gallery]
//  *     parameters:
//  *       - in: query
//  *         name: name
//  *         schema:
//  *           type: string
//  *         description: Name of the image to search for
//  *       - in: query
//  *         name: message
//  *         schema:
//  *           type: string
//  *         description: Message associated with the image
//  *     responses:
//  *       200:
//  *         description: List of images matching the search criteria
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: string
//  *                   name:
//  *                     type: string
//  *                   message:
//  *                     type: string
//  *                   url:
//  *                     type: string
//  *       400:
//  *         description: Bad request
//  */
// router.get('/search', GalleryController.searchImages);

// /**
//  * @swagger
//  * /api/admin/gallery:
//  *   post:
//  *     summary: Upload multiple images with individual names, messages, and caption status
//  *     tags: [Gallery]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - files
//  *               - imageDetails
//  *             properties:
//  *               files:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: binary
//  *               imageDetails:
//  *                 type: string
//  *                 description: A JSON string representation of an array of image details
//  *                 example: '[{"name": "image1.jpg", "message": "This is image 1", "caption": "true"}, {"name": "image2.jpg", "message": "This is image 2", "caption": "false"}]'
//  *     responses:
//  *       '200':
//  *         description: Uploaded successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  */
// router.post('/', upload.array('files'), GalleryController.uploadImages);

// /**
//  * @swagger
//  * /api/admin/gallery:
//  *   get:
//  *     summary: Get all images
//  *     tags: [Gallery]
//  *     responses:
//  *       200:
//  *         description: List of images
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   name:
//  *                     type: string
//  *                   url:
//  *                     type: string
//  *       400:
//  *         description: Bad request
//  */
// router.get('/', GalleryController.getImages);

// /**
//  * @swagger
//  * /api/admin/gallery/{id}:
//  *   delete:
//  *     summary: Delete an image
//  *     tags: [Gallery]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the image to delete
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Image deleted successfully
//  *       404:
//  *         description: Image not found
//  *       400:
//  *         description: Bad request
//  */
// router.delete('/:id', GalleryController.deleteImage);

// /**
//  * @swagger
//  * /api/admin/gallery/{id}:
//  *   put:
//  *     summary: Update image details and optionally upload new images
//  *     tags: [Gallery]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the image to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               files:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: binary
//  *               imageDetails:
//  *                 type: string
//  *                 description: A JSON string representation of an array of image details
//  *                 example: '[{"name": "image1.jpg", "message": "This is image 1", "caption": "true"}, {"name": "image2.jpg", "message": "This is image 2", "caption": "false"}]'
//  *     responses:
//  *       '200':
//  *         description: Updated successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  */
// router.put("/:id", upload.array('files'), GalleryController.update);

// /**
//  * @swagger
//  * /api/admin/gallery/get/{id}:
//  *   get:
//  *     summary: Get by ID
//  *     tags: [Gallery]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: uuid
//  *         description: ID to retrieve
//  *     responses:
//  *       '200':
//  *         description: Data retrieved successfully
//  *         content:
//  *           application/json:
//  *       '401':
//  *         description: Unauthorized
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Unauthorized access"
//  *       '404':
//  *         description: Data not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Data not found"
//  */
// router.get("/get/:id", GalleryController.get);

// export default router;