import * as express from "express";
import AuthController from "../controllers";
import * as AuthValidation from "../validations";
import { auth } from '../../../middlewares/auth';

const router = express.Router();
const { validateLoginBody, validateChangePasswordBody, validateTokenBody, validateCreatePasswordBody, validateChangeFirebasePasswordBody } = AuthValidation;
const { login, changePassword, verifyPasswordToken, createPassword, changeFirebasePassword } = AuthController;

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
// /**
//  * @swagger
//  * 
//  * /api/auth/change-password:
//  *   post:
//  *     summary: change password
//  *     tags: [AUTH]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - old_password
//  *              - new_password
//  *            properties:
//  *              old_password:
//  *                type: string
//  *                default: admin
//  *              new_password:
//  *                type: string
//  *                default: admin123
//  *     responses:
//  *       '200':
//  *         description: logged in successfully
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  */
// router.post("/login", validateLoginBody, login);
router.post("/change-password", auth, validateChangePasswordBody, changePassword);


/**
 * @swagger
 *
 * /api/auth/verify-password-token:
 *   post:
 *     summary: Verify password reset token
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - token
 *            properties:
 *              token:
 *                type: string
 *                description: The JWT token sent to the user for password reset verification
 *     responses:
 *       '200':
 *         description: Token is valid
 *       '400':
 *         description: Invalid token
 *       '401':
 *         description: Unauthorized
 */
router.post("/verify-password-token", validateTokenBody, verifyPasswordToken);

/**
 * @swagger
 *
 * /api/auth/create-password:
 *   post:
 *     summary: Create a password for the user
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
 *              - token
 *              - new_password
 *            properties:
 *              token:
 *                type: string
 *                description: The JWT token sent to the user for password reset verification
 *              new_password:
 *                type: string
 *                description: The new password for the user
 *     responses:
 *       '200':
 *         description: Password created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/create-password", validateCreatePasswordBody, createPassword);

router.post("/change-firebase-password", validateChangeFirebasePasswordBody, changeFirebasePassword);

export default router;
