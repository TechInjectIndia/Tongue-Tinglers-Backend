import * as express from "express";
import RetortProductsController from "../controllers/products";
import * as ProductsValidation from "../validations/products";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const {
  validateCreateProductsBody,
  validateEditProductsBody,
  validateEditProductsParams,
  validateListProductsQuery,
  validateEditMultipleIdsBody,
} = ProductsValidation;

// ====== Products Starts ======
/**
 * @swagger 
 * /api/admin/retort/product/image/upload:
 *   post:
 *     summary: Upload product Image
 *     tags: [Admin > Retort > Products]
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
 *         description: product Image Uploaded successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/retort/product/create:
 *   post:
 *     summary: Create a new products
 *     tags: [Admin > Retort > Products]
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
 *              - description
 *              - price
 *              - type
 *              - stock
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: product12 
 *              description:
 *                type: text
 *                default: desc
 *              price:
 *                type: text
 *                default: 123.00
 *              type:
 *                type: text
 *                default: new
 *              stock:
 *                type: integer
 *                default: 10
 *              active:
 *                type: boolean
 *                default: 0 
 *     responses:
 *       '200':
 *         description: products created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/retort/product/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all products
 *     tags: [Admin > Retort > Products]
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
 *         description: products retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/retort/product/get/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     tags: [Admin > Retort > Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Product to retrieve
 *     responses:
 *       '200':
 *         description: products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the products to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: products not found
 * 
 * /api/admin/retort/product/update/{id}:
 *   put:
 *     summary: Update a Product
 *     tags: [Admin > Retort > Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the products to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - price
 *              - type
 *              - stock
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminProductNew
 *              description:
 *                type: string
 *                default: descr
 *              price:
 *                type: number
 *                default: 178
 *              type:
 *                type: text
 *                default: upcoming
 *              stock:
 *                type: number
 *                default: 52
 *              active:
 *                type: string
 *                default: 1
 *     responses:
 *       '200':
 *         description: products updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: products not found
 * 
 * /api/admin/retort/product/delete:
 *   delete:
 *     summary: Delete a Product
 *     tags: [Admin > Retort > Products]
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
 *         description: Product deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: products not found
 */
router.post("/create", validateCreateProductsBody, RetortProductsController.create);
router.get("/list", validateListProductsQuery, RetortProductsController.list);
router.get("/get/:id", validateEditProductsParams, RetortProductsController.get);
router.put("/update/:id", validateEditProductsParams, validateEditProductsBody, RetortProductsController.update);
router.delete("/delete", validateEditMultipleIdsBody, RetortProductsController.delete);
// ====== Products Ends ======

router.post("/image/upload", upload.single('file'), RetortProductsController.uploadImage);

export default router;
