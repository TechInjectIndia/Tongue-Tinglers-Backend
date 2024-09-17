import * as express from "express";
import MenuCategoryController from "../controllers/menu-category";
import * as MenuCategoryValidation from "../validations/menu-category";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateCreateMenuCategoryBody,
  validateEditMenuCategoryBody,
  validateEditMenuCategoryParams,
  validateListMenuCategoryQuery,
  validateEditMultipleIdsBody,
} = MenuCategoryValidation;

// ====== Menu Starts ======
/**
 * @swagger 
 * /api/admin/menu/category/image/upload:
 *   post:
 *     summary: Upload Menu Category Image
 *     tags: [Admin > Menu > Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - file
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *     responses:
 *       '200':
 *         description: Menu Category Image Uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/menu/category/create:
 *   post:
 *     summary: Create a new Menu Category
 *     tags: [Admin > Menu > Category]
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
 *              - image
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminMenu
 *              image:
 *                type: string
 *                default: "imagename"
 *              status:
 *                type: string
 *                default: "inactive"
 *     responses:
 *       '200':
 *         description: Menu Category created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/category/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Menu Categories
 *     tags: [Admin > Menu > Category]
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
 * /api/admin/menu/category/get/{id}:
 *   get:
 *     summary: Get a Menu Category by ID
 *     tags: [Admin > Menu > Category]
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
 * /api/admin/menu/category/update/{id}:
 *   put:
 *     summary: Update a Menu Category
 *     tags: [Admin > Menu > Category]
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
 *              - name
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Menu
 *              status:
 *                type: string
 *                default: "active"
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
 * /api/admin/menu/category/delete:
 *   delete:
 *     summary: Delete a Menu Category
 *     tags: [Admin > Menu > Category]
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
router.post("/create", hasPermission('menu', 'create'), validateCreateMenuCategoryBody, MenuCategoryController.create);
router.get("/list", hasPermission('menu', 'read'), validateListMenuCategoryQuery, MenuCategoryController.list);
router.get("/get/:id", hasPermission('menu', 'read'), validateEditMenuCategoryParams, MenuCategoryController.get);
router.put("/update/:id", hasPermission('menu', 'update'), validateEditMenuCategoryParams, validateEditMenuCategoryBody, MenuCategoryController.update);
router.delete("/delete", hasPermission('menu', 'delete'), validateEditMultipleIdsBody, MenuCategoryController.delete);
// ====== Menu Ends ======

router.post("/image/upload", upload.single('file'), MenuCategoryController.upload);

export default router;