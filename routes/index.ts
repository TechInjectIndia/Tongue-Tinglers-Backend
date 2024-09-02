import { Router } from "express";
const router = Router();

const ADMIN = '/admin';
const FRANCHISE = '/franchise';
const CUSTOMER = '/customer';
const FRONTEND = '/';



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
import orderRouter from "../apps/ecommerce/api/orders";
import productTagRouter from "../apps/ecommerce/api/tags";
import leadRouter from "../apps/lead/api/lead";
import followUpsRouter from "../apps/lead/api/followups";
import profileRouter from "../apps/admin-user/api/profile";
import settingsRouter from "../apps/admin-user/api/settings";
import paymentsRouter from "../apps/payments/api";
import reviewsRouter from "../apps/reviews/api/reviews";
import testimonialsRouter from "../apps/testimonials/api/testimonials";
import leadsAnalyticsRouter from "../apps/analytics/api/admin/lead-analytics";
import ordersAnalyticsRouter from "../apps/analytics/api/admin/orders-analytics";
import retortAnalyticsRouter from "../apps/analytics/api/admin/retort-analytics";
import menuRouter from "../apps/menu/api/menu";

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
router.use(`${ADMIN}/analytics/leads`, leadsAnalyticsRouter);
router.use(`${ADMIN}/analytics/orders`, ordersAnalyticsRouter);
router.use(`${ADMIN}/analytics/retort-supply`, auth, retortAnalyticsRouter); // pending
router.use(`${ADMIN}/menu`, auth, menuRouter); // pending
router.use(`${ADMIN}/product`, auth, productRouter);
router.use(`${ADMIN}/product/category`, auth, productCategoryRouter);
router.use(`${ADMIN}/product/order`, auth, orderRouter);
router.use(`${ADMIN}/product/tag`, auth, productTagRouter);
router.use(`${ADMIN}/lead`, auth, leadRouter);
router.use(`${ADMIN}/followup`, auth, followUpsRouter);
// ====== Admin ======

// ====== Franchise ======
// ====== Franchise imports ======
import franchiseProfileRouter from "../apps/franchise-user/api/profile";
import franchiseSettingsRouter from "../apps/franchise-user/api/settings";
import orderFranchiseAnalyticsRouter from "../apps/analytics/api/franchise/orders-analytics";
import retortFranchiseAnalyticsRouter from "../apps/analytics/api/franchise/retort-analytics";
import orderFranchiseRouter from "../apps/ecommerce/api/franchise/orders";

// ====== Franchise routes ======
router.use(`${FRANCHISE}/profile`, auth, franchiseProfileRouter); // pending
router.use(`${FRANCHISE}/settings`, auth, franchiseSettingsRouter); // pending
router.use(`${FRANCHISE}/order`, auth, orderFranchiseRouter);
// router.use(`${FRANCHISE}/invoice`, auth, productRouter); // pending
router.use(`${FRANCHISE}/analytics/orders`, auth, orderFranchiseAnalyticsRouter); // pending
router.use(`${FRANCHISE}/analytics/retort`, auth, retortFranchiseAnalyticsRouter); // pending
// ====== Franchise ======

// ====== Customer ======
// ====== Customer imports ======
import customerProfileRouter from "../apps/customer-user/api/profile";
import customerSettingsRouter from "../apps/customer-user/api/settings";
import orderCustomerAnalyticsRouter from "../apps/analytics/api/customer/orders-analytics";
// import orderCustomerRouter from "../apps/ecommerce/api/customer/orders";

// ====== Customer routes ======
router.use(`${CUSTOMER}/profile`, auth, customerProfileRouter); // pending
router.use(`${CUSTOMER}/settings`, auth, customerSettingsRouter); // pending
// router.use(`${CUSTOMER}/order`, orderCustomerRouter);
router.use(`${CUSTOMER}/analytics/orders`, auth, orderCustomerAnalyticsRouter); // pending
// ====== Customer ======

// ====== Frontend ======
// ====== Frontend imports ======
import webLeadRouter from "../apps/lead/api/web-lead";
import webTestimonialsRouter from "../apps/testimonials/api/web-testimonials";
import webReviewsRouter from "../apps/reviews/api/web-reviews";
import webProductsRouter from "../apps/ecommerce/api/web/products";

// ====== Frontend routes ======
router.use(`${FRONTEND}lead`, webLeadRouter);
// router.use(`${FRONTEND}food-menu`, webLeadRouter);
router.use(`${FRONTEND}reviews`, webReviewsRouter); // Check if it is customer validation pending
router.use(`${FRONTEND}testimonials`, webTestimonialsRouter);
router.use(`${FRONTEND}product`, webProductsRouter);
// ====== Frontend ======

export default router;
