import express from 'express';
import GalleryController from '../controllers/GalleryController';
import { } from '../validations/validateGallery';

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/**
 * @swagger
 * /api/admin/gallery/search:
 *   get:
 *     summary: Search for images by name or message
 *     tags: [Gallery]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the image to search for
 *       - in: query
 *         name: message
 *         schema:
 *           type: string
 *         description: Message associated with the image
 *     responses:
 *       200:
 *         description: List of images matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   message:
 *                     type: string
 *                   url:
 *                     type: string
 *       400:
 *         description: Bad request
 */
router.get('/search', GalleryController.searchImages);

/**
 * @swagger
 * /api/admin/gallery:
 *   post:
 *     summary: Upload multiple images with individual names, messages, and caption status
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *               - imageDetails
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               imageDetails:
 *                 type: string
 *                 description: A JSON string representation of an array of image details
 *                 example: '[{"name": "image1.jpg", "message": "This is image 1", "caption": "true"}, {"name": "image2.jpg", "message": "This is image 2", "caption": "false"}]'
 *     responses:
 *       '200':
 *         description: Uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post('/', upload.array('files'), GalleryController.uploadImages);

/**
 * @swagger
 * /api/admin/gallery:
 *   get:
 *     summary: Get all images
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: List of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   url:
 *                     type: string
 *       400:
 *         description: Bad request
 */
router.get('/', GalleryController.getImages);

/**
 * @swagger
 * /api/admin/gallery/{id}:
 *   delete:
 *     summary: Delete an image
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the image to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', GalleryController.deleteImage);

/**
 * @swagger
 * 
 * /api/admin/gallery/{id}:
 *   put:
 *     summary: Update Image data
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Image to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: not found
 */
router.put("/:id", GalleryController.update);

export default router;