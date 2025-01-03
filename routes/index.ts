import { Router } from "express";
import { Request, Response } from "express";
import { logRouter } from "../apps/logs/api/logrouter";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
import { sendEmail } from "../libraries";

const router = Router();

const ADMIN = "/admin";
const FRANCHISE = "/franchise";
const CUSTOMER = "/customer";
const GUEST = "/guest";
const ORDERS = '/v1/orders';

import { auth } from "../middlewares/auth";
import authRouter from "../apps/auth/api";

router.use(`/auth`, authRouter);


import adminUsersRouter from "../apps/user/api/user";

import leadRouter from "../apps/lead/api/lead-router";
import webLeadRouter from "../apps/lead/api/web-lead";

import followUpsRouter from "../apps/lead/api/followups";
import profileRouter from "../apps/user/api/profile";
import settingsRouter from "../apps/user/api/settings";
import paymentsRouter from "../apps/payments/api";






// import retortProductRouter from "../apps/retort/api/products";
// import retortProductCategoryRouter from "../apps/retort/api/category";
// import retortOrderRouter from "../apps/retort/api/orders";
// import campaignRouter from "../apps/crm/api/campaign";
import testUsersRouter from "../apps/test-user/api/user";
import contractsRouter from "../apps/contracts/api";
import questionRouter from "../apps/questions/api";
import campaignAdRouter from "../apps/campaign/api";

import filesRouter from "../apps/files/api/files";
// import galleryRouter from "../apps/gallery/api/gallery";

import pdiChecklistRouter from "../apps/pdi-checklist/api/pdiChecklist";
import IChecklistRouter from "../apps/ichecklist/api/iChecklist";
import pdiCheckPointRouter from "../apps/pdi-checkpoint/api/pdiCheckpoint";

import PdiRouter from "../apps/pdi/api/pdiApi";
import quickActionEmailRouter from "../apps/quick-actions/api/email";
import quickActionWhatsappRouter from "../apps/quick-actions/api/whatsapp";
import regionRouter from "../apps/region/api/index";
import areaRouter from "../apps/area/api/index";


// import vendorRouter from "../apps/vendor/api/vendorApi";
import frachiseRouter from "../apps/franchise/api/franchise";
import { commissionRouter } from "../apps/commission/api/CommissionApi";
import migrationRouter from "../migrations/routes/migrateRoute";
import OrderV1Routes from '../apps/checkout/api/checkoutApi'

/* organization router */
import organizationRouter from "../apps/organization/api/index";
import productRouter from "../apps/product/api/productApi";
import optionsRouter from "../apps/options/api/optionsApi";
import optionsValuesRouter from "../apps/optionsValue/api/optionsValueApi";
import productOptionsRouter
    from "../apps/product-options/api/productOptionsApi";
import cartProductRouter from "../apps/cart-products/api/cartProductApi";
import cartDetailRouter from "../apps/cart-details/api/cartDetailApi";
import orderItemRouter from "../apps/order-items/api/orderItemApi";
import productsCategoryRouter
    from "../apps/products-category/api/productsCategoryApi";
// import OrderRouter from "../apps/order/api/orderApi";
import documentRouter from "../apps/documents/api/documentApi";
import agreementDocRouter from "../apps/agreement-docs/api/agreementDocApi"
// import petPoojaApiRouter from "../apps/pet-pooja/api/petpooja";
import zohoSignApiRouter from "../apps/zoho-sign/api/zohosign";
import {
    transactionRouter,
} from "../apps/payment-transaction/api/TransactionRouter";

import leadsAnalyticsRouter from "../apps/analytics/api/admin/lead-analytics"



// ====== Admin routes ======
router.use(`${ADMIN}/users`, auth, adminUsersRouter);
// router.use(`${ADMIN}/permissions`, auth, permissionsRouter);
// router.use(`${ADMIN}/roles`, auth, rolesRouter);


router.use(`${ADMIN}/profile`, auth, profileRouter);
router.use(`${ADMIN}/settings`, auth, settingsRouter); // pending
router.use(`/payments`, paymentsRouter); // dont add auth to this url

