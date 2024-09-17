import * as express from "express";
import MenuCategoryMapController from "../controllers/menu-category-map";
import * as MenuCategoryMapValidation from "../validations/menu-category-map";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateCreateMenuCategoryMapBody,
  validateEditMultipleIdsBody,
} = MenuCategoryMapValidation;

// ====== Menu Starts ======
/**
 * @swagger
 * /api/admin/menu/category/map/assign:
 *   post:
 *     summary: Assign menu to category
 *     tags: [Admin > Menu > Category]
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
 * /api/admin/menu/category/map/unassign:
 *   post:
 *     summary: Un-Assign menu to category
 *     tags: [Admin > Menu > Category]
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
router.post("/assign", hasPermission('menu', 'update'), validateCreateMenuCategoryMapBody, MenuCategoryMapController.assign);
router.post("/unassign", hasPermission('menu', 'update'), validateEditMultipleIdsBody, MenuCategoryMapController.unassign);
// ====== Menu Ends ======

export default router;
