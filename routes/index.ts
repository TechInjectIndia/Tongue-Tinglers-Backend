import { Router } from "express";
import { Request, Response } from "express";
import { logRouter } from "../apps/logs/api/logrouter";

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
import { sendEmail } from "../libraries";

const router = Router();

const ADMIN = "/admin";
const FRANCHISE = "/franchise";
const CUSTOMER = "/customer";
const GUEST = "/guest";

// ====== Auth ======
import { auth } from "../middlewares/auth";
import authRouter from "../apps/auth/api";

router.use(`/auth`, authRouter);
// ====== Auth ======

import referralRouter from "../apps/referral/api";

router.use("/referral", referralRouter);

// ====== Admin imports ======
import rolesRouter from "../apps/admin-user/api/roles";
import permissionsRouter from "../apps/admin-user/api/permissions";
import adminUsersRouter from "../apps/admin-user/api/user";
// import guestUsersRouter from "../apps/guest-user/api/guest-user";
// import customerUsersRouter from "../apps/admin-user/api/customer";
// import productRouter from "../apps/ecommerce/api/products";
import taxesRouter from "../apps/ecommerce/api/taxes";
import productCategoryRouter from "../apps/ecommerce/api/category";
import orderRouter from "../apps/ecommerce/api/orders";
import productTagRouter from "../apps/ecommerce/api/tags";
import leadRouter from "../apps/lead/api/lead";
import followUpsRouter from "../apps/lead/api/followups";
import profileRouter from "../apps/admin-user/api/profile";
import settingsRouter from "../apps/admin-user/api/settings"; // pending
import paymentsRouter from "../apps/payments/api";
import paymentsOrdersRouter from "../apps/payments/api/orderPayment";
import reviewsRouter from "../apps/reviews/api/reviews";
import testimonialsRouter from "../apps/testimonials/api/testimonials";
import leadsAnalyticsRouter from "../apps/analytics/api/admin/lead-analytics";
import ordersAnalyticsRouter from "../apps/analytics/api/admin/orders-analytics";
import retortAnalyticsRouter from "../apps/analytics/api/admin/retort-analytics";
import menuRouter from "../apps/menu/api/menu";
import retortProductRouter from "../apps/retort/api/products";
import retortProductCategoryRouter from "../apps/retort/api/category";
import retortOrderRouter from "../apps/retort/api/orders";
import campaignRouter from "../apps/crm/api/campaign";
import testUsersRouter from "../apps/test-user/api/user"; // for testing only
import contractsRouter from "../apps/contracts/api";
import questionRouter from "../apps/questions/api";
import campaignAdRouter from "../apps/campaign/api";
import campaignSubmissionsRouter from "../apps/campaign/api/campaignSubmissionsApi";
import filesRouter from "../apps/files/api/files";
import galleryRouter from "../apps/gallery/api/gallery";
import pdiChecklistRouter from "../apps/pdi-checklist/api/pdiChecklist";
import IChecklistRouter from "../apps/ichecklist/api/iChecklist";
import pdiCheckoutRouter from "../apps/pdi-checkpoint/api/pdiCheckpoint";
import PdiRouter from "../apps/pdi/api/pdiApi";
import quickActionEmailRouter from "../apps/quick-actions/api/email";
import quickActionWhatsappRouter from "../apps/quick-actions/api/whatsapp";
import regionRouter from "../apps/region/api/index";
import areaRouter from "../apps/area/api/index";
import cartRouter from "../apps/cart/api/cartApi";
import shippingHistory from "../apps/ecommerce/api/shippingHistoryApi";

import vendorRouter from "../apps/vendor/api/vendorApi";
import frachiseRouter from "../apps/franchise/api/franchise";
import { commissionRouter } from "../apps/commission/api/CommissionApi";

/* Migration Router */
import migrationRouter from "../migrations/routes/migrateRoute";

/* organization router */
import organizationRouter from "../apps/organization/api/index";

