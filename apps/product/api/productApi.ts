import * as express from 'express';
import ProductController from '../controllers/productController';
import { validateCreateProduct, validateProductList, validateProductById, validateUpdateProduct, validateDeleteProduct, validateChangeProductStatus } from "../validations/productValidations";

const router = express.Router();

const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, updateStatus}  = ProductController;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - description
 *         - MOQ
 *         - category
 *         - type
 *         - status
 *         - images
 *         - variationIds
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         slug:
 *           type: string
 *           description: The slug of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         MOQ:
 *           type: integer
 *           description: Minimum Order Quantity
 *         category:
 *           type: integer
 *           description: Product category ID
 *         type:
 *           type: string
 *           enum: [retort, packaging]
 *           description: The type of the product
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Product status
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the product
 *         variationIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of variation IDs associated with the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 */

/**
 * @swagger
 *  /api/admin/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/admin/product/list:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/admin/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/admin/product/update/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/admin/product/delete/{id}:
 *   put:
 *     summary: Soft delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was successfully deleted
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/admin/product/update-status/{id}:
 *   put:
 *     summary: Update the status of a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: The product status was successfully updated
 *       404:
 *         description: Product not found
 */


router.post('/create', validateCreateProduct, createProduct);
router.get('/list',validateProductList ,getAllProducts);
router.get('/:id', validateProductById, getProductById);
router.put('/update/:id',validateProductById, validateUpdateProduct, updateProduct);
router.put('/delete/:id', validateDeleteProduct, deleteProduct);
router.put('/update-status/:id',validateChangeProductStatus ,updateStatus);

export default router;