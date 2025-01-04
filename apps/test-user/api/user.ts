import * as express from "express";
// import AdminController from "../controllers/user";
import * as AdminValidation from "../validations/user";
import AdminController from "../../user/controllers/user";
import { Auth } from "../../auth/models";
import {
    checkFirebaseUser,
    createFirebaseUser,
    createPassword,
    EMAIL_HEADING,
    EMAIL_TEMPLATE,
    getEmailTemplate,
    sendEmail,
    sendResponse,
} from "../../../libraries";

import {
    BUSINESS_TYPE,
    IOrganizationPayloadData,
    ORGANIZATION_TYPE,
} from "../../../interfaces/organization";
import { QuestionRepo } from "../../questions/models";
import {
    createDummyMaster,
    createDummyProducts,
    getSampleAreas,
    getSampleFranchiseModels,
    getSampleProposals,
    getSampleQuestions,
    getSampleRegions,
} from "../utils";
import { AreaRepo } from "../../area/models/AreaRepo";
import { RegionRepo } from "../../region/models/RegionRepo";
import { FranchiseModelRepo } from "../../franchise_model/models";
import { ProposalModelRepo } from "../../proposal_model/models";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "constants/response-messages";
import { AdminRepo } from "apps/user/models/user";
import { TUser, USER_TYPE } from "apps/user/interface/user";
import { UserModel } from "apps/user/models/UserTable";
import { OrganizationRepo } from "apps/organization/models";
import { sequelize } from "config";
import { ProductsCategoryModel } from "apps/products-category/models/ProductCategoryTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { ProductModel } from "apps/product/model/productTable";
import { ProductOptionsModel } from "apps/product-options/models/productOptionTable";
import { BaseProductOptions } from "interfaces/product-options";

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
router.post("/create", validateCreateAdminBody, async (req, res) => {
    try {
        const payload = { ...req?.body, createdBy: 1 };

        const existingAdmin = await new Auth().getUserByEmail(payload.email);
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
        } catch (emailError) {
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
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});

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
 */ router.get("/superOrg", async (req, res) => {
    try {
        const payload = { ...req?.body, createdBy: 1 };

        const email = "admin@TongueTingler.com";
        const password = "123456";

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
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            fbCreateUserRes.error ??
                                "Failed to create user with Firebase auth"
                        )
                    );
            } else {
                uid = fbCreateUserRes.uid;
            }
        }

        if (!uid) {
            return res
                .status(400)
                .send(sendResponse(RESPONSE_TYPE.ERROR, "no uid"));
        }

        let admin: TUser = await new Auth().getUserByEmail(email);

        if (!admin) {
            const hashedPassword = await createPassword(password);

            admin = await new AdminRepo()
                .create({
                    firstName: "Root",
                    lastName: "User",
                    phoneNumber: "+918220735528",
                    nameForSearch: "",
                    referBy: undefined,
                    type: USER_TYPE.ADMIN,
                    email,
                    role: 0,
                    password: hashedPassword,
                    firebaseUid: uid,
                } as TUser)
                .then((uModel) => (uModel as UserModel).toJSON());
        }

        const repo = new OrganizationRepo();
        let superFranOrg = await repo.getByRootUser(admin.id);
        let createSampleData = false;
        if (!superFranOrg) {
            createSampleData = true;
            const TTOrgParams: IOrganizationPayloadData = {
                name: "Tongue Tinglers (Super)",
                contactPersonName: "Munawar Ahmed",
                contactNumber: "+918220735528",
                contactEmail: "admin@tonguetingler.com",
                pan: "BVKPM7409K",
                gst: "33BVKPM7409K1Z8",
                bankName: "Bank of India",
                bankAccountNumber: "823748272340",
                bankIFSCCode: "BKI00023",
                businessType: BUSINESS_TYPE.PROPRIETORSHIP,
                type: ORGANIZATION_TYPE.SUPER_FRANCHISE,
                billingAddress: {
                    street: "GROUND FLOOR, 123/76, Peters Road, Royapettah,",
                    city: "Chennai",
                    state: "Tamil Nadu",
                    postalCode: "600014",
                    country: "India",
                    phoneNumber: "918220735528",
                    firstName: "Munawar",
                    lastName: "Ahmed",
                },
                shippingAddress: [
                    {
                        street: "GROUND FLOOR, 123/76, Peters Road, Royapettah,",
                        city: "Chennai",
                        state: "Tamil Nadu",
                        postalCode: "600014",
                        country: "India",
                        phoneNumber: "918220735528",
                        firstName: "Munawar",
                        lastName: "Ahmed",
                    },
                ],
                masterFranchiseId: null,
                rootUser: admin.id,
                createdBy: 1,
                updatedBy: null,
                deletedBy: null,
            };
            superFranOrg = await repo.create(TTOrgParams, admin.id);
        }
        if (createSampleData) await createDummyMaster(admin.id);

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
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});

/**
 * @swagger
 * /api/admin/test-user/createEverything:
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
router.get("/createEverything", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const dummyData = await createDummyProducts();

        const categoryData = dummyData.category;
        const categoryCreated = await ProductsCategoryModel.create(
            categoryData
        );

        const optionsData = dummyData.options;
        const optionsCreated = await OptionsModel.bulkCreate(optionsData);

        const optionsValueData = dummyData.optionValues;
        const optionsValueCreated = await OptionsValueModel.bulkCreate(
            optionsValueData
        );

        const productData = dummyData.product;
        let variationIds: number[] = []; // Array to store created option IDs

        // Step 1: Create the product with a default empty array for `variationIds`
        const createdProduct = await ProductModel.create({
            name: productData.name,
            slug: productData.slug,
            description: productData.description,
            MOQ: productData.MOQ,
            category: productData.category,
            type: productData.type,
            status: productData.status,
            images: productData.images,
            vendorId: productData.vendorId, // Initialize with an empty array
            tax_rate_id: productData.tax_rate_id,
            createdBy: productData.createdBy,
        });
        if (productData.variations && Array.isArray(productData.variations)) {
            const productOptions = await productData.variations.map(
                (option) => ({
                    product_id: createdProduct.id, // Link the option to the created product
                    optionValueId: option.optionValueId,
                    price: option.price,
                    stock: option.stock,
                    status: option.status,
                    images: option.images,
                })
            );
            const createdOptions = await ProductOptionsModel.bulkCreate(
                productOptions
            );

            variationIds = await createdOptions.map((option) => option.id);
        }

        await createdProduct.addVariations(variationIds);

        await transaction.commit();

        return res.status(200).send(
            sendResponse(
                RESPONSE_TYPE.SUCCESS,
                "Entities created successfully",
                {
                    category: categoryCreated,
                    options: optionsCreated,
                    optionValues: optionsValueCreated,
                    product: createdProduct,
                }
            )
        );
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});

/**
 * @swagger
 * /api/admin/test-user/sampleData:
 *   get:
 *     summary: Run this after superOrg to create sample data
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
 */ router.get("/sampleData", async (req, res) => {
    try {
        const email = "admin@TongueTingler.com";
        let admin: TUser = await new Auth().getUserByEmail(email);
        await createDummyMaster(admin.id);
        return res
            .status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.ADMIN_CREATED
                )
            );
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});

router.post("/prospect", validateCreateAdminBody, addProspectUser);
// ====== Admins Routes Ends ======

export default router;
