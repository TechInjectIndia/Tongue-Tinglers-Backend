import * as express from "express";
import MenuProductController from "../controllers/menu-product";
import * as MenuProductValidation from "../validations/menu-product";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateCreateMenuProductBody,
  validateEditMenuProductBody,
  validateEditMenuProductParams,
  validateListMenuProductQuery,
  validateEditMultipleIdsBody,
} = MenuProductValidation;

// ====== Menu Starts ======
/**
 * @swagger 
 * /api/admin/menu/product/image/upload:
 *   post:
 *     summary: Upload Menu Product Image
 *     tags: [Admin > Menu > Product]
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
 *         description: Menu Product Image Uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/menu/product/create:
 *   post:
 *     summary: Create a new Menu Product
 *     tags: [Admin > Menu > Product]
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
 *              - slug
 *              - description
 *              - images
 *              - price
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminMenu
 *              slug:
 *                type: string
 *                default: slug
 *              description:
 *                type: string
 *                default: description
 *              images:
 *                type: string
 *                default: "imagename"
 *              price:
 *                type: number
 *                default: 750
 *              active:
 *                type: string
 *                default: "active"
 *     responses:
 *       '200':
 *         description: Menu Product created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/product/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Menu Categories
 *     tags: [Admin > Menu > Product]
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
 *         description: Menu Product retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/menu/product/get/{id}:
 *   get:
 *     summary: Get a Menu Product by ID
 *     tags: [Admin > Menu > Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Menu Product to retrieve
 *     responses:
 *       '200':
 *         description: Menu Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Menu Product to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Product not found
 * 
 * /api/admin/menu/product/update/{id}:
 *   put:
 *     summary: Update a Menu Product
 *     tags: [Admin > Menu > Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Menu Product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - slug
 *              - description
 *              - images
 *              - price
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminMenu
 *              slug:
 *                type: string
 *                default: slug
 *              description:
 *                type: string
 *                default: description
 *              images:
 *                type: string
 *                default: "imagename"
 *              price:
 *                type: number
 *                default: 750
 *              active:
 *                type: string
 *                default: "active"
 *     responses:
 *       '200':
 *         description: Menu Product updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Product not found
 * 
 * /api/admin/menu/product/delete:
 *   delete:
 *     summary: Delete a Menu Product
 *     tags: [Admin > Menu > Product]
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
 *         description: Menu Product deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Product not found
 */
router.post("/create", hasPermission('menu', 'create'), validateCreateMenuProductBody, MenuProductController.create);
router.get("/list", hasPermission('menu', 'read'), validateListMenuProductQuery, MenuProductController.list);
router.get("/get/:id", hasPermission('menu', 'read'), validateEditMenuProductParams, MenuProductController.get);
router.put("/update/:id", hasPermission('menu', 'update'), validateEditMenuProductParams, validateEditMenuProductBody, MenuProductController.update);
router.delete("/delete", hasPermission('menu', 'delete'), validateEditMultipleIdsBody, MenuProductController.delete);
// ====== Menu Ends ======

router.post("/image/upload", upload.single('file'), MenuProductController.upload);

export default router;