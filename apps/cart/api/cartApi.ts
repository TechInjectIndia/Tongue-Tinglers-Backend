import * as express from "express";
import CartController from "../controllers/cartController";
import * as CartValidation from "../validations/CartValidations";
import { hasPermission } from "../../../middlewares";

const router = express.Router();

const {
  validateCreateCartBody,
  validateUpdateCartBody,
  validateCartParams,
} = CartValidation;

// ====== Cart Starts ====== 
/**
 * @swagger
 * /api/cart/create:
 *   post:
 *     summary: Create a new Cart
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
 *               - franchiseId
 *             properties:
 *               franchiseId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cart created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/cart/update/{cartId}:
 *   put:
 *     summary: Update a Cart Item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Cart to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Cart item updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Cart not found
 * 
 * /api/cart/empty/{cartId}:
 *   delete:
 *     summary: Empty a Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Cart to empty
 *     responses:
 *       '200':
 *         description: Cart emptied successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Cart not found
 */
router.post("/create", hasPermission('cart', 'create'), validateCreateCartBody, CartController.create);
router.put("/update/:cartId", hasPermission('cart', 'update'), validateCartParams, validateUpdateCartBody, CartController.update);
router.delete("/empty/:cartId", hasPermission('cart', 'delete'), validateCartParams, CartController.empty);

export default router;
// ====== Cart Ends ======
