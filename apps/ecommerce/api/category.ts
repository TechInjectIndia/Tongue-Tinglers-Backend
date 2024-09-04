import * as express from "express";
import ProductCategoryController from "../controllers/category";
import * as ProductCategoryValidation from "../validations/category";

const router = express.Router();

const {
  validateCreateProductCategoryBody,
  validateEditProductCategoryBody,
  validateEditProductCategoryParams,
  validateListProductCategoryQuery,
  validateEditMultipleIdsBody,
} = ProductCategoryValidation;

// ====== Product Category Starts ======
/**
 * @swagger
 * /api/admin/product/category/create:
 *   post:
 *     summary: Create a new Product Category
 *     tags: [Admin > Ecommerce > Product > Category]
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
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminCategory 
 *              description:
 *                type: text
 *                default: desc
 *              active:
 *                type: boolean
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Product Category created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/product/category/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all ProductCategory
 *     tags: [Admin > Ecommerce > Product > Category]
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
 *         description: Product Category retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/product/category/get/{id}:
 *   get:
 *     summary: Get a Category by ID
 *     tags: [Admin > Ecommerce > Product > Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Category to retrieve
 *     responses:
 *       '200':
 *         description: ProductCategory retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the ProductCategory to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: ProductCategory not found
 * 
 * /api/admin/product/category/update/{id}:
 *   put:
 *     summary: Update a Category
 *     tags: [Admin > Ecommerce > Product > Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ProductCategory to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminCategoryNew
 *              description:
 *                type: string
 *                default: AdminCategoryNew
 *              active:
 *                type: boolean
 *                default: 1
 *     responses:
 *       '200':
 *         description: Product Category updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: ProductCategory not found
 * 
 * /api/admin/product/category/delete:
 *   delete:
 *     summary: Delete a Category
 *     tags: [Admin > Ecommerce > Product > Category]
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
 *         description: Category deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Product Category not found
 */
router.post("/create", validateCreateProductCategoryBody, ProductCategoryController.create);
router.get("/list", validateListProductCategoryQuery, ProductCategoryController.list);
router.get("/get/:id", validateEditProductCategoryParams, ProductCategoryController.get);
router.put("/update/:id", validateEditProductCategoryParams, validateEditProductCategoryBody, ProductCategoryController.update);
router.delete("/delete", validateEditMultipleIdsBody, ProductCategoryController.delete);
// ====== ProductCategory Ends ======

export default router;
