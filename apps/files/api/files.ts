import express from 'express';
import FilesController from '../controllers/FileController';
import { validateFileUpload, validateDeleteFiles, validateListFilesQuery } from '../validations/validateFileUpload';

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/**
 * @swagger
 * /api/admin/files:
 *   post:
 *     summary: Upload multiple product images
 *     tags: [Files]
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
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '200':
 *         description: Product images uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post('/', upload.array('files'), FilesController.uploadFile);

/**
 * @swagger
 * /api/admin/files:
 *   get:
 *     summary: Get all files
 *     tags: [Files]
 *     parameters:
 *     responses:
 *       200:
 *         description: List of files
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
router.get('/', FilesController.getFiles);

/**
 * @swagger
 * /api/admin/files/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the file to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       400:
 *         description: Bad request
 */
router.delete('/:id', FilesController.deleteFile);

export default router;
