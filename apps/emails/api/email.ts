import express from 'express';
import multer from 'multer';
import EmailController from '../controllers/EmailController';
import { validateEmail } from '../validations/validateEmail';

const upload = multer({ storage: multer.memoryStorage() }); // If you want to use memory storage

const router = express.Router();

/**
 * @swagger
 * /email:
 *   post:
 *     summary: Send an email with file or file path
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               filePath:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Bad request
 */
router.post('/email', upload.single('file'), validateEmail, EmailController.sendEmail);

export default router;
