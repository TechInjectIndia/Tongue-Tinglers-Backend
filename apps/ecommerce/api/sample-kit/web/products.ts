import * as express from "express";
import webProductsController from "../../../controllers/web/products";
import * as ProductsValidation from "../../../validations/web/products";

const router = express.Router();
const {
  validatTypeProductsParams,
  validateSingleProductsParams,
  validateSearchProductsParams,
  validateListProductsQuery,
} = ProductsValidation;

// ====== Products Starts ======
/**
 * @swagger
 * /api/product/all?size={size}&skip={skip}:
 *   get:
 *     summary: Get all products
 *     tags: [Frontend > Ecommerce > Products]
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
 * /api/product/get/type:
 *   get:
 *     summary: Get a Product by Tag
 *     tags: [Frontend > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: Limit of the Products to retrieve
 *       - in: query
 *         name: type
 *         required: true
 *         default: new
 *         schema:
 *           type: string
 *         description: (new or upcoming) Type of the Products to retrieve
 *     responses:
 *       '200':
 *         description: products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: limit of the products to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: products not found
 * 
 * /api/product/{slug}:
 *   get:
 *     summary: Get a Product by slug
 *     tags: [Frontend > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: Slug of the Product to retrieve
 *     responses:
 *       '200':
 *         description: product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Slug of the product to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: products not found
 * 
 * /api/product/search?search={search}:
 *   get:
 *     summary: Get Products by search
 *     tags: [Frontend > Ecommerce > Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: Products by search to retrieve
 *     responses:
 *       '200':
 *         description: products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Products by search to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: products not found
 * 
 */

router.get("/all", validateListProductsQuery, webProductsController.list);
router.get("/get/type/", validatTypeProductsParams, webProductsController.getByType);
router.get("/search", validateSearchProductsParams, webProductsController.search);
router.get("/:slug", validateSingleProductsParams, webProductsController.get);
// ====== Products Ends ======

export default router;
