import * as express from "express";
import SettingsController from "../controllers/settings";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const { editSettings, getSettings, } = SettingsController;
// ====== Settings Start ======
/**
 * @swagger
 * /api/admin/settings/{id}:
 *   get:
 *     summary: Get Settings
 *     tags: [Admin > Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID
 *     responses:
 *       '200':
 *         description: Settings retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Settings not found
 * 
 * /api/admin/Settings/{id}:
 *   put:
 *     summary: Update a Settings
 *     tags: [Admin > Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Settings to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - address
 *              - active
 *            properties:
 *              email:
 *                type: string
 *                default: 12@gmail.com
 *              full_name:
 *                type: string
 *              contact_number:
 *                type: string
 *              phone_code:
 *                type: string
 *              address:
 *                type: string
 *              active:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Settings updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Settings not found
 * 
 */
router.get("/:id", hasPermission('settings', 'create'), getSettings);
router.put("/:id", hasPermission('settings', 'update'), editSettings);
// ====== Settings Routes Ends ======

export default router;
