// src/routes/dynamicFormRoutes.ts
import * as express from "express";
import DynamicFormController from "../controllers/DynamicFormController";
import * as DynamicFormValidation from "../validations/DynamicFormValidation";

const router = express.Router();

const {
  validateCreateDynamicFormBody,
  validateEditDynamicFormBody,
  validateEditDynamicFormParams,
  validateListDynamicFormQuery,
  validateEditMultipleIdsBody,
} = DynamicFormValidation;

// ====== Dynamic Form Starts ====== 
/**
 * @swagger
 * /api/admin/form/create:
 *   post:
 *     summary: Create a new Dynamic Form Question
 *     tags: [Dynamic Form]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - type
 *               - required
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is your favorite color?"
 *               type:
 *                 type: string
 *                 enum: [boolean, string, multi_choice, single_choice, number]
 *                 example: "single_choice"
 *               required:
 *                 type: boolean
 *                 example: true
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Red", "Blue", "Green"]
 *     responses:
 *       '201':
 *         description: Dynamic Form Question created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/form/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Dynamic Form Questions
 *     tags: [Dynamic Form]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: integer
 *         description: How many rows to skip
 *     responses:
 *       '200':
 *         description: Dynamic Form Questions retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/form/get/{id}:
 *   get:
 *     summary: Get a Dynamic Form Question by ID
 *     tags: [Dynamic Form]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Dynamic Form Question to retrieve
 *     responses:
 *       '200':
 *         description: Dynamic Form Question retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Dynamic Form Question not found
 * 
 * /api/admin/form/update/{id}:
 *   put:
 *     summary: Update a Dynamic Form Question
 *     tags: [Dynamic Form]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Dynamic Form Question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [boolean, string, multi_choice, single_choice, number]
 *               required:
 *                 type: boolean
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Dynamic Form Question updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Dynamic Form Question not found
 * 
 * /api/admin/form/delete:
 *   delete:
 *     summary: Delete Dynamic Form Questions
 *     tags: [Dynamic Form]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1", "2"]
 *     responses:
 *       '200':
 *         description: Dynamic Form Questions deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Dynamic Form Questions not found
 */
router.post("/create", validateCreateDynamicFormBody, DynamicFormController.create);
router.get("/list", validateListDynamicFormQuery, DynamicFormController.list);
router.get("/get/:id", validateEditDynamicFormParams, DynamicFormController.get);
router.put("/update/:id", validateEditDynamicFormParams, validateEditDynamicFormBody, DynamicFormController.update);
router.delete("/delete", validateEditMultipleIdsBody, DynamicFormController.delete);

export default router;