import productRouter from "../apps/product/api/productApi";
import optionsRouter from "../apps/options/api/optionsApi";
import optionsValuesRouter from "../apps/optionsValue/api/optionsValueApi";
import productOptionsRouter from "../apps/product-options/api/productOptionsApi";
import cartProductRouter from "../apps/cart-products/api/cartProductApi";
import cartDetailRouter from "../apps/cart-details/api/cartDetailApi";
import orderItemRouter from "../apps/order-items/api/orderItemApi";
import productsCategoryRouter from "../apps/products-category/api/productsCategoryApi";
import OrderRouter from "../apps/order/api/orderApi";

// ====== Admin routes ======
router.use(`${ADMIN}/users`, auth, adminUsersRouter);
// router.use(`${ADMIN}/customer`, auth, customerUsersRouter);
router.use(`${ADMIN}/permissions`, auth, permissionsRouter);
router.use(`${ADMIN}/roles`, auth, rolesRouter);
router.use(`${ADMIN}/testimonials`, auth, testimonialsRouter);
router.use(`${ADMIN}/reviews`, auth, reviewsRouter);
router.use(`${ADMIN}/profile`, auth, profileRouter);
router.use(`${ADMIN}/settings`, auth, settingsRouter); // pending
router.use(`/payments`, paymentsRouter); // dont add auth to this url
router.use(`/order-payment`, paymentsOrdersRouter); // dont add auth to this url
router.use(`${ADMIN}/analytics/leads`, auth, leadsAnalyticsRouter);
router.use(`${ADMIN}/analytics/orders`, auth, ordersAnalyticsRouter);
router.use(`${ADMIN}/analytics/retort-supply`, auth, retortAnalyticsRouter);
router.use(`${ADMIN}/menu`, auth, menuRouter);
// router.use(`${ADMIN}/ecommerce/product`, auth, productRouter);
router.use(`${ADMIN}/tax`, auth, taxesRouter);
router.use(`${ADMIN}/product/category`, auth, productCategoryRouter);
// router.use(`${ADMIN}/order`, auth, orderRouter);
router.use(`${ADMIN}/product/tag`, auth, productTagRouter);
router.use(`${ADMIN}/followup`, auth, followUpsRouter);
router.use(`${ADMIN}/retort/product`, auth, retortProductRouter);
router.use(`${ADMIN}/retort/category`, auth, retortProductCategoryRouter);
router.use(`${ADMIN}/retort/order`, auth, retortOrderRouter);
router.use(`${ADMIN}/crm`, auth, campaignRouter);
router.use(`${ADMIN}/test-user`, testUsersRouter); // for testing only
router.use(`${ADMIN}/question`, auth, questionRouter);
router.use(`${ADMIN}/campaign-ad`, auth, campaignAdRouter);
router.use(`${ADMIN}/campaign-submissions`, auth, campaignSubmissionsRouter);
router.use(`${ADMIN}/files`, auth, filesRouter);
router.use(`${ADMIN}/gallery`, auth, galleryRouter);
router.use(`${ADMIN}/pdi-checklist`, auth, pdiChecklistRouter);
router.use(`${ADMIN}/checkpoint`, auth, pdiCheckoutRouter);
router.use(`${ADMIN}/checklist`, auth, IChecklistRouter);
router.use(`${ADMIN}/pdi`, auth, PdiRouter);
router.use(`${ADMIN}/quick-actions/email`, auth, quickActionEmailRouter);
router.use(`${ADMIN}/quick-actions/whatsapp`, auth, quickActionWhatsappRouter);
router.use(`${ADMIN}/region`, regionRouter);
router.use(`${ADMIN}/area`, areaRouter);
router.use(`${ADMIN}/contracts`, contractsRouter);
router.use(`${ADMIN}/lead`, leadRouter); // dont add auth to this url
router.use(`${ADMIN}/vendors`, auth, vendorRouter);
router.use(`${ADMIN}/shipping-history`, auth, shippingHistory);
router.use(`${ADMIN}/franchise`, auth, frachiseRouter);
router.use(`${ADMIN}/commission`, auth, commissionRouter);
router.use(`${ADMIN}/product`, auth, productRouter);
router.use(`${ADMIN}/options`, auth, optionsRouter);
router.use(`${ADMIN}/options-values`, optionsValuesRouter);
router.use(`${ADMIN}/product-options`, auth, productOptionsRouter);
router.use(`${ADMIN}/products-category`, auth, productsCategoryRouter);
router.use("/cart-product", auth, cartProductRouter);
router.use("/cart-detail", auth, cartDetailRouter);
router.use("/order-items", auth, orderItemRouter);
router.use("/order", OrderRouter);
router.use(`/cart`, auth, cartRouter);
router.use("/migration", migrationRouter);

