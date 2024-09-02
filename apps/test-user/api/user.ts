import * as express from "express";
import AdminController from "../controllers/user";
import * as AdminValidation from "../validations/user";

const router = express.Router();

const {
  validateCreateAdminBody,
} = AdminValidation;

const { addAdmin } = AdminController;

// ====== Admins Routes Start ======
/**
 * @swagger
 * /api/admin/test-user/create:
 *   post:
 *     summary: Create a new Test User
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
 *              - firstName
 *              - lastName
 *              - userName
 *              - phoneNumber
 *              - status
 *              - role
 *            properties:
 *              email:
 *                type: string
 *                default: admin@gmail.com
 *              password:
 *                type: string
 *                default: admin
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
 */
router.post("/create", validateCreateAdminBody, addAdmin);
// ====== Admins Routes Ends ======

export default router;
