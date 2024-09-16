import * as express from "express";
import ProfileController from "../controllers/profile";
import * as ProfileValidation from "../validations/profile";
import { hasPermission } from '../../../middlewares';
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const {
  validateEditProfileBody,
} = ProfileValidation;

const { update, get, uploadImage } = ProfileController;

// ====== Profile Start ======
/**
 * @swagger 
 * /api/admin/profile/image/upload:
 *   post:
 *     summary: Upload Profile Image
 *     tags: [Admin > User > Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - file
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *     responses:
 *       '200':
 *         description: Profile Image Uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/profile:
 *   get:
 *     summary: Get a Profile
 *     tags: [Admin > User > Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Profile not found
 * 
 * /api/admin/profile/:
 *   put:
 *     summary: Update a Profile
 *     tags: [Admin > User > Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - phoneNumber
 *              - profilePhoto
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              profilePhoto:
 *                type: string
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Profile not found
 */

router.get("/", get);
router.put("/", validateEditProfileBody, update);
// ====== Profile Routes Ends ======

router.post("/image/upload", upload.single('file'), uploadImage);

export default router;
