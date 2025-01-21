import { Sequelize } from "sequelize";
import AdminController from "apps/user/controllers/user";
import {Auth} from "apps/auth/models";
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


import {createDummyLeads, createDummyMaster, createDummyProducts} from "../utils";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE
} from "constants/response-messages";
import {AdminRepo} from "apps/user/models/user";
import {TUser, USER_STATUS, USER_TYPE} from "apps/user/interface/user";
import {UserModel} from "apps/user/models/UserTable";
import {OrganizationRepo} from "apps/organization/models";
import {
    ProductsCategoryModel
} from "apps/products-category/models/ProductCategoryTable";
import {OptionsModel} from "apps/options/models/optionTable";
import {OptionsValueModel} from "apps/optionsValue/models/OptionValueTable";
import {ProductModel} from "apps/product/model/productTable";
import {
    ProductVariationsModel
} from "apps/product-options/models/ProductVariationTable";
import express, {Request, Response} from "express";
import {validateCreateAdminBody} from "../validations/user";
import config from "src/config/config";

import { sequelize } from "config";
import {
    BUSINESS_TYPE,
    IOrganizationPayloadData, ORGANIZATION_TYPE
} from "apps/organization/interface/organization";

import { LeadRepo } from "apps/lead/models/lead";
const router = express.Router();

