import * as express from "express";
import CustomerController from "../controllers/customer";
import * as CustomerValidation from "../validations/customer";

const router = express.Router();

const {
  validateListCustomerQuery,
  validateCreateCustomerBody,
  validateEditCustomerParams,
  validateEditCustomerBody,
  validateEditMultipleIdsBody,
} = CustomerValidation;

const { list, create, update, deleteCustomer, get } = CustomerController;

// ====== Customers Routes Start =====  =
/**
 * @swagger
 * /api/admin/customer/create:
 *   post:
 *     summary: Create a new User
 *     tags: [Admin > Customer]
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
 *                default: Customer@gmail.com
 *              password:
 *                type: string
 *                default: Customer
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
 * /api/admin/customer/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Users
 *     tags: [Admin > Customer]
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
 * /api/admin/customer/get/{id}:
 *   get:
 *     summary: Get a User by ID
 *     tags: [Admin > Customer]
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
 * /api/admin/customer/update/{id}:
 *   put:
 *     summary: Update a User
 *     tags: [Admin > Customer]
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
 * /api/admin/customer/delete:
 *   delete:
 *     summary: Delete a User
 *     tags: [Admin > Customer]
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
router.post("/create", validateCreateCustomerBody, create);
router.get("/list", validateListCustomerQuery, list);
router.get("/get/:id", validateEditCustomerParams, get);
router.put("/update/:id", validateEditCustomerParams, validateEditCustomerBody, update);
router.delete("/delete", validateEditMultipleIdsBody, deleteCustomer); // Soft delete single or multiple
// ====== Customers Routes Ends ======

export default router;
