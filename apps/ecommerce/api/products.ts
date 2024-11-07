import * as express from "express";
import ProductsController from "../controllers/products";
import * as ProductsValidation from "../validations/products";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const {
  validateCreateProductsBody,
  validateAssignCategoryBody,
  validateEditProductsBody,
  validateEditProductsParams,
  validateListProductsQuery,
  validateEditMultipleIdsBody,
} = ProductsValidation;

// ====== Products Starts ======

/**
 * @swagger
 * /api/admin/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - categories
 *               - description
 *               - price
 *               - type
 *               - total_ratings
 *               - ratings
 *               - discount
 *               - stock
 *               - sold
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *                 example: "product12" 
 *               categories:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1111223344, 223344556]
 *               slug:
 *                 type: string
 *                 example: "product12"
 *               vendorId:
 *                 type: string
 *                 example: "11112333546"
 *               description:
 *                 type: string
 *                 example: "desc"
 *               price:
 *                 type: number
 *                 example: 123.00
 *               type:
 *                 type: string
 *                 enum: [old, new, upcoming]
 *               total_ratings:
 *                 type: integer
 *                 example: 0
 *               ratings:
 *                 type: integer
 *                 example: 0
 *               discount:
 *                 type: integer
 *                 example: 0
 *               stock:
 *                 type: integer
 *                 example: 0
 *               sold:
 *                 type: integer
 *                 example: 0
 *               active:
 *                 type: boolean
 *                 example: true 
 *     responses:
 *       '200':
 *         description: Product created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/product/update/{id}:
 *   put:
 *     summary: Update a Product
 *     tags: [Admin > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - description
 *               - price
 *               - type
 *               - total_ratings
 *               - ratings
 *               - discount
 *               - stock
 *               - sold
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *                 example: "AdminProductNew"
 *               slug:
 *                 type: string
 *                 example: "AdminProductNew"
 *               description:
 *                 type: string
 *                 example: "descr"
 *               price:
 *                 type: number
 *                 example: 178
 *               type:
 *                 type: string
 *                 enum: [old, new, upcoming]
 *               total_ratings:
 *                 type: integer
 *                 example: 0
 *               ratings:
 *                 type: integer
 *                 example: 0
 *               discount:
 *                 type: integer
 *                 example: 0
 *               stock:
 *                 type: integer
 *                 example: 0
 *               sold:
 *                 type: integer
 *                 example: 0
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Product not found
 */

/**
 * @swagger
 * /api/admin/product/image/upload:
 *   post:
 *     summary: Upload product Image
 *     tags: [Admin > Ecommerce > Products]
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
 * /api/admin/product/assign-category:
 *   post:
 *     summary: Assign Category
 *     tags: [Admin > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - productId
 *              - categoryId
 *            properties:
 *              productId:
 *                type: number
 *                default: 1 
 *              categoryId:
 *                type: number
 *                default: 1
 *     responses:
 *       '200':
 *         description: Assigned successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/product/unassign-category:
 *   post:
 *     summary: Un-Assign Category
 *     tags: [Admin > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - productId
 *              - categoryId
 *            properties:
 *              productId:
 *                type: number
 *                default: 1 
 *              categoryId:
 *                type: number
 *                default: 1
 *     responses:
 *       '200':
 *         description: Un-Assigned successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/product/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all products
 *     tags: [Admin > Ecommerce > Products]
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
 * /api/admin/product/get/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     tags: [Admin > Ecommerce > Products]
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
 * /api/admin/product/delete:
 *   delete:
 *     summary: Delete a Product
 *     tags: [Admin > Ecommerce > Products]
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
router.post("/create", validateCreateProductsBody, ProductsController.create);
router.get("/list", validateListProductsQuery, ProductsController.list);
router.get("/get/:id", validateEditProductsParams, ProductsController.get);
router.put("/update/:id", validateEditProductsParams, validateEditProductsBody, ProductsController.update);
router.delete("/delete", validateEditMultipleIdsBody, ProductsController.delete);
// ====== Products Ends ======

router.post("/image/upload", upload.single('file'), ProductsController.uploadImage);
router.post("/assign-category", validateAssignCategoryBody, ProductsController.assignCategory);
router.post("/unassign-category", validateAssignCategoryBody, ProductsController.unAssignCategory);

export default router;
