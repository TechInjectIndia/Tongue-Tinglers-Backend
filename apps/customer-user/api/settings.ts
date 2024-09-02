import * as express from "express";
import SettingsController from "../controllers/settings";
import * as CustomerValidation from "../validations/settings";

const router = express.Router();

const {
  validateEditSettingsParams,
  validateEditSettingsBody,
} = CustomerValidation;

// const { editSettings, getSettings, } = SettingsController;
// ====== Settings Start ======
/**
 * @swagger
 * /api/customer/settings:
 *   get:
 *     summary: Get a Settings by ID
 *     tags: [Customer > Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Settings to retrieve
 *     responses:
 *       '200':
 *         description: Settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Settings to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Settings not found
 * 
 * /api/customer/Settings/update:
 *   put:
 *     summary: Update a Settings
 *     tags: [Customer > Settings]
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
// router.get("/", validateEditSettingsParams, getSettings);
// router.put("/", validateEditSettingsParams, validateEditSettingsBody, editSettings);
// ====== Settings Routes Ends ======

export default router;
