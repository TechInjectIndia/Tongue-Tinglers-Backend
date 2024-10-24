import express from 'express';
import multer from 'multer';
import FilesController from '../controllers/FileController';
import { validateFileUpload, validateDeleteFiles, validateListFilesQuery } from '../validations/validateFileUpload';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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
 * /api/admin/files/:
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
 * /api/admin/files/{id}:
 *   put:
 *     summary: Update file details and optionally upload new files
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the file record to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               fileDetails:
 *                 type: string
 *                 description: A JSON string representation of an array of file details
 *                 example: '[{"name": "file1.jpg", "message": "Updated message", "recommended": true}]'
 *     responses:
 *       '200':
 *         description: Updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.put('/:id', upload.array('files'), FilesController.updateFile);

/**
 * @swagger
 * /api/admin/files:
 *   get:
 *     summary: Get all
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many rows to skip
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
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

/**
 * @swagger
 * /api/admin/files/get/{id}:
 *   get:
 *     summary: Get by ID
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID to retrieve
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Data not found"
 */
router.get("/get/:id", FilesController.get);

export default router;
