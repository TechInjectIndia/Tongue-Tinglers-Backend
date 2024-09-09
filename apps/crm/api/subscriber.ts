import * as express from "express";
import SubscriberController from "../controllers/subscriber";
import * as SubscriberValidation from "../validations/subscriber";

const router = express.Router();
const {
  validateCreateSubscriberBody,
  validateEditSubscriberBody,
  validateEditSubscriberParams,
  validateListSubscriberQuery,
  validateEditMultipleIdsBody,
} = SubscriberValidation;

// ====== Subscriber Starts ======
/**
 * @swagger 
 * 
 * /api/admin/campaign/subscriber/create:
 *   post:
 *     summary: Create a new Subscriber
 *     tags: [Admin > CRM > Subscriber]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - subscribedAt
 *            properties:
 *              name:
 *                type: string
 *                default: AdminSubscriberNew
 *              email:
 *                type: string
 *                default: subject
 *              subscribedAt:
 *                type: string
 *                default: scheduledAt
 *     responses:
 *       '200':
 *         description: Subscriber created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/campaign/subscriber/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Subscriber
 *     tags: [Admin > CRM > Subscriber]
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
 *         description: Subscriber retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/campaign/subscriber/get/{id}:
 *   get:
 *     summary: Get a Subscriber by ID
 *     tags: [Admin > CRM > Subscriber]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Subscriber to retrieve
 *     responses:
 *       '200':
 *         description: Subscriber retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Subscriber to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Subscriber not found
 * 
 * /api/admin/campaign/subscriber/update/{id}:
 *   put:
 *     summary: Update a Subscriber
 *     tags: [Admin > CRM > Subscriber]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Subscriber to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - subscribedAt
 *            properties:
 *              name:
 *                type: string
 *                default: AdminSubscriberNew
 *              email:
 *                type: string
 *                default: subject
 *              subscribedAt:
 *                type: string
 *                default: scheduledAt
 *     responses:
 *       '200':
 *         description: Subscriber updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Subscriber not found
 * 
 * /api/admin/campaign/subscriber/delete:
 *   delete:
 *     summary: Delete a Subscriber
 *     tags: [Admin > CRM > Subscriber]
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
 *         description: Subscriber deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Subscriber not found
 */
router.post("/create", validateCreateSubscriberBody, SubscriberController.create);
router.get("/list", validateListSubscriberQuery, SubscriberController.list);
router.get("/get/:id", validateEditSubscriberParams, SubscriberController.get);
router.put("/update/:id", validateEditSubscriberParams, validateEditSubscriberBody, SubscriberController.update);
router.delete("/delete", validateEditMultipleIdsBody, SubscriberController.delete);
// ====== Subscriber Ends ======

export default router;
