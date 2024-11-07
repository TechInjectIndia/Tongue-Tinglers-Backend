import * as express from "express";
import CartController from "../controllers/cartController";
import * as CartValidation from "../validations/CartValidations";
import { hasPermission } from "../../../middlewares";

const router = express.Router();

const {
  validateAddProduct,
  validateRemoveProduct,
  validateUpdateProduct,
} = CartValidation;

// ====== Cart Starts ====== 
/**
 * @swagger
 * 
 * /api/cart/empty:
 *   delete:
 *     summary: Empty a Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart emptied successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Cart not found
 * 
 * /api/cart:
 *   get:
 *     summary: Get a Cart for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Cart not found
 * 
 * /api/cart/product/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - productType
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: number
 *               productType:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Product added to the cart
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/cart/product/delete:
 *   delete:
 *     summary: delete a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - productType
 *             properties:
 *               product_id:
 *                 type: number
 *               productType:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Product deleted from the cart
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Product or cart not found
 * 
 * /api/cart/product/remove:
 *   put:
 *     summary: remove a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - productType
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: number
 *               productType:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Product updated in the cart
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 */
router.delete("/empty", CartController.empty);
router.get("/", CartController.getCartById);
router.post("/product/add", validateAddProduct, CartController.addProduct);
router.put("/product/remove", validateUpdateProduct, CartController.removeProduct);
router.delete("/product/delete", validateRemoveProduct, CartController.deleteProduct);

export default router;
// ====== Cart Ends ======
