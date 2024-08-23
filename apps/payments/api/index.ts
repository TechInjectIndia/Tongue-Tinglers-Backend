import * as express from "express";
import PaymentsController from "../controllers";
import * as PaymentsValidation from "../validations";

const router = express.Router();

const {
  validateCreatePaymentsBody,
  validateEditPaymentsBody,
  validateEditPaymentsParams,
  validateListPaymentsQuery,
  validateEditMultipleIdsBody,
} = PaymentsValidation;

// ====== Payments Starts ======
/**
 * @swagger
 * /api/admin/Payments/create:
 *   post:
 *     summary: Create a new Payments
 *     tags: [Admin > Payments]
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
 *                default: AdminPayments 
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
 *         description: Payments created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/Payments/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Payments
 *     tags: [Admin > Payments]
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
 *         description: Payments retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/Payments/get/{id}:
 *   get:
 *     summary: Get a Payments by ID
 *     tags: [Admin > Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Payments to retrieve
 *     responses:
 *       '200':
 *         description: Payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Payments to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Payments not found
 * 
 * /api/admin/Payments/update/{id}:
 *   put:
 *     summary: Update a Payments
 *     tags: [Admin > Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Payments to update
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
 *                default: Payments 
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
 *         description: Payments updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Payments not found
 * 
 * /api/admin/Payments/delete:
 *   delete:
 *     summary: Delete a Payments
 *     tags: [Admin > Payments]
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
 *         description: Payments deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Payments not found
 */
router.post("/create", validateCreatePaymentsBody, PaymentsController.add);
router.get("/list", validateListPaymentsQuery, PaymentsController.list);
router.get("/get/:id", validateEditPaymentsParams, PaymentsController.get);
router.put("/update/:id", validateEditPaymentsParams, validateEditPaymentsBody, PaymentsController.update);
router.delete("/delete", validateEditMultipleIdsBody, PaymentsController.delete);
// ====== Payments Ends ======

export default router;
