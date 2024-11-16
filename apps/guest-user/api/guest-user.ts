import * as express from "express";
import GuestController from "../controllers/guest-user";
import { validateCreateGuestBody, validateEditGuestBody, validateEditGuestParams, validateEditMultipleIdsBody, validateListGuestQuery } from "../validations/guest-user";

const router = express.Router();

// const {
//   validateListGuestQuery,
//   validateCreateGuestBody,
//   validateEditGuestParams,
//   validateEditGuestBody,
//   validateEditMultipleIdsBody,
// } = GuestValidation;

const controller =  GuestController

// ====== Guest user Routes Start ======
/**
 * @swagger
 * /api/guest/users/create:
 *   post:
 *     summary: Create a new User
 *     tags: [Guest > Users]
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
 *                default: guest@gmail.com
 *              password:
 *                type: string
 *                default: guest
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
 * /api/guest/users/list-all?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Users
 *     tags: [Guest > Users]
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
 * /api/guest/users/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get guest Users
 *     tags: [Guest > Users]
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
 * /api/guest/users/get/{id}:
 *   get:
 *     summary: Get a User by ID
 *     tags: [Guest > Users]
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
 * /api/guest/users/update/{id}:
 *   put:
 *     summary: Update a User
 *     tags: [Guest > Users]
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
 * /api/guest/users/delete:
 *   delete:
 *     summary: Delete a User
 *     tags: [Guest > Users]
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
 */

router.get("/get/:id", validateEditGuestParams, controller.get);
router.get("/list-all", validateListGuestQuery, controller.getAll);
router.post("/create", validateCreateGuestBody, controller.save);
router.put("/update/:id", validateEditGuestParams, validateEditGuestBody, controller.edit);
router.delete("/delete", validateEditMultipleIdsBody, controller.delete); // Soft delete single or multiple
// router.get("/list", hasPermission('admin', 'read'), validateListGuestQuery, getGuests);

// ====== Guest user Routes Ends ======

export default router;