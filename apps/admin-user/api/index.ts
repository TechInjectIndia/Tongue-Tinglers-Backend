import * as express from "express";
import AdminController from "../controllers/user";
import RolesController from "../controllers/roles";
import PermissionController from "../controllers/permissions";
import FranchiseeController from "../controllers/franchisee";
import * as AdminValidation from "../validations";

const router = express.Router();

const {
  validateCreateFranchiseeBody,
  validateEditFranchiseeParams,
  validateEditFranchiseeBody,
  validateListFranchiseeQuery,
  validateCreateRoleBody,
  validateEditRoleBody,
  validateEditRoleParams,
  validateListRoleQuery,
  validateListAdminQuery,
  validateCreateAdminBody,
  validateEditAdminParams,
  validateEditAdminBody,
  validateEditMultipleIdsBody,
  validateCreatePermissionBody,
  validateListPermissionQuery,
  validateEditPermissionParams,
  validateEditPermissionBody
} = AdminValidation;

const { getAdmins, addAdmin, editAdmin, deleteAdmin, getAdmin, } = AdminController;

// ====== Admins Routes Start ======
/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Create a new Admin
 *     tags: [Admin > Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - role
 *              - address
 *              - active
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              full_name:
 *                type: string
 *              contact_number:
 *                type: string
 *              phone_code:
 *                type: string
 *              role:
 *                type: number
 *              address:
 *                type: string
 *              active:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Admin created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Admin
 *     tags: [Admin > Users]
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
 *         description: Admin retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/get/{id}:
 *   get:
 *     summary: Get a admin by ID
 *     tags: [Admin > Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the admin to retrieve
 *     responses:
 *       '200':
 *         description: Admin retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Admin to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Admin not found
 * 
 * /api/admin/update/{id}:
 *   put:
 *     summary: Update a admin
 *     tags: [Admin > Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Admin to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - role
 *              - address
 *              - active
 *            properties:
 *              email:
 *                type: string
 *              full_name:
 *                type: string
 *              contact_number:
 *                type: string
 *              phone_code:
 *                type: string
 *              role:
 *                type: number
 *              address:
 *                type: string
 *              active:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Admin updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Admin not found
 * 
 * /api/admin/delete:
 *   delete:
 *     summary: Delete a admin
 *     tags: [Admin > Users]
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
 *         description: role deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Admin not found
 */
router.post("/create", validateCreateAdminBody, addAdmin);
router.get("/list", validateListAdminQuery, getAdmins);
router.get("/get/:id", validateEditAdminParams, getAdmin);
router.put("/update/:id", validateEditAdminParams, validateEditAdminBody, editAdmin);
router.delete("/delete", validateEditMultipleIdsBody, deleteAdmin); // Soft delete single or multiple
// ====== Admins Routes Ends ======

const { getFranchisees, addFranchisee, editFranchisee, deleteFranchisee, getFranchisee, } = FranchiseeController;
// ====== Franchisee Start ======
/**
 * @swagger
 * /api/admin/franchisee/create:
 *   post:
 *     summary: Create a new Franchisee
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - address
 *              - active
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              full_name:
 *                type: string
 *              contact_number:
 *                type: string
 *              phone_code:
 *                type: string
 *              address:
 *                type: string
 *              active:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Franchisee created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/franchisee/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Franchisee
 *     tags: [Admin > Franchise]
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
 *         description: Franchisee retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/franchisee/get/{id}:
 *   get:
 *     summary: Get a Franchisee by ID
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Franchisee to retrieve
 *     responses:
 *       '200':
 *         description: Franchisee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Franchisee to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Franchisee not found
 * 
 * /api/admin/franchisee/update/{id}:
 *   put:
 *     summary: Update a Franchisee
 *     tags: [Admin > Franchise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Franchisee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - full_name
 *              - contact_number
 *              - phone_code
 *              - address
 *              - active
 *            properties:
 *              email:
 *                type: string
 *                default: 12@gmail.com
 *              full_name:
 *                type: string
 *              contact_number:
 *                type: string
 *              phone_code:
 *                type: string
 *              address:
 *                type: string
 *              active:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Franchisee updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Franchisee not found
 * 
 * /api/admin/franchisee/delete:
 *   delete:
 *     summary: Delete a Franchisee
 *     tags: [Admin > Franchise]
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
 *         description: Franchisee deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Franchisee not found
 */
router.post("/franchisee/create", validateCreateFranchiseeBody, addFranchisee);
router.get("/franchisee/list", validateListFranchiseeQuery, getFranchisees);
router.get("/franchisee/get/:id", validateEditFranchiseeParams, getFranchisee);
router.put("/franchisee/update/:id", validateEditFranchiseeParams, validateEditFranchiseeBody, editFranchisee);
router.delete("/franchisee/delete", validateEditMultipleIdsBody, deleteFranchisee); // Soft delete single or multiple
// ====== Franchisee Routes Ends ======

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
 *              - role_permissions
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminRole 
 *              role_permissions:
 *                type: text
 *                default: "{}"
 *              active:
 *                type: boolean
 *                default: 0 
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
 *              - active
 *            properties:
 *              name:
 *                type: string
 *                default: AdminRoleNew
 *              active:
 *                type: string
 *                default: 1
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
 *                default: [1]
 *     responses:
 *       '200':
 *         description: role deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: roles not found
 */
router.post("/roles/create", validateCreateRoleBody, RolesController.addRole);
router.get("/roles/list", validateListRoleQuery, RolesController.listRoles);
router.get("/roles/get/:id", validateEditRoleParams, RolesController.getRole);
router.put("/roles/update/:id", validateEditRoleParams, validateEditRoleBody, RolesController.editRole);
router.delete("/roles/delete", validateEditMultipleIdsBody, RolesController.deleteRole);
// ====== Admin Roles Ends ======

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
router.post("/permissions/create", validateCreatePermissionBody, PermissionController.create);
router.get("/permissions/list", validateListPermissionQuery, PermissionController.list);
router.get("/permissions/get/:id", validateEditPermissionParams, PermissionController.get);
router.put("/permissions/update/:id", validateEditPermissionParams, validateEditPermissionBody, PermissionController.update);
router.delete("/permissions/delete", validateEditMultipleIdsBody, PermissionController.delete);
// ====== Admin Permissions Ends ======
export default router;
