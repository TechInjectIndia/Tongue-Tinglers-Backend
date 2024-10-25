import * as express from "express";
import ProductTagsController from "../controllers/tags";
import * as ProductTagsValidation from "../validations/tags";

const router = express.Router();

const {
  validateCreateTagBody,
  validateEditTagBody,
  validateEditTagParams,
  validateListTagQuery,
  validateEditMultipleIdsBody,
} = ProductTagsValidation;

// ====== Product Tags Starts ======
/**
 * @swagger
 * /api/admin/product/tag/create:
 *   post:
 *     summary: Create a new product Tag
 *     tags: [Admin > Ecommerce > Product > Tags]
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
 *                default: Admintags 
 *              description:
 *                type: text
 *                default: desc
 *              active:
 *                type: boolean
 *                default: 0 
 *     responses:
 *       '200':
 *         description: product Tag created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/product/tag/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all product Tags
 *     tags: [Admin > Ecommerce > Product > Tags]
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
 *         description: product Tags retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/product/tag/get/{id}:
 *   get:
 *     summary: Get a tags by ID
 *     tags: [Admin > Ecommerce > Product > Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the tags to retrieve
 *     responses:
 *       '200':
 *         description: product Tag retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the product Tag to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: product Tags not found
 * 
 * /api/admin/product/tag/update/{id}:
 *   put:
 *     summary: Update a tags
 *     tags: [Admin > Ecommerce > Product > Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product Tag to update
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
 *                default: AdmintagsNew
 *              description:
 *                type: string
 *                default: desc
 *              active:
 *                type: string
 *                default: 1
 *     responses:
 *       '200':
 *         description: product Tags updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: product Tags not found
 * 
 * /api/admin/product/tag/delete:
 *   delete:
 *     summary: Delete a tag
 *     tags: [Admin > Ecommerce > Product > Tags]
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
 *         description: tags deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: product Tags not found
 */
router.post("/create", validateCreateTagBody, ProductTagsController.create);
router.get("/list", validateListTagQuery, ProductTagsController.list);
router.get("/get/:id", validateEditTagParams, ProductTagsController.get);
router.put("/update/:id", validateEditTagParams, validateEditTagBody, ProductTagsController.update);
router.delete("/delete", validateEditMultipleIdsBody, ProductTagsController.delete);
// ====== ProductTags Ends ======

export default router;
