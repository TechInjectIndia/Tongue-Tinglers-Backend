import * as express from "express";
import CustomerRegisterController from "../controllers/customer-register";
import * as CustomerRegisterValidation from "../validations/customer-register";

const router = express.Router();

const {
  validateCreateCustomerBody,
} = CustomerRegisterValidation;

const { create } = CustomerRegisterController;

// ====== Customers Routes Start =====  =
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register User
 *     tags: [Customer > Register]
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
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/", validateCreateCustomerBody, create);
// ====== Customers Routes Ends ======

export default router;
