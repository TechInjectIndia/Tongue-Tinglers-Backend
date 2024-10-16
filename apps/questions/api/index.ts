// src/routes/QuestionRoutes.ts
import * as express from "express";
import QuestionController from "../controllers/QuestionController";
import * as QuestionValidation from "../validations/QuestionValidation";

const router = express.Router();

const {
  validateCreateQuestionBody,
  validateEditQuestionBody,
  validateEditQuestionParams,
  validateListQuestionQuery,
  validateEditMultipleIdsBody,
} = QuestionValidation;

// ====== Questions Starts ====== 
/**
 * @swagger
 * /api/admin/question/create:
 *   post:
 *     summary: Create a new Questions Question
 *     tags: [Questions]
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
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       example: "Red"
 *                     value:
 *                       type: string
 *                       example: "red"
 *                 example: 
 *                   - label: "Red"
 *                     value: "red"
 *                   - label: "Blue"
 *                     value: "blue"
 *                   - label: "Green"
 *                     value: "green"
 *     responses:
 *       '201':
 *         description: Questions Question created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/question/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Questions Questions
 *     tags: [Questions]
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
 *         description: Questions Questions retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/question/get/{id}:
 *   get:
 *     summary: Get a Questions Question by ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Questions Question to retrieve
 *     responses:
 *       '200':
 *         description: Questions Question retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Questions Question not found
 * 
 * /api/admin/question/update/{id}:
 *   put:
 *     summary: Update a Questions Question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Questions Question to update
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
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       example: "Red"
 *                     value:
 *                       type: string
 *                       example: "red"
 *     responses:
 *       '200':
 *         description: Questions Question updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Questions Question not found
 * 
 * /api/admin/question/delete:
 *   delete:
 *     summary: Delete Questions Questions
 *     tags: [Questions]
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
 *         description: Questions Questions deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Questions Questions not found
 */
router.post("/create", validateCreateQuestionBody, QuestionController.create);
router.get("/list", validateListQuestionQuery, QuestionController.list);
router.get("/get/:id", validateEditQuestionParams, QuestionController.get);
router.put("/update/:id", validateEditQuestionParams, validateEditQuestionBody, QuestionController.update);
router.delete("/delete", validateEditMultipleIdsBody, QuestionController.delete);

export default router;