// router.use(`${GUEST}/users`, auth, guestUsersRouter);

// ====== Franchise imports ======
import franchiseOrderAnalyticsRouter from "../apps/analytics/api/franchise/orders-analytics"; // pending
import franchiseRetortAnalyticsRouter from "../apps/analytics/api/franchise/retort-analytics"; // pending
import franchiseOrderRouter from "../apps/ecommerce/api/franchise/orders";
import franchiseRetortOrderRouter from "../apps/retort/api/franchise/orders";
import franchiseTestimonialsRouter from "../apps/testimonials/api/franchise-testimonials";

router.use(`${FRANCHISE}/order`, auth, franchiseOrderRouter);
router.use(`/retort/order`, auth, franchiseRetortOrderRouter);
router.use(
  `${FRANCHISE}/analytics/orders`,
  auth,
  franchiseOrderAnalyticsRouter
); // pending
router.use(
  `${FRANCHISE}/analytics/retort`,
  auth,
  franchiseRetortAnalyticsRouter
); // pending
router.use(`${FRANCHISE}/testimonials`, auth, franchiseTestimonialsRouter);

// ====== Customer imports ======
import customerReviewsRouter from "../apps/reviews/api/customer-reviews";
import customerProfileRouter from "../apps/customer-user/api/profile";
import customerSettingsRouter from "../apps/customer-user/api/settings"; // pending
import orderCustomerAnalyticsRouter from "../apps/analytics/api/customer/orders-analytics";
import customerTestimonialsRouter from "../apps/testimonials/api/customer-testimonials";
// ====== Customer routes ======
// router.use(`${CUSTOMER}/order`, orderCustomerRouter);
router.use(`${CUSTOMER}/reviews`, auth, customerReviewsRouter);
router.use(`${CUSTOMER}/profile`, auth, customerProfileRouter);
router.use(`${CUSTOMER}/settings`, auth, customerSettingsRouter); // pending
router.use(`${CUSTOMER}/analytics/orders`, auth, orderCustomerAnalyticsRouter); // pending
router.use(`${CUSTOMER}/testimonials`, auth, customerTestimonialsRouter);

// ====== Frontend imports ======
import webLeadRouter from "../apps/lead/api/web-lead";
import webTestimonialsRouter from "../apps/testimonials/api/web-testimonials";
import webReviewsRouter from "../apps/reviews/api/web-reviews";
import webProductsRouter from "../apps/ecommerce/api/web/products";
import webRegisterRouter from "../apps/admin-user/api/customer-register";
import webCampaignRouter from "../apps/campaign/api/web";

// ====== Frontend routes ======
// router.use(`/menu`, webMenuRouter); // pending
router.use(`/lead`, webLeadRouter);
router.use(`/reviews`, webReviewsRouter);
router.use(`/testimonials`, webTestimonialsRouter);
router.use(`/product`, webProductsRouter);
router.use(`/register`, webRegisterRouter);
router.use(`/campaign-ad`, webCampaignRouter);
/* organization router */
router.use(`/organization`, auth, organizationRouter);

// ====== Frontend ======

router.post(
  `/upload-file`,
  upload.single("file"),
  async (req: Request, res: Response) => {
    // await uploadSingleFileToFirebase(req);
    // res.send('done');
  }
);

// ====== Pet Pooja ======
import petPoojaApiRouter from "../apps/pet-pooja/api/petpooja";

router.use(`/pet-pooja`, petPoojaApiRouter);
// ====== Pet Pooja ======

// ====== Zoho Sign ======
import zohoSignApiRouter from "../apps/zoho-sign/api/zohosign";
import { transactionRouter } from "../apps/payment-transaction/api/TransactionRouter";

router.use(`/zoho-sign`, zohoSignApiRouter);
// ====== Zoho Sign ======

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
    r.text()
  );
  res.setHeader("Content-Type", "text/html");
  res.send(result);
});

export default router;
