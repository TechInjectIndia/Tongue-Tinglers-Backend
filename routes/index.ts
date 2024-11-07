import { Router } from "express";
import { Request, Response } from "express";
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
import { sendEmail } from "../libraries";

const router = Router();

const ADMIN = '/admin';
const FRANCHISE = '/franchise';
const CUSTOMER = '/customer';

// ====== Auth ======
import { auth } from '../middlewares/auth';
import authRouter from "../apps/auth/api";
router.use(`/auth`, authRouter);
// ====== Auth ======

import addressRouter from "../apps/address/api";
router.use('/user/address', auth, addressRouter);

import referralRouter from "../apps/referral/api";
router.use('/referral', referralRouter);

// ====== Admin ======
// ====== Admin imports ======
import franchiseRouter from "../apps/admin-user/api/franchise";
import rolesRouter from "../apps/admin-user/api/roles";
import permissionsRouter from "../apps/admin-user/api/permissions";
import adminUsersRouter from "../apps/admin-user/api/user";
import customerUsersRouter from "../apps/admin-user/api/customer";
import productRouter from "../apps/ecommerce/api/products";
import taxesRouter from "../apps/ecommerce/api/taxes";
import productCategoryRouter from "../apps/ecommerce/api/category";
import orderRouter from "../apps/ecommerce/api/orders";
import productTagRouter from "../apps/ecommerce/api/tags";
import leadRouter from "../apps/lead/api/lead";
import followUpsRouter from "../apps/lead/api/followups";
import profileRouter from "../apps/admin-user/api/profile";
import settingsRouter from "../apps/admin-user/api/settings"; // pending
import paymentsRouter from "../apps/payments/api"; // pending
import reviewsRouter from "../apps/reviews/api/reviews";
import testimonialsRouter from "../apps/testimonials/api/testimonials";
import leadsAnalyticsRouter from "../apps/analytics/api/admin/lead-analytics"; // pending
import ordersAnalyticsRouter from "../apps/analytics/api/admin/orders-analytics"; // pending
import retortAnalyticsRouter from "../apps/analytics/api/admin/retort-analytics"; // pending
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
import franchiseeRouter from "../apps/franchisee/api/franchisee";
import pdiChecklistRouter from "../apps/pdi-checklist/api/pdiChecklist";
import quickActionEmailRouter from "../apps/quick-actions/api/email";
import quickActionWhatsappRouter from "../apps/quick-actions/api/whatsapp";
import regionRouter from "../apps/region/api/index";
import vendorRouter from "../apps/vendor/api/vendorApi";
import cartRouter from "../apps/cart/api/cartApi";

// ====== Admin routes ======
router.use(`${ADMIN}/users`, auth, adminUsersRouter);
router.use(`${ADMIN}/customer`, auth, customerUsersRouter);
router.use(`${ADMIN}/permissions`, auth, permissionsRouter);
router.use(`${ADMIN}/roles`, auth, rolesRouter);
router.use(`${ADMIN}/franchise`, auth, franchiseRouter);
router.use(`${ADMIN}/testimonials`, auth, testimonialsRouter);
router.use(`${ADMIN}/reviews`, auth, reviewsRouter);
router.use(`${ADMIN}/profile`, auth, profileRouter);
router.use(`${ADMIN}/settings`, auth, settingsRouter); // pending
router.use(`/payments`, paymentsRouter); // pending
router.use(`${ADMIN}/analytics/leads`, auth, leadsAnalyticsRouter); // pending
router.use(`${ADMIN}/analytics/orders`, auth, ordersAnalyticsRouter); // pending
router.use(`${ADMIN}/analytics/retort-supply`, auth, retortAnalyticsRouter); // pending
router.use(`${ADMIN}/menu`, auth, menuRouter);
router.use(`${ADMIN}/product`, auth, productRouter);
router.use(`${ADMIN}/tax`, auth, taxesRouter);
router.use(`${ADMIN}/product/category`, auth, productCategoryRouter);
router.use(`${ADMIN}/order`, auth, orderRouter);
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
router.use(`${ADMIN}/quick-actions/email`, auth, quickActionEmailRouter);
router.use(`${ADMIN}/quick-actions/whatsapp`, auth, quickActionWhatsappRouter);
router.use(`${ADMIN}/region`, auth, regionRouter);
router.use(`${ADMIN}/contracts`, auth, contractsRouter);
router.use(`${ADMIN}/franchisee`, auth, franchiseeRouter);
router.use(`${ADMIN}/lead`, leadRouter); // dont add auth to this url
router.use(`${ADMIN}/vendors`, auth, vendorRouter);
router.use(`/cart`, cartRouter);
// ====== Admin ======

