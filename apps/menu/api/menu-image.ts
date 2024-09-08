import * as express from "express";
import MenuImageController from "../controllers/menu-image";
import * as MenuImageValidation from "../validations/menu-image";

const router = express.Router();

const {
  validateCreateMenuImageBody,
  validateEditMenuImageBody,
  validateEditMenuImageParams,
  validateListMenuImageQuery,
  validateEditMultipleIdsBody,
} = MenuImageValidation;

// ====== Menu Starts ======
/**
 * @swagger
 * /api/admin/menu/image/create:
 *   post:
 *     summary: Create a new Menu Category
 *     tags: [Admin > Menu > Image]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - menuId
 *              - fileName
 *              - filePath
 *              - originalName
 *              - fileSize
 *            properties:
 *              menuId:
 *                type: number
 *                default: AdminMenu 
 *              fileName:
 *                type: string
 *                default: "inactive"
 *              filePath:
 *                type: string
 *                default: "inactive"
 *              originalName:
 *                type: string
 *                default: "inactive"
 *              fileSize:
 *                type: string
 *                default: 205
 *     responses:
 *       '200':
 *         description: Menu Category created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/image/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Menu Categories
 *     tags: [Admin > Menu > Image]
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
 *         description: Menu Category retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/image/get/{id}:
 *   get:
 *     summary: Get a Menu Category by ID
 *     tags: [Admin > Menu > Image]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Menu Category to retrieve
 *     responses:
 *       '200':
 *         description: Menu Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Menu Category to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Category not found
 * 
 * /api/admin/menu/image/update/{id}:
 *   put:
 *     summary: Update a Menu Category
 *     tags: [Admin > Menu > Image]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Menu Category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - menuId
 *              - fileName
 *              - filePath
 *              - originalName
 *              - fileSize
 *            properties:
 *              menuId:
 *                type: number
 *                default: AdminMenu 
 *              fileName:
 *                type: string
 *                default: "inactive"
 *              filePath:
 *                type: string
 *                default: "inactive"
 *              originalName:
 *                type: string
 *                default: "inactive"
 *              fileSize:
 *                type: string
 *                default: 206
 *     responses:
 *       '200':
 *         description: Menu Category updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Category not found
 * 
 * /api/admin/menu/image/delete:
 *   delete:
 *     summary: Delete a Menu Category
 *     tags: [Admin > Menu > Image]
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
 *         description: Menu Category deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Category not found
 */
router.post("/create", validateCreateMenuImageBody, MenuImageController.create);
router.get("/list", validateListMenuImageQuery, MenuImageController.list);
router.get("/get/:id", validateEditMenuImageParams, MenuImageController.get);
router.put("/update/:id", validateEditMenuImageParams, validateEditMenuImageBody, MenuImageController.update);
router.delete("/delete", validateEditMultipleIdsBody, MenuImageController.delete);
// ====== Menu Ends ======

export default router;
