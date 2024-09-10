import * as express from "express";
import MenuProductCategoryMapController from "../controllers/menu-product-map";
import * as MenuCategoryMapValidation from "../validations/menu-product-map";

const router = express.Router();

const {
  validateCreateMenuCategoryMapBody,
  validateEditMultipleIdsBody,
} = MenuCategoryMapValidation;

// ====== Menu Starts ======
/**
 * @swagger
 * /api/admin/menu/product/map/assign:
 *   post:
 *     summary: Assign Category to Product
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
 *         description: Menu Category linked successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/product/map/unassign:
 *   post:
 *     summary: Un-Assign Category to Product
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
 *         description: Menu Category unlinked successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu Category not found
 */
router.post("/assign", validateCreateMenuCategoryMapBody, MenuProductCategoryMapController.assign);
router.post("/unassign", validateEditMultipleIdsBody, MenuProductCategoryMapController.unassign);
// ====== Menu Ends ======

export default router;
