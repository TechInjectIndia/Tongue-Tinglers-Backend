import * as express from "express";
// import AdminController from "../controllers/user";
import * as AdminValidation from "../validations/user";
import AdminController from "../../user/controllers/user";
import {Auth} from "../../auth/models";
import {
    checkFirebaseUser,
    createFirebaseUser,
    createPassword,
    EMAIL_HEADING,
    EMAIL_TEMPLATE,
    getEmailTemplate,
    sendEmail,
    sendResponse
} from "../../../libraries";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE
} from "../../../constants";
import {AdminRepo} from "../../user/models/user";
import {USER_TYPE} from "../../../interfaces";
import {OrganizationRepo} from "../../organization/models";
import {TUser} from "../../../types";
import {UserModel} from "../../../database/schema";
import {
    BUSINESS_TYPE,
    IOrganizationPayloadData,
    ORGANIZATION_TYPE
} from "../../../interfaces/organization";
import {QuestionRepo} from "../../questions/models";
import {
    getSampleAreas,
    getSampleFranchiseModels,
    getSampleProposals,
    getSampleQuestions,
    getSampleRegions
} from "../utils";
import {AreaRepo} from "../../area/models/AreaRepo";
import {RegionRepo} from "../../region/models/RegionRepo";
import {FranchiseModelRepo} from "../../franchise_model/models";
import {ProposalModelRepo} from "../../proposal_model/models";

const router = express.Router();

const {validateCreateAdminBody} = AdminValidation;

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
 *              - phoneNumber
 *              - status
 *              - role
 *            properties:
 *              email:
 *                type: string
 *                default: admin@gmail.com
 *              password:
 *                type: string
 *                default: 123456
 *              firstName:
 *                type: string
 *              lastName:
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

        const payload = {...req?.body, createdBy: 1};

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

async function createDummyMaster(user_id: number) {
    const questions = getSampleQuestions();
    const areas = getSampleAreas();
    const regions = getSampleRegions();
    const franchiseModels = getSampleFranchiseModels();
    const proposals = getSampleProposals();

    const qRepo = new QuestionRepo();
    const questionsProm = Promise.all(questions.map(
        q => qRepo.create({createdBy: user_id, ...q}, user_id)));

    const aRepo = new AreaRepo();
    const areasProm = Promise.all(areas.map(
        a => aRepo.create({createdBy: user_id, ...a}))).then(_ => {
        const rRepo = new RegionRepo();
        Promise.all(regions.map(
            r => rRepo.create({createdBy: user_id, ...r})));
    });

    const fmRepo = new FranchiseModelRepo();
    const franchiseModelsProm = Promise.all(franchiseModels.map(
        fm => fmRepo.create(fm, user_id))).then(_ => {
        const pRepo = new ProposalModelRepo();
        Promise.all(proposals.map(p => pRepo.create(p)));
    });

    return Promise.all(
        [areasProm, franchiseModelsProm, questionsProm]);
}

/**
 * @swagger
 * /api/admin/test-user/superOrg:
 *   get:
 *     summary: Create a new Root User (admin@tonguetingler.com, pass:123456)
 *     tags: [AUTH]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.get("/superOrg", (async (req, res) => {
    try {

        const payload = {...req?.body, createdBy: 1};

        const email = 'admin@TongueTingler.com';
        const password = '123456';


        const fbCheckUserRes = await checkFirebaseUser(email);
        let uid = null;
        if (fbCheckUserRes.success) {
            uid = fbCheckUserRes.uid;
        } else {
            const fbCreateUserRes = await createFirebaseUser({
                email: email,
                emailVerified: true,
                phoneNumber: null,
                password: password,
                disabled: false,
            });
            if (!fbCreateUserRes.success) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        fbCreateUserRes.error ??
                        'Failed to create user with Firebase auth'));
            } else {
                uid = fbCreateUserRes.uid;
            }
        }

        if (!uid) {
            return res
                .status(400)
                .send(sendResponse(RESPONSE_TYPE.ERROR, 'no uid'));
        }

        let admin: TUser = (await new Auth().getUserByEmail(
            email
        ));

        if (!admin) {
            const hashedPassword = await createPassword(password);

            admin = await new AdminRepo().create({
                "firstName": "Root",
                "lastName": "User",
                "phoneNumber": "+918220735528",
                nameForSearch: "",
                referBy: undefined,
                "type": USER_TYPE.ADMIN,
                email,
                "role": 0,
                password: hashedPassword,
                firebaseUid: uid
            }).then(uModel => (uModel as UserModel).toJSON());
        }

        const repo = new OrganizationRepo();
        let superFranOrg = await repo.getByRootUser(admin.id)
        let createSampleData = false;
        if (!superFranOrg) {
            createSampleData = true;
            const TTOrgParams: IOrganizationPayloadData = {
                "name": "Tongue Tinglers (Super)",
                "contactPersonName": "Munawar Ahmed",
                "contactNumber": "+918220735528",
                "contactEmail": "admin@tonguetingler.com",
                "pan": "BVKPM7409K",
                "gst": "33BVKPM7409K1Z8",
                "bankName": "Bank of India",
                "bankAccountNumber": "823748272340",
                "bankIFSCCode": "BKI00023",
                "businessType": BUSINESS_TYPE.PROPRIETORSHIP,
                "type": ORGANIZATION_TYPE.SUPER_FRANCHISE,
                "billingAddress": {
                    "street": "GROUND FLOOR, 123/76, Peters Road, Royapettah,",
                    "city": "Chennai",
                    "state": "Tamil Nadu",
                    "postalCode": "600014",
                    "country": "India",
                    "phoneNumber": "918220735528",
                    "firstName": "Munawar",
                    "lastName": "Ahmed"
                },
                "shippingAddress": [
                    {
                        "street": "GROUND FLOOR, 123/76, Peters Road, Royapettah,",
                        "city": "Chennai",
                        "state": "Tamil Nadu",
                        "postalCode": "600014",
                        "country": "India",
                        "phoneNumber": "918220735528",
                        "firstName": "Munawar",
                        "lastName": "Ahmed"
                    }
                ],
                masterFranchiseId: null,
                rootUser: admin.id,
                createdBy: admin.id,
                updatedBy: null,
                deletedBy: null
            }
            superFranOrg = await repo.create(TTOrgParams, admin.id);
        }
        console.log(admin, superFranOrg)

        if(createSampleData) await createDummyMaster(admin.id);

        //todo @Nitesh uncomment

        // const emailContent = await getEmailTemplate(
        //     EMAIL_TEMPLATE.WELCOME_ADMIN_USER,
        //     {
        //         email: payload.email,
        //         link: "some-link",
        //     }
        // );

        // const mailOptions = {
        //     to: payload.email,
        //     subject: EMAIL_HEADING.WELCOME_ADMIN_USER,
        //     templateParams: {
        //         heading: EMAIL_HEADING.WELCOME_ADMIN_USER,
        //         description: emailContent,
        //     },
        // };

        // await sendEmail(
        //     mailOptions.to,
        //     mailOptions.subject,
        //     mailOptions.templateParams
        // );

        return res
            .status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.ADMIN_CREATED,
                    superFranOrg
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
