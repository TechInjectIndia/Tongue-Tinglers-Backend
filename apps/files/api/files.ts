import express from 'express';
import FilesController from '../controllers/FileController';
import { validateFileUpload, validateDeleteFiles, validateListFilesQuery } from '../validations/validateFileUpload';

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/**
 * @swagger
 * /api/admin/files/search:
 *   get:
 *     summary: Search for files by name, message
 *     tags: [Files]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the file to search for
 *       - in: query
 *         name: message
 *         schema:
 *           type: string
 *         description: Message associated with the file
 *     responses:
 *       200:
 *         description: List of files matching the search criteria
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
router.get('/search', FilesController.searchFiles);

/**
 * @swagger
 * /api/admin/files:
 *   post:
 *     summary: Upload multiple files with individual names, messages, and recommended status
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
 *               - fileDetails
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               fileDetails:
 *                 type: string
 *                 description: A JSON string representation of an array of file details
 *                 example: '[{"name": "file1.jpg", "message": "This is file 1", "recommended": "true"}, {"name": "file2.jpg", "message": "This is file 2", "recommended": "false"}]'
 *     responses:
 *       '200':
 *         description: Uploaded successfully
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