router.use(`${ADMIN}/analytics/leads`, auth, leadsAnalyticsRouter);
// router.use(`${ADMIN}/analytics/orders`, auth, ordersAnalyticsRouter);
// router.use(`${ADMIN}/analytics/retort-supply`, auth, retortAnalyticsRouter);
// router.use(`${ADMIN}/menu`, auth, menuRouter);

router.use(`${ADMIN}/followup`, auth, followUpsRouter);
// router.use(`${ADMIN}/retort/product`, auth, retortProductRouter);
// router.use(`${ADMIN}/retort/category`, auth, retortProductCategoryRouter);
// router.use(`${ADMIN}/retort/order`, auth, retortOrderRouter);
// router.use(`${ADMIN}/crm`, auth, campaignRouter);
router.use(`${ADMIN}/test-user`, testUsersRouter); // for testing only
router.use(`${ADMIN}/question`, auth, questionRouter);
router.use(`${ADMIN}/campaign-ad`,auth , campaignAdRouter);

router.use(`/campaign-ad`, campaignAdRouter);

// router.use(`${ADMIN}/campaign-submissions`, auth, campaignSubmissionsRouter);
router.use(`${ADMIN}/files`, auth, filesRouter);
// router.use(`${ADMIN}/gallery`, auth, galleryRouter);
router.use(`${ADMIN}/pdi-checklist`, auth, pdiChecklistRouter);
router.use(`${ADMIN}/checkpoint`, auth, pdiCheckPointRouter);
router.use(`${ADMIN}/checklist`, auth, IChecklistRouter);
router.use(`${ADMIN}/pdi`, auth, PdiRouter);
router.use(`${ADMIN}/quick-actions/email`, auth, quickActionEmailRouter);
router.use(`${ADMIN}/quick-actions/whatsapp`, auth, quickActionWhatsappRouter);
router.use(`${ADMIN}/region`, auth, regionRouter);
router.use(`${ADMIN}/area`, auth, areaRouter);
router.use(`${ADMIN}/contracts`, auth, contractsRouter);// dont add auth to this url
router.use(`${ADMIN}/open-contracts`, contractsRouter);// dont add auth to this url
router.use(`${ADMIN}/lead`, auth, leadRouter);
router.use(`${ADMIN}/web-lead`, webLeadRouter); // dont add auth to this url
// router.use(`${ADMIN}/vendors`, auth, vendorRouter);
// router.use(`${ADMIN}/shipping-history`, auth, shippingHistory);
router.use(`${ADMIN}/franchise`, auth, frachiseRouter);
router.use(`${ADMIN}/commission`, auth, commissionRouter);
router.use(`${ADMIN}/product`, auth, productRouter);
router.use(`${ADMIN}/options`, auth, optionsRouter);
router.use(`${ADMIN}/options-values`, auth, optionsValuesRouter);
router.use(`${ADMIN}/product-options`, auth, productOptionsRouter);
router.use(`${ADMIN}/products-category`, auth, productsCategoryRouter);
router.use("/cart-detail", auth, cartDetailRouter);
router.use("/order-items", auth, orderItemRouter);
// router.use("/order", auth, OrderRouter);
router.use(ORDERS, auth, OrderV1Routes);
router.use(`/cart`, auth, cartProductRouter);
router.use("/migration", migrationRouter);
router.use("/document", auth, documentRouter);
router.use(`${ADMIN}/agreement-docs`, agreementDocRouter);
// router.use(`/pet-pooja`, petPoojaApiRouter);
router.use(`/organization`,auth, organizationRouter);


router.post(
    `/upload-file`,
    upload.single("file"),
    async (req: Request, res: Response) => {
        // await uploadSingleFileToFirebase(req);
        // res.send('done');
    },
);


router.use(`/zoho-sign`, zohoSignApiRouter);
router.use("/logs", logRouter);
router.use("/transaction", transactionRouter);

router.use(`/etest`, () => {
    sendEmail("jasskaranofficial@gmail.com", "subject", {
        heading: "asd",
        description: "qwe",
    });
});

router.use(`/health`, (_, res) => {
    return res.status(200).json({
        success: true,
        message: "CICD Done Once AGAIN !",
    });
});

router.use(`/petpoojaLogin`, async (_, res) => {
    const result = await fetch(" https://developerapi.petpooja.com").then((r) =>
        r.text(),
    );
    res.setHeader("Content-Type", "text/html");
    res.send(result);
});

export default router;
