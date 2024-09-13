import * as express from "express";
import AuthController from "../controllers";
import * as AuthValidation from "../validations";
import { auth } from '../../../middlewares/auth';

const router = express.Router();
const { validateLoginBody, validateChangePasswordBody } = AuthValidation;
const { login, changePassword } = AuthController;

// ====== Auth Start ======

// * /api/auth/login:
// *   post:
// *     summary: login
// *     tags: [AUTH]
// *     security:
// *       - bearerAuth: []
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *            type: object
// *            required:
// *              - email
// *              - password
// *            properties:
// *              email:
// *                type: string
// *                default: admin@gmail.com
// *              password:
// *                type: string
// *                default: admin
// *     responses:
// *       '200':
// *         description: logged in successfully
// *       '400':
// *         description: Invalid request body
// *       '401':
// *         description: Unauthorized
/**
 * @swagger
 * 
 * /api/auth/change-password:
 *   post:
 *     summary: change password
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
 *              - old_password
 *              - new_password
 *            properties:
 *              old_password:
 *                type: string
 *                default: admin
 *              new_password:
 *                type: string
 *                default: admin123
 *     responses:
 *       '200':
 *         description: logged in successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
// router.post("/login", validateLoginBody, login);
router.post("/change-password", auth, validateChangePasswordBody, changePassword);

export default router;
