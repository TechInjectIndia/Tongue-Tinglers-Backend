import * as express from "express";
import AdminController from "../controllers/user";
import * as AdminValidation from "../validations/user";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
  validateListAdminQuery,
  validateCreateAdminBody,
  validateEditAdminParams,
  validateEditAdminBody,
  validateUpdateType,
  validateEditMultipleIdsBody,
} = AdminValidation;

const { getAdmins, getAllUsers, addAdmin, editAdmin, deleteAdmin, getAdmin,getAdminFirebaseUid, updateType } = AdminController;

// ====== Admins Routes Start ======
/**
 * @swagger
 * /api/admin/users/create:
 *   post:
 *     summary: Create a new User
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
 *              - firstName
 *              - lastName
 *              - userName
 *              - phoneNumber
 *              - status
 *              - role
 *            properties:
 *              email:
 *                type: string
 *                default: admin@gmail.com
 *              password:
 *                type: string
 *                default: admin
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              status:
 *                type: string
 *                default: active
 *              role:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/users/list-all?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Users
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
 *         description: Users retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/users/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get admin Users
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
 *         description: Users retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/users/get/{id}:
 *   get:
 *     summary: Get a User by ID
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
 *         description: ID of the User to retrieve
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the User to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 * 
 * /api/admin/users/update/{id}:
 *   put:
 *     summary: Update a User
 *     tags: [Admin > Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the User to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - userName
 *              - phoneNumber
 *              - status
 *              - role
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              status:
 *                type: string
 *                default: active
 *              role:
 *                type: number
 *                default: 0 
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 * 
 * /api/admin/users/delete:
 *   delete:
 *     summary: Delete a User
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
 *         description: user deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 * 
 * /api/admin/users/update-type/{id}:
 *   put:
 *     summary: Update a Type
 *     tags: [Admin > Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the User to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - type
 *            properties:
 *              type:
 *                type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */
router.post("/create", hasPermission('admin', 'create'), validateCreateAdminBody, addAdmin);
router.get("/list", hasPermission('admin', 'read'), validateListAdminQuery, getAdmins);
router.get("/list-all", hasPermission('admin', 'read'), validateListAdminQuery, getAllUsers);
router.get("/get/:id", hasPermission('admin', 'read'), validateEditAdminParams, getAdmin);
router.get("/get-firebase/:id", hasPermission('admin', 'read'), validateEditAdminParams, getAdminFirebaseUid);
router.put("/update/:id", hasPermission('admin', 'update'), validateEditAdminParams, validateEditAdminBody, editAdmin);
router.put("/update-type/:id", hasPermission('admin', 'update'), validateEditAdminParams, validateUpdateType, updateType);
router.delete("/delete", hasPermission('admin', 'delete'), validateEditMultipleIdsBody, deleteAdmin); // Soft delete single or multiple
// ====== Admins Routes Ends ======

export default router;
