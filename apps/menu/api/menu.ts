import * as express from "express";
import MenuController from "../controllers/menu";
import * as MenuValidation from "../validations/menu";
import menuProductRouter from "../../menu/api/menu-product";
import menuProductMapRouter from "../../menu/api/menu-product-map";
import menuCategoryRouter from "../../menu/api/menu-category";
import menuCategoryMapRouter from "../../menu/api/menu-category-map";
import { hasPermission } from '../../../middlewares';
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const {
  validateCreateMenuBody,
  validateEditMenuBody,
  validateEditMenuParams,
  validateListMenuQuery,
  validateEditMultipleIdsBody,
} = MenuValidation;

// ====== Menu Starts ======
/**
 * @swagger
 * /api/admin/menu/image/upload:
 *   post:
 *     summary: Upload Menu Image
 *     tags: [Admin > Menu]
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
 *         description: Menu Image Uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/create:
 *   post:
 *     summary: Create a new Menu
 *     tags: [Admin > Menu]
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
 *              - images
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminMenu 
 *              images:
 *                type: string
 *                default: AdminMenu 
 *              status:
 *                type: string
 *                default: "inactive"
 *     responses:
 *       '200':
 *         description: Menu created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Menu
 *     tags: [Admin > Menu]
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
 *         description: Menu retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/get/{id}:
 *   get:
 *     summary: Get a Menu by ID
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Menu to retrieve
 *     responses:
 *       '200':
 *         description: Menu retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Menu to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu not found
 * 
 * /api/admin/menu/update/{id}:
 *   put:
 *     summary: Update a Menu
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Menu to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - images
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Menu
 *              images:
 *                type: string
 *                default: "active"
 *              status:
 *                type: string
 *                default: "active"
 *     responses:
 *       '200':
 *         description: Menu updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu not found
 * 
 * /api/admin/menu/delete:
 *   delete:
 *     summary: Delete a Menu
 *     tags: [Admin > Menu]
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
 *         description: Menu deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu not found
 */

router.post("/create", hasPermission('menu', 'create'), validateCreateMenuBody, MenuController.create);
router.get("/list",  hasPermission('menu', 'read'),validateListMenuQuery, MenuController.list);
router.get("/get/:id",  hasPermission('menu', 'read'),validateEditMenuParams, MenuController.get);
router.put("/update/:id", hasPermission('menu', 'update'), validateEditMenuParams, validateEditMenuBody, MenuController.update);
router.delete("/delete", hasPermission('menu', 'delete'), validateEditMultipleIdsBody, MenuController.delete);

// Menu Category Apis
router.use("/product", menuProductRouter);
router.use("/product/map", menuProductMapRouter);
router.use("/category", menuCategoryRouter);
router.use("/category/map", menuCategoryMapRouter);

// ====== Menu Ends ======
router.post("/image/upload", upload.single('file'), MenuController.upload);

export default router;
