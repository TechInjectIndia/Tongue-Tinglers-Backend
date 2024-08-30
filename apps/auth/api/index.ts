import * as express from "express";
import AuthController from "../controllers";
import * as AuthValidation from "../validations";

const router = express.Router();
const { validateLoginBody } = AuthValidation;
const { login } = AuthController;

// ====== Auth Start ======
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login
 *     tags: [AUTH]
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
 *                default: admin@gmail.com
 *              password:
 *                type: string
 *                default: admin
 *     responses:
 *       '200':
 *         description: logged in successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/login", validateLoginBody, login);

export default router;