const {
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
 */router.post("/create", validateCreateAdminBody, (async (req, res) => {
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
 */router.get("/superOrg", (async (req, res) => {
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
            } as TUser).then(uModel => (uModel as UserModel).toJSON());
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
                createdBy: 1,
                updatedBy: null,
                deletedBy: null
            }
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
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
}))

/**
 * @swagger
 * /api/admin/test-user/createEverything:
 *   get:
 *     summary: create product category & product options
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
router.get('/createEverything', createProductWithAssociations)

/**
 * @swagger
 * /api/admin/test-user/resetDatabase:
 *   get:
 *     summary: Create a new Root User (admin1@tonguetingler.com, pass:123456)
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
router.get('/resetDatabase', resetDatabase)

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
 */router.get("/sampleData", (async (req, res) => {
    try {
        const email = 'admin@TongueTingler.com';
        let admin: TUser = (await new Auth().getUserByEmail(
            email
        ));
        await createDummyMaster(admin.id);
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

async function createProductWithAssociations(req: Request, res: Response) {
    // const transaction = await sequelize.transaction();
    const tableSequences = [
        {tableName: 'products_categories', columnName: 'id'},
        {tableName: 'options', columnName: 'id'},
        {tableName: 'options_values', columnName: 'id'},
        {tableName: 'products', columnName: 'id'},
        {tableName: 'variations', columnName: 'id'},
    ];

    try {
        console.log("Transaction started");

        // Step 1: Generate dummy data
        const dummyData = createDummyProducts();

        // Step 2: Create category
        const categoryCreated = await ProductsCategoryModel.create(
            dummyData.category,
            // { transaction }
        );
        console.log("Category created:", categoryCreated.id);

        // Step 3: Bulk create options
        const optionsCreated = await OptionsModel.bulkCreate(
            dummyData.options,
            // { transaction, returning: true }
        );
        console.log("Options created:", optionsCreated.map((o) => o.id));

        // Step 4: Bulk create option values
        const optionsValueData = dummyData.optionValues.map((value, index) => ({
            ...value,
            option_id: optionsCreated[index].id, // Ensure option_id
                                                 // corresponds to options
        }));

        const optionsValueCreated = await OptionsValueModel.bulkCreate(
            optionsValueData,
            // { transaction, returning: true }
        );
        console.log("Option values created:",
            optionsValueCreated.map((ov) => ov.id));

        // Step 5: Create product
        const productData = dummyData.product;
        const createdProduct = await ProductModel.create(
            {
                ...productData,
                category: categoryCreated.id,
                createdBy: 1, // Assuming user ID is available in the request
            },
            // { transaction }
        );
        console.log("Product created:", createdProduct.id);

        // Reload the product to ensure it is fully committed
        // await createdProduct.reload({ transaction });

        // Step 6: Create product variations
        if (productData.variations && Array.isArray(productData.variations)) {
            const productVariations = productData.variations.map(
                (variation, index) => ({
                    product_id: createdProduct.id,
                    optionValueId: optionsValueCreated[index].id,
                    ...variation,
                }));

            const createdVariations = await ProductVariationsModel.bulkCreate(
                productVariations,
                // { transaction, returning: true }
            );
            console.log("Product variations created:",
                createdVariations.map((v) => v.id));

            await  createdProduct.addVariations(createdVariations)
            // Use mixin to associate variations
            // await createdProduct.addVariations(
            //     createdVariations.map((v) => v.id),
            //     // transaction
            // );transaction
        }

        // Commit the transaction
        // await transaction.commit();
        console.log("Transaction committed successfully");

        return res.status(200).json({
            category: categoryCreated,
            options: optionsCreated,
            optionValues: optionsValueCreated,
            product: createdProduct,
        })
    }
    catch (err) {
        console.error("Error during transaction:", err);

        // Rollback the transaction and reset sequences
        // if (transaction) {
        //     try {
        //         await transaction.rollback();
        //
        //         // Reset sequences to 0 for tables involved in the
        // transaction await resetSequenceAfterRollback(tableSequences);
        // console.log("Transaction rolled back and sequences reset
        // successfully."); } catch (rollbackError) { console.error("Error
        // rolling back transaction:", rollbackError); } }

        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
}


async function resetDatabase(req, res) {
    const {development} = config;
    const adminConnection = new Sequelize('postgres', development.username, development.password, {
        host: development.host,
        dialect: 'postgres',
    });

    try{
        console.log('Terminating existing connections...');
        await adminConnection.query(`
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '${config.development.database}'
              AND pid <> pg_backend_pid();
        `);

        console.log('Dropping database...');
        await adminConnection.query(`DROP DATABASE IF EXISTS ${development.database};`);
        console.log('Creating database...');
        await adminConnection.query(`CREATE DATABASE ${development.database};`);
        console.log('Database dropped and created programmatically.');
        // Reconnect Sequelize to the new database
        await sequelize.sync({ force: true });
        console.log('Models synchronized.');
        console.log('Database and tables created successfully.');
        // Optional: Initialize data (if needed)
        console.log('Seeding initial data...');
        const createUserOrOrganization = await createSuperOrgHandler(req, res)
        const createdDummyProduct = await createProductWithAssociations(req, res)
        const createLead = await createDummyLead(1)

        return res
        .status(200)
        .send(
            sendResponse(
                RESPONSE_TYPE.SUCCESS,
                SUCCESS_MESSAGE.ADMIN_CREATED,
                {createUserOrOrganization}
            )
        );

    }catch(error){
        console.error('Error resetting database:', error);
    }finally {
        await adminConnection.close();
        await sequelize.close();
    }

}

async function createSuperOrgHandler(req, res){
    try {
        const payload = { ...req?.body, createdBy: 1 };
        const email = "admin1@tonguetingler.com";
        const password = "123456";

        // Check Firebase user
        const fbCheckUserRes = await checkFirebaseUser(email);
        let uid = null;
        if (fbCheckUserRes.success) {
            uid = fbCheckUserRes.uid;
        } else {
            const fbCreateUserRes = await createFirebaseUser({
                email,
                emailVerified: true,
                phoneNumber: null,
                password,
                disabled: false,
            });
            if (!fbCreateUserRes.success) {
                return res.status(400).send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        fbCreateUserRes.error ?? "Failed to create user with Firebase auth"
                    )
                );
            } else {
                uid = fbCreateUserRes.uid;
            }
        }

        if (!uid) {
            return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, "No UID"));
        }

        // Fetch or create admin user
        let admin = await new Auth().getUserByEmail(email);
        if (!admin) {
            const hashedPassword = await createPassword(password);

            const data:TUser={
                "firstName": "Tongue Tingler",
                "lastName": "Bot",
                "phoneNumber": "+910000000000",
                nameForSearch: "system",
                referBy: undefined,
                "type": USER_TYPE.ADMIN,
                email,
                "role": 0,
                password: hashedPassword,
                firebaseUid: uid,
                createdBy: 0,
                profilePhoto: "",
                status: USER_STATUS.ACTIVE,
                cart: "",
                access_token: "",
                password_token: "",
                referralCode: "",
                refresh_token: "",
                updatedBy: 0,
                deletedBy: 0,
                lastLoginAt: undefined,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined
            }
            admin = await new AdminRepo()
                .create(data)
                .then((uModel) => uModel);
        }

        // Fetch or create organization
        const repo = new OrganizationRepo();
        let superFranOrg = await repo.getByRootUser(admin.id);
        let createSampleData = false;

        if (!superFranOrg) {
            createSampleData = true;
            const TTOrgParams = {
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
        let campaignCreated = null
        if (createSampleData) {campaignCreated = await createDummyMaster(admin.id);}

        if(campaignCreated){
            console.log("campaignCreated: ", campaignCreated)
            // await createDummyLead(admin.id)
        }

        // Uncomment to send email notifications
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

        return superFranOrg
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send({
            message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
};

async function createDummyLead(userId: number){
    try{
        const leadData = createDummyLeads();
        const payload = {
            ...leadData,
            createdBy: userId
        }
        const leadCreated = await LeadRepo.prototype.create(payload, userId)
        return leadCreated
    }catch(error){
        console.error("Error:", error);
    }
}


export default router;
