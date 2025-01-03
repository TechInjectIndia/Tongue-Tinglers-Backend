// import * as express from "express";

// import * as EmailValidation from "../validations/email";

// const router = express.Router();
// const {
//   validateCreateEmailBody,
//   validateEditEmailBody,
//   validateEditEmailParams,
//   validateListEmailQuery,
//   validateEditMultipleIdsBody,
// } = EmailValidation;

// // ====== Email Starts ======
// /**
//  * @swagger 
//  * 
//  * /api/admin/crm/email/create:
//  *   post:
//  *     summary: Create a new Email
//  *     tags: [Admin > CRM > Email]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - campaignId
//  *              - subscriberId
//  *            properties:
//  *              campaignId:
//  *                type: number
//  *                default: 1
//  *              subscriberId:
//  *                type: number
//  *                default: 1
//  *     responses:
//  *       '200':
//  *         description: Email created successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  * 
//  * /api/admin/crm/email/list?size={size}&skip={skip}:
//  *   get:
//  *     summary: Get all Email
//  *     tags: [Admin > CRM > Email]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: size
//  *         default: 10
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Size of the retreived data
//  *       - in: query
//  *         name: skip
//  *         default: 0
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: How many Rows want to skip
//  *     responses:
//  *       '200':
//  *         description: Email retrieved successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  * /api/admin/crm/email/get/{id}:
//  *   get:
//  *     summary: Get a Email by ID
//  *     tags: [Admin > CRM > Email]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         default: 1
//  *         schema:
//  *           type: string
//  *         description: ID of the Email to retrieve
//  *     responses:
//  *       '200':
//  *         description: Email retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: string
//  *               description: ID of the Email to retrieve
//  *       '401':
//  *         description: Unauthorized
//  *       '404':
//  *         description: Email not found
//  * 
//  * /api/admin/crm/email/update/{id}:
//  *   put:
//  *     summary: Update a Email
//  *     tags: [Admin > CRM > Email]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         default: 1
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the Email to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - campaignId
//  *              - subscriberId
//  *              - status
//  *            properties:
//  *              campaignId:
//  *                type: number
//  *                default: 1
//  *              subscriberId:
//  *                type: number
//  *                default: 1
//  *              status:
//  *                type: boolean
//  *                default: 1
//  *     responses:
//  *       '200':
//  *         description: Email updated successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  *       '404':
//  *         description: Email not found
//  * 
//  * /api/admin/crm/email/delete:
//  *   delete:
//  *     summary: Delete a Email
//  *     tags: [Admin > CRM > Email]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - ids
//  *            properties:
//  *              ids:
//  *                type: array
//  *                default: [1]
//  *     responses:
//  *       '200':
//  *         description: Email deleted successfully
//  *       '401':
//  *         description: Unauthorized
//  *       '404':
//  *         description: Email not found
//  */
// router.post("/create", validateCreateEmailBody, EmailController.create);
// router.get("/list", validateListEmailQuery, EmailController.list);
// router.get("/get/:id", validateEditEmailParams, EmailController.get);
// router.put("/update/:id", validateEditEmailParams, validateEditEmailBody, EmailController.update);
// router.delete("/delete", validateEditMultipleIdsBody, EmailController.delete);
// // ====== Email Ends ======

// export default router;
