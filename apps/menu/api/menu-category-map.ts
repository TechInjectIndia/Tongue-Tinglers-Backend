import * as express from "express";
import MenuCategoryMapController from "../controllers/menu-category-map";
import * as MenuCategoryMapValidation from "../validations/menu-category-map";

const router = express.Router();

const {
  validateCreateMenuCategoryMapBody,
  validateEditMultipleIdsBody,
} = MenuCategoryMapValidation;

// ====== Menu Starts ======
/**
 * @swagger
 * /api/admin/menu/category/create:
 *   post:
 *     summary: Create a new Menu Category
 *     tags: [Admin > Menu > Category > Map]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - menuId
 *              - categoryId
 *            properties:
 *              menuId:
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
 * /api/admin/menu/category/delete:
 *   delete:
 *     summary: Delete a Menu Category Map
 *     tags: [Admin > Menu > Category > Map]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - menuId
 *              - categoryId
 *            properties:
 *              menuId:
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
router.post("/create", validateCreateMenuCategoryMapBody, MenuCategoryMapController.create);
router.delete("/delete", validateEditMultipleIdsBody, MenuCategoryMapController.delete);
// ====== Menu Ends ======

export default router;
