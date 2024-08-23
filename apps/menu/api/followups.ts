import * as express from "express";
import FollowUpsController from "../controllers/followups";
import * as FollowUpsValidation from "../validations/followups";

const router = express.Router();

const {
  validateCreateFollowUpsBody,
  validateEditFollowUpsBody,
  validateEditFollowUpsParams,
  validateListFollowUpsQuery,
  validateEditMultipleIdsBody,
} = FollowUpsValidation;

// ====== FollowUps Starts ======
/**
 * @swagger
 * /api/admin/lead/followup/create:
 *   post:
 *     summary: Create a new Follow Up
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - type
 *              - datetime
 *              - status
 *            properties:
 *              title:
 *                type: string
 *                default: title 
 *              description:
 *                type: text
 *                default: description
 *              type:
 *                type: text
 *                default: type
 *              datetime:
 *                type: text
 *                default: datetime
 *              status:
 *                type: boolean
 *                default: 0
 *     responses:
 *       '200':
 *         description: Follow Up created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/lead/followup/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Follow Up
 *     tags: [Admin > Lead > Follow Ups]
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
 *         description: Follow Up retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/lead/followup/get/{id}:
 *   get:
 *     summary: Get a Follow Up by ID
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Follow Up to retrieve
 *     responses:
 *       '200':
 *         description: Follow Up retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Follow Up to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: FollowUps not found
 * 
 * /api/admin/lead/followup/update/{id}:
 *   put:
 *     summary: Update a FollowUps
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Follow Up to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - type
 *              - datetime
 *              - status
 *            properties:
 *              title:
 *                type: string
 *                default: title 
 *              description:
 *                type: text
 *                default: description
 *              type:
 *                type: text
 *                default: type
 *              datetime:
 *                type: text
 *                default: datetime
 *              status:
 *                type: boolean
 *                default: 0
 *     responses:
 *       '200':
 *         description: Follow Up updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Follow Up not found
 * 
 * /api/admin/lead/followup/delete:
 *   delete:
 *     summary: Delete a FollowUps
 *     tags: [Admin > Lead > Follow Ups]
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
 *         description: Follow Up deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Follow Up not found
 */
router.post("/create", validateCreateFollowUpsBody, FollowUpsController.add);
router.get("/list", validateListFollowUpsQuery, FollowUpsController.list);
router.get("/get/:id", validateEditFollowUpsParams, FollowUpsController.get);
router.put("/update/:id", validateEditFollowUpsParams, validateEditFollowUpsBody, FollowUpsController.update);
router.delete("/delete", validateEditMultipleIdsBody, FollowUpsController.delete);
// ====== FollowUps Ends ======

export default router;
