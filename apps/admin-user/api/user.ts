import * as express from "express";
import AdminController from "../controllers/user";
import * as AdminValidation from "../validations/user";

const router = express.Router();

const {
  validateListAdminQuery,
  validateCreateAdminBody,
  validateEditAdminParams,
  validateEditAdminBody,
  validateEditMultipleIdsBody,
} = AdminValidation;

const { getAdmins, addAdmin, editAdmin, deleteAdmin, getAdmin, } = AdminController;

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
 *         description: User created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/users/list?size={size}&skip={skip}:
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
 *         description: role deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */
router.post("/create", validateCreateAdminBody, addAdmin);
router.get("/list", validateListAdminQuery, getAdmins);
router.get("/get/:id", validateEditAdminParams, getAdmin);
router.put("/update/:id", validateEditAdminParams, validateEditAdminBody, editAdmin);
router.delete("/delete", validateEditMultipleIdsBody, deleteAdmin); // Soft delete single or multiple
// ====== Admins Routes Ends ======

export default router;
