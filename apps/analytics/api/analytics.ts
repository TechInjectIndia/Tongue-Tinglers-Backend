import * as express from "express";
import AnalyticsController from "../controllers/analytics";
import * as AnalyticsValidation from "../validations/analytics";

const router = express.Router();

const {
  validateCreateAnalyticsBody,
  validateEditAnalyticsBody,
  validateEditAnalyticsParams,
  validateListAnalyticsQuery,
  validateEditMultipleIdsBody,
} = AnalyticsValidation;

// ====== Analytics Starts ======
/**
 * @swagger
 * /api/admin/Analytics/create:
 *   post:
 *     summary: Create a new Analytics
 *     tags: [Admin > Analytics]
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
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminAnalytics 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
 *                default: 0
 *     responses:
 *       '200':
 *         description: Analytics created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/Analytics/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Analytics
 *     tags: [Admin > Analytics]
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
 *         description: Analytics retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/Analytics/get/{id}:
 *   get:
 *     summary: Get a Analytics by ID
 *     tags: [Admin > Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Analytics to retrieve
 *     responses:
 *       '200':
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Analytics to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Analytics not found
 * 
 * /api/admin/Analytics/update/{id}:
 *   put:
 *     summary: Update a Analytics
 *     tags: [Admin > Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Analytics to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Analytics 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Analytics updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Analytics not found
 * 
 * /api/admin/Analytics/delete:
 *   delete:
 *     summary: Delete a Analytics
 *     tags: [Admin > Analytics]
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
 *         description: Analytics deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Analytics not found
 */
router.post("/create", validateCreateAnalyticsBody, AnalyticsController.add);
router.get("/list", validateListAnalyticsQuery, AnalyticsController.list);
router.get("/get/:id", validateEditAnalyticsParams, AnalyticsController.get);
router.put("/update/:id", validateEditAnalyticsParams, validateEditAnalyticsBody, AnalyticsController.update);
router.delete("/delete", validateEditMultipleIdsBody, AnalyticsController.delete);
// ====== Analytics Ends ======

export default router;
