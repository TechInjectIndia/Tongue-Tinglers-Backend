import * as express from "express";
import FranchiseeController from "../controllers/franchisee";
import * as AdminValidation from "../validations/franchise";

const router = express.Router();

const {
  validateCreateFranchiseeBody,
  validateEditFranchiseeParams,
  validateEditFranchiseeBody,
  validateListFranchiseeQuery,
  validateEditMultipleIdsBody,
} = AdminValidation;

const { getFranchisees, addFranchisee, editFranchisee, deleteFranchisee, getFranchisee, } = FranchiseeController;
// ====== Franchisee Start ======
/**
 * @swagger
 * /api/admin/franchise/create:
 *   post:
 *     summary: Create a new Franchisee
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - address
 *              - active
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
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
 *         description: Franchisee created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/franchise/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Franchisee
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         default: 10
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retreived data
 *       - in: query
 *         name: skip
 *         default: 0
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many Rows want to skip
 *     responses:
 *       '200':
 *         description: Franchisee retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/franchise/get/{id}:
 *   get:
 *     summary: Get a Franchisee by ID
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Franchisee to retrieve
 *     responses:
 *       '200':
 *         description: Franchisee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Franchisee to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Franchisee not found
 * 
 * /api/admin/franchise/update/{id}:
 *   put:
 *     summary: Update a Franchisee
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Franchisee to update
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
 *         description: Franchisee updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Franchisee not found
 * 
 * /api/admin/franchise/delete:
 *   delete:
 *     summary: Delete a Franchisee
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - ids
 *            properties:
 *              ids:
 *                type: array
 *                default: [1]
 *     responses:
 *       '200':
 *         description: Franchisee deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Franchisee not found
 */
router.post("/create", validateCreateFranchiseeBody, addFranchisee);
router.get("/list", validateListFranchiseeQuery, getFranchisees);
router.get("/get/:id", validateEditFranchiseeParams, getFranchisee);
router.put("/update/:id", validateEditFranchiseeParams, validateEditFranchiseeBody, editFranchisee);
router.delete("/delete", validateEditMultipleIdsBody, deleteFranchisee); // Soft delete single or multiple
// ====== Franchisee Routes Ends ======

export default router;
