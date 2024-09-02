import * as express from "express";
import ProfileController from "../controllers/profile";
import * as FranchiseValidation from "../validations/profile";

const router = express.Router();

const {
  validateEditProfileBody,
} = FranchiseValidation;

// const { editProfile, getProfile, } = ProfileController;
// ====== Profile Start ======
/**
 * @swagger
 * /api/franchise/profile:
 *   get:
 *     summary: Get a Profile
 *     tags: [Franchise > Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Profile not found
 * 
 * /api/franchise/profile/:
 *   put:
 *     summary: Update a Profile
 *     tags: [Franchise > Profile]
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
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - address
 *            properties:
 *              full_name:
 *                type: string
 *              contact_number:
 *                type: string
 *              phone_code:
 *                type: string
 *              address:
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
 * 
 */
// router.get("/", getProfile);
// router.put("/", validateEditProfileBody, editProfile);
// ====== Profile Routes Ends ======

export default router;
