import * as express from "express";
import PermissionController from "../controllers/permissions";
import * as AdminValidation from "../validations/permissions";

const router = express.Router();

const {
  validateEditMultipleIdsBody,
  validateCreatePermissionBody,
  validateListPermissionQuery,
  validateEditPermissionParams,
  validateEditPermissionBody
} = AdminValidation;

// ====== Admin Permissions Starts =====
/**
 * @swagger
 * /api/admin/permissions/create:
 *   post:
 *     summary: Create a new permission
 *     tags: [Admin > Permissions]
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
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: roles 
 *              active:
 *                type: boolean
 *                default: 1
 *     responses:
 *       '200':
 *         description: permission created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/permissions/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all permissions
 *     tags: [Admin > Permissions]
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
 *         description: permissions retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/permissions/get/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Admin > Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the permission to retrieve
 *     responses:
 *       '200':
 *         description: permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the permissions to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: permissions not found
 * 
 * /api/admin/permissions/update/{id}:
 *   put:
 *     summary: Update permission
 *     tags: [Admin > Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the permissions to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: Admin
 *              active:
 *                type: string
 *                default: 1
 *     responses:
 *       '200':
 *         description: permissions updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: permissions not found
 * 
 * /api/admin/permissions/delete:
 *   delete:
 *     summary: Delete permission
 *     tags: [Admin > Permissions]
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
 *         description: permission deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: permissions not found
 */
router.post("/create", validateCreatePermissionBody, PermissionController.create);
router.get("/list", validateListPermissionQuery, PermissionController.list);
router.get("/get/:id", validateEditPermissionParams, PermissionController.get);
router.put("/update/:id", validateEditPermissionParams, validateEditPermissionBody, PermissionController.update);
router.delete("/delete", validateEditMultipleIdsBody, PermissionController.delete);
// ====== Admin Permissions Ends ======
export default router;
