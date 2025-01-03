// import * as express from "express";
// import RetortProductsController from "../controllers/products";
// import * as ProductsValidation from "../validations/products";
// import { hasPermission } from '../../../middlewares';
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

// const router = express.Router();

// const {
//   validateCreateProductsBody,
//   validateAssignCategoryBody,
//   validateEditProductsBody,
//   validateEditProductsParams,
//   validateListProductsQuery,
//   validateEditMultipleIdsBody,
// } = ProductsValidation;

// // ====== Products Starts ======
// /**
//  * @swagger 
//  * /api/admin/retort/product/image/upload:
//  *   post:
//  *     summary: Upload product Image
//  *     tags: [Admin > Retort > Products]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - file
//  *            properties:
//  *              file:
//  *                type: string
//  *                format: binary
//  *     responses:
//  *       '200':
//  *         description: product Image Uploaded successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  * 
//  * /api/admin/retort/product/create:
//  *   post:
//  *     summary: Create a new products
//  *     tags: [Admin > Retort > Products]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - name
//  *              - description
//  *              - price
//  *              - type
//  *              - stock
//  *              - categories
//  *              - active
//  *            properties:
//  *              name:
//  *                type: string
//  *                default: product12 
//  *              categories:
//  *                type: array
//  *                items:
//  *                  type: number
//  *                example: [1111223344, 223344556]
//  *              description:
//  *                type: text
//  *                default: desc
//  *              price:
//  *                type: text
//  *                default: 123.00
//  *              type:
//  *                type: text
//  *                default: new
//  *              stock:
//  *                type: integer
//  *                default: 10
//  *              active:
//  *                type: boolean
//  *                default: 0 
//  *     responses:
//  *       '200':
//  *         description: products created successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  * 
//  * /api/admin/retort/product/list?size={size}&skip={skip}:
//  *   get:
//  *     summary: Get all products
//  *     tags: [Admin > Retort > Products]
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
//  *         description: products retrieved successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  * 
//  * /api/admin/retort/product/get/{id}:
//  *   get:
//  *     summary: Get a Product by ID
//  *     tags: [Admin > Retort > Products]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         default: 1
//  *         schema:
//  *           type: string
//  *         description: ID of the Product to retrieve
//  *     responses:
//  *       '200':
//  *         description: products retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: string
//  *               description: ID of the products to retrieve
//  *       '401':
//  *         description: Unauthorized
//  *       '404':
//  *         description: products not found
//  * 
//  * /api/admin/retort/product/update/{id}:
//  *   put:
//  *     summary: Update a Product
//  *     tags: [Admin > Retort > Products]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         default: 1
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the products to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - name
//  *              - description
//  *              - categories
//  *              - price
//  *              - type
//  *              - stock
//  *              - active
//  *            properties:
//  *              name:
//  *                type: string
//  *                default: AdminProductNew
//  *              categories:
//  *                type: array
//  *                items:
//  *                  type: number
//  *                example: [1111223344, 223344556]
//  *              description:
//  *                type: string
//  *                default: descr
//  *              price:
//  *                type: number
//  *                default: 178
//  *              type:
//  *                type: text
//  *                default: upcoming
//  *              stock:
//  *                type: number
//  *                default: 52
//  *              active:
//  *                type: string
//  *                default: 1
//  *     responses:
//  *       '200':
//  *         description: products updated successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  *       '404':
//  *         description: products not found
//  * 
//  * /api/admin/retort/product/delete:
//  *   delete:
//  *     summary: Delete a Product
//  *     tags: [Admin > Retort > Products]
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
//  *         description: Product deleted successfully
//  *       '401':
//  *         description: Unauthorized
//  *       '404':
//  *         description: products not found 
//  * 
//  * /api/admin/retort/product/assign-category:
//  *   post:
//  *     summary: Assign Category
//  *     tags: [Admin > Retort > Products]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - productId
//  *              - categoryId
//  *            properties:
//  *              productId:
//  *                type: number
//  *                default: 1 
//  *              categoryId:
//  *                type: number
//  *                default: 1
//  *     responses:
//  *       '200':
//  *         description: Assigned successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  * 
//  * /api/admin/retort/product/unassign-category:
//  *   post:
//  *     summary: Un-Assign Category
//  *     tags: [Admin > Retort > Products]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - productId
//  *              - categoryId
//  *            properties:
//  *              productId:
//  *                type: number
//  *                default: 1 
//  *              categoryId:
//  *                type: number
//  *                default: 1
//  *     responses:
//  *       '200':
//  *         description: Un-Assigned successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  */
// router.post("/create", hasPermission('retort', 'create'), validateCreateProductsBody, RetortProductsController.create);
// router.get("/list", hasPermission('retort', 'read'), validateListProductsQuery, RetortProductsController.list);
// router.get("/get/:id", hasPermission('retort', 'read'), validateEditProductsParams, RetortProductsController.get);
// router.put("/update/:id", hasPermission('retort', 'update'), validateEditProductsParams, validateEditProductsBody, RetortProductsController.update);
// router.delete("/delete", hasPermission('retort', 'delete'), validateEditMultipleIdsBody, RetortProductsController.delete);
// // ====== Products Ends ======

// router.post("/image/upload", hasPermission('retort', 'create'), upload.single('file'), RetortProductsController.uploadImage);
// router.post("/assign-category", validateAssignCategoryBody, RetortProductsController.assignCategory);
// router.post("/unassign-category", validateAssignCategoryBody, RetortProductsController.unAssignCategory);

// export default router;
