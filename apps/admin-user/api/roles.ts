import * as express from "express";
import RolesController from "../controllers/roles";
import * as RolesValidation from "../validations/roles";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateCreateRoleBody,
  validateEditRoleBody,
  validateEditRoleParams,
  validateListRoleQuery,
  validateEditMultipleIdsBody,
} = RolesValidation;


// ====== Admin Roles Starts ======
/**
 * @swagger
 * /api/admin/roles/create:
 *   post:
 *     summary: Create a new roles
 *     tags: [Admin > Roles]
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
 *              - role_permissions
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminRole 
 *              description:
 *                type: text
 *                default: "description"
 *              role_permissions:
 *                type: text
 *                default: "{\"user\":[\"create\",\"update\",\"delete\",\"read\"]}"
 *              active:
 *                type: boolean
 *                default: true
 *     responses:
 *       '200':
 *         description: roles created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/roles/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all roles
 *     tags: [Admin > Roles]
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
 *         description: roles retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/roles/get/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Admin > Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the role to retrieve
 *     responses:
 *       '200':
 *         description: roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the roles to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: roles not found
 * 
 * /api/admin/roles/update/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Admin > Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the roles to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - role_permissions
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminRoleNew
 *              description:
 *                type: text
 *                default: "description"
 *              role_permissions:
 *                type: text
 *                default: "{\"user\":[\"create\",\"update\",\"delete\",\"read\"]}"
 *              active:
 *                type: string
 *                default: true
 *     responses:
 *       '200':
 *         description: roles updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: roles not found
 * 
 * /api/admin/roles/delete:
 *   delete:
 *     summary: Delete a role
 *     tags: [Admin > Roles]
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
 *                default: ["1"]
 *     responses:
 *       '200':
 *         description: role deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: roles not found
 */
router.post("/create", hasPermission('roles', 'create'), RolesController.validateRolePermissions, validateCreateRoleBody, RolesController.create);
router.get("/list", hasPermission('roles', 'read'), validateListRoleQuery, RolesController.list);
router.get("/get/:id", hasPermission('roles', 'read'), validateEditRoleParams, RolesController.get);
router.put("/update/:id", hasPermission('roles', 'update'), RolesController.validateRolePermissions, validateEditRoleParams, validateEditRoleBody, RolesController.update);
router.delete("/delete", hasPermission('roles', 'delete'), validateEditMultipleIdsBody, RolesController.deleteRole);
// ====== Admin Roles Ends ======

export default router;
