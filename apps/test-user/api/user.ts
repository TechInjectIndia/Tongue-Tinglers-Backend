import * as express from "express";
// import AdminController from "../controllers/user";
import * as AdminValidation from "../validations/user";
import AdminController from "../../user/controllers/user";
import { Auth } from "../../auth/models";
import { createFirebaseUser, createPassword, EMAIL_HEADING, EMAIL_TEMPLATE, getEmailTemplate, sendEmail, sendResponse } from "../../../libraries";
import { ERROR_MESSAGE, RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { AdminRepo } from "../../user/models/user";

const router = express.Router();

const { validateCreateAdminBody } = AdminValidation;

// const { addAdmin } = AdminController;
const {
    getAdmins,
    getAllUsers,
    addAdmin,
    editAdmin,
    deleteAdmin,
    getAdmin,
    addProspectUser,
} = AdminController;

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
router.post("/create", validateCreateAdminBody, (async (req, res) => {
    try {

        const payload = { ...req?.body, createdBy: 1 };

        const existingAdmin = await new Auth().getUserByEmail(
            payload.email
        );
        if (existingAdmin) {
            return res
                .status(400)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.ADMIN_EXISTS
                    )
                );
        }

        const firebaseUser = await createFirebaseUser({
            email: payload.email,
            emailVerified: true,
            phoneNumber: null,
            password: payload.password,
            disabled: false,
        });

        if (!firebaseUser?.success) {
            return res
                .status(400)
                .send(sendResponse(RESPONSE_TYPE.ERROR, firebaseUser?.uid));
        }

        const hashedPassword = await createPassword(payload.password);
        await new AdminRepo().create({
            ...payload,
            password: hashedPassword,
            firebaseUid: firebaseUser.uid,
        });

        try {
            const emailContent = await getEmailTemplate(
                EMAIL_TEMPLATE.WELCOME_ADMIN_USER,
                {
                    email: payload.email,
                    link: "some-link",
                }
            );

            const mailOptions = {
                to: payload.email,
                subject: EMAIL_HEADING.WELCOME_ADMIN_USER,
                templateParams: {
                    heading: EMAIL_HEADING.WELCOME_ADMIN_USER,
                    description: emailContent,
                },
            };

            await sendEmail(
                mailOptions.to,
                mailOptions.subject,
                mailOptions.templateParams
            );
        }
        catch (emailError) {
            console.error("Error sending email:", emailError);
        }

        return res
            .status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.ADMIN_CREATED
                )
            );
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
}))

router.post("/prospect", validateCreateAdminBody, addProspectUser);
// ====== Admins Routes Ends ======

export default router;
