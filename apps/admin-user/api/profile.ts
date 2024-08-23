import * as express from "express";
import ProfileController from "../controllers/profile";
import * as AdminValidation from "../validations/profile";

const router = express.Router();

const {
  validateEditProfileParams,
  validateEditProfileBody,
} = AdminValidation;

const { editProfile, getProfile, } = ProfileController;
// ====== Profile Start ======
/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get a Profile by ID
 *     tags: [Admin > User > Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Profile to retrieve
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Profile to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Profile not found
 * 
 * /api/admin/profile/update:
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
 *         description: Profile updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Profile not found
 * 
 */
router.get("/", validateEditProfileParams, getProfile);
router.put("/", validateEditProfileParams, validateEditProfileBody, editProfile);
// ====== Profile Routes Ends ======

export default router;
