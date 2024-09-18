import * as express from "express";
import FranchiseController from "../controllers/franchise";
import * as FranchiseValidation from "../validations/franchise";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateListFranchiseQuery,
  validateCreateFranchiseBody,
  validateEditFranchiseParams,
  validateEditFranchiseBody,
  validateEditMultipleIdsBody,
} = FranchiseValidation;

const { list, create, update, get, deleteFranchise } = FranchiseController;

// ====== Franchises Routes Start ======
/**
 * @swagger
 * /api/admin/franchise/create:
 *   post:
 *     summary: Create a new franchise
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
 *              - firstName
 *              - lastName
 *              - userName
 *              - phoneNumber
 *              - status
 *              - role
 *              - referralBy
 *            properties:
 *              email:
 *                type: string
 *                default: Franchise@gmail.com
 *              password:
 *                type: string
 *                default: Franchise
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              status:
 *                type: string
 *                default: active
 *              role:
 *                type: number
 *                default: 0 
 *              referralBy:
 *                type: string
 *                default: ""
 *     responses:
 *       '200':
 *         description: franchise created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/franchise/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all franchisees
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
 *         description: franchisees retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/franchise/get/{id}:
 *   get:
 *     summary: Get a franchise by ID
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
 *         description: ID of the franchise to retrieve
 *     responses:
 *       '200':
 *         description: franchise retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the franchise to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: franchise not found
 * 
 * /api/admin/franchise/update/{id}:
 *   put:
 *     summary: Update a franchise
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the franchise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - userName
 *              - phoneNumber
 *              - status
 *              - role
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              status:
 *                type: string
 *                default: active
 *              role:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: franchise updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: franchise not found
 * 
 * /api/admin/franchise/delete:
 *   delete:
 *     summary: Delete a franchise
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
 *         description: franchise deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: franchise not found
 */
router.post("/create", hasPermission('franchise', 'create'), validateCreateFranchiseBody, create);
router.get("/list", hasPermission('franchise', 'read'), validateListFranchiseQuery, list);
router.get("/get/:id", hasPermission('franchise', 'read'), validateEditFranchiseParams, get);
router.put("/update/:id", hasPermission('franchise', 'update'), validateEditFranchiseParams, validateEditFranchiseBody, update);
router.delete("/delete", hasPermission('franchise', 'delete'), validateEditMultipleIdsBody, deleteFranchise); // Soft delete single or multiple
// ====== Franchises Routes Ends ======

export default router;