// ====== Franchise ======
// ====== Franchise imports ======
import franchiseReviewsRouter from "../apps/reviews/api/franchise-reviews";
import franchiseProfileRouter from "../apps/franchise-user/api/profile";
import franchiseSettingsRouter from "../apps/franchise-user/api/settings"; // pending
import franchiseOrderAnalyticsRouter from "../apps/analytics/api/franchise/orders-analytics"; // pending
import franchiseRetortAnalyticsRouter from "../apps/analytics/api/franchise/retort-analytics"; // pending
import franchiseOrderRouter from "../apps/ecommerce/api/franchise/orders";
import franchiseRetortOrderRouter from "../apps/retort/api/franchise/orders";
import franchiseTestimonialsRouter from "../apps/testimonials/api/franchise-testimonials";

// ====== Franchise routes ======
// router.use(`${FRANCHISE}/invoice`, auth, productRouter); // pending
router.use(`${FRANCHISE}/reviews`, auth, franchiseReviewsRouter);
router.use(`${FRANCHISE}/profile`, auth, franchiseProfileRouter);
router.use(`${FRANCHISE}/settings`, auth, franchiseSettingsRouter); // pending
router.use(`${FRANCHISE}/order`, auth, franchiseOrderRouter);
router.use(`/retort/order`, auth, franchiseRetortOrderRouter);
router.use(`${FRANCHISE}/analytics/orders`, auth, franchiseOrderAnalyticsRouter); // pending
router.use(`${FRANCHISE}/analytics/retort`, auth, franchiseRetortAnalyticsRouter); // pending
router.use(`${FRANCHISE}/testimonials`, auth, franchiseTestimonialsRouter);

// ====== Franchise ======

// ====== Customer ======
// ====== Customer imports ======
import customerReviewsRouter from "../apps/reviews/api/customer-reviews";
import customerProfileRouter from "../apps/customer-user/api/profile";
import customerSettingsRouter from "../apps/customer-user/api/settings"; // pending
import orderCustomerAnalyticsRouter from "../apps/analytics/api/customer/orders-analytics";
import customerTestimonialsRouter from "../apps/testimonials/api/customer-testimonials";
// import orderCustomerRouter from "../apps/ecommerce/api/customer/orders";

// ====== Customer routes ======
// router.use(`${CUSTOMER}/order`, orderCustomerRouter);
router.use(`${CUSTOMER}/reviews`, auth, customerReviewsRouter);
router.use(`${CUSTOMER}/profile`, auth, customerProfileRouter);
router.use(`${CUSTOMER}/settings`, auth, customerSettingsRouter); // pending
router.use(`${CUSTOMER}/analytics/orders`, auth, orderCustomerAnalyticsRouter); // pending
router.use(`${CUSTOMER}/testimonials`, auth, customerTestimonialsRouter);
// ====== Customer ======

// ====== Frontend ======
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

// ====== Frontend ======

// router.use(`/test-payment-link`, () => {
//     createStandardPaymentLink();
// });

router.post(`/upload-file`, upload.single('file'), async (req: Request, res: Response) => {
    // await uploadSingleFileToFirebase(req);
    // res.send('done');
});

// ====== Pet Pooja ======
import petPoojaApiRouter from "../apps/pet-pooja/api/petpooja";
router.use(`/pet-pooja`, petPoojaApiRouter);
// ====== Pet Pooja ======

// ====== Zoho Sign ======
import zohoSignApiRouter from "../apps/zoho-sign/api/zohosign";
router.use(`/zoho-sign`, zohoSignApiRouter);
// ====== Zoho Sign ======

router.use(`/etest`, () => {
    sendEmail('jasskaranofficial@gmail.com', 'subject', { heading: 'asd', description: 'qwe' });
});

export default router;
