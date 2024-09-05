import { Router } from "express";

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

// ====== Admin ======
// ====== Admin imports ======
import franchiseRouter from "../apps/admin-user/api/franchise";
import rolesRouter from "../apps/admin-user/api/roles";
import permissionsRouter from "../apps/admin-user/api/permissions";
import adminUsersRouter from "../apps/admin-user/api/user";
import testUsersRouter from "../apps/test-user/api/user"; // for testing only
import productRouter from "../apps/ecommerce/api/products";
import productCategoryRouter from "../apps/ecommerce/api/category";
import orderRouter from "../apps/ecommerce/api/orders"; // pending
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
import menuRouter from "../apps/menu/api/menu"; // pending

// ====== Admin routes ======
router.use(`${ADMIN}/test-user`, testUsersRouter); // for testing only
router.use(`${ADMIN}/users`, auth, adminUsersRouter);
router.use(`${ADMIN}/permissions`, auth, permissionsRouter);
router.use(`${ADMIN}/roles`, auth, rolesRouter);
router.use(`${ADMIN}/franchise`, auth, franchiseRouter);
router.use(`${ADMIN}/testimonials`, auth, testimonialsRouter);
router.use(`${ADMIN}/reviews`, auth, reviewsRouter);
router.use(`${ADMIN}/profile`, auth, profileRouter);
router.use(`${ADMIN}/settings`, auth, settingsRouter); // pending
router.use(`${ADMIN}/payments`, auth, paymentsRouter); // pending
router.use(`${ADMIN}/analytics/leads`, leadsAnalyticsRouter); // pending
router.use(`${ADMIN}/analytics/orders`, ordersAnalyticsRouter); // pending
router.use(`${ADMIN}/analytics/retort-supply`, auth, retortAnalyticsRouter); // pending
router.use(`${ADMIN}/menu`, auth, menuRouter); // pending
router.use(`${ADMIN}/product`, auth, productRouter);
router.use(`${ADMIN}/product/category`, auth, productCategoryRouter);
router.use(`${ADMIN}/order`, auth, orderRouter); // pending
router.use(`${ADMIN}/product/tag`, auth, productTagRouter);
router.use(`${ADMIN}/lead`, auth, leadRouter);
router.use(`${ADMIN}/followup`, auth, followUpsRouter);
// ====== Admin ======

// ====== Franchise ======
// ====== Franchise imports ======
import franchiseReviewsRouter from "../apps/reviews/api/franchise-reviews";
import franchiseProfileRouter from "../apps/franchise-user/api/profile";
import franchiseSettingsRouter from "../apps/franchise-user/api/settings"; // pending
import franchiseOrderAnalyticsRouter from "../apps/analytics/api/franchise/orders-analytics"; // pending
import franchiseRetortAnalyticsRouter from "../apps/analytics/api/franchise/retort-analytics"; // pending
import franchiseOrderRouter from "../apps/ecommerce/api/franchise/orders"; // pending
import franchiseTestimonialsRouter from "../apps/testimonials/api/franchise-testimonials";

// ====== Franchise routes ======
// router.use(`${FRANCHISE}/invoice`, auth, productRouter); // pending
router.use(`${FRANCHISE}/reviews`, auth, franchiseReviewsRouter);
router.use(`${FRANCHISE}/profile`, auth, franchiseProfileRouter);
router.use(`${FRANCHISE}/settings`, auth, franchiseSettingsRouter); // pending
router.use(`${FRANCHISE}/order`, auth, franchiseOrderRouter); // pending
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

// ====== Frontend routes ======
// router.use(`/menu`, webMenuRouter); // pending
router.use(`/lead`, webLeadRouter);
router.use(`/reviews`, webReviewsRouter);
router.use(`/testimonials`, webTestimonialsRouter);
router.use(`/product`, webProductsRouter);
// ====== Frontend ======

export default router;
