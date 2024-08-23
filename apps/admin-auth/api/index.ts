import * as express from "express";
import AuthController from "../controllers";
import * as AuthValidation from "../validations";

const router = express.Router();
const { validateLoginAdminBody } = AuthValidation;
const { login } = AuthController;

// ====== Admins Auth Start ======
/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: login
 *     tags: [Admin > AUTH]
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
 *         description: Admin logged in successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/login", validateLoginAdminBody, login);

export default router;
