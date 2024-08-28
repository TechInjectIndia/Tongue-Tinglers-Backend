import * as express from "express";
import customerAuthController from "../controllers";
import * as AuthValidation from "../validations";

const router = express.Router();

const { validateLoginCustomerBody } = AuthValidation;
const { login } = customerAuthController;

// ====== Customer Auth Start ======
/**
 * @swagger
 * /api/customer/auth/login:
 *   post:
 *     summary: login
 *     tags: [Customer > AUTH]
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
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       '200':
 *         description: Customer logged in successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/login", validateLoginCustomerBody, login);

export default router;
