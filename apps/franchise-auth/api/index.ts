import * as express from "express";
import franchiseAuthController from "../controllers";
import * as AuthValidation from "../validations";

const router = express.Router();

const { validateLoginFranchiseBody } = AuthValidation;
const { login } = franchiseAuthController;

// ====== Franchise Auth Start ======
/**
 * @swagger
 * /api/franchise/auth/login:
 *   post:
 *     summary: login
 *     tags: [Franchise > AUTH]
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
 *         description: Franchise logged in successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/login", validateLoginFranchiseBody, login);

export default router;
