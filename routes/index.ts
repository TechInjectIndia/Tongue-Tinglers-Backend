import { Router } from "express";
const router = Router();

const ADMIN = '/admin';
const FRANCHISE = '/franchise';
const FRONTEND = '/';

// ====== Admin app imports ======
import { adminAuth } from '../middlewares/auth';
import adminAuthRouter from "../apps/admin-auth/api";
import franchiseRouter from "../apps/admin-user/api/franchise";
import rolesRouter from "../apps/admin-user/api/roles";
import permissionsRouter from "../apps/admin-user/api/permissions";
import adminUsersRouter from "../apps/admin-user/api/user";
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
import leadsAnalyticsRouter from "../apps/analytics/api/lead-analytics";
import ordersAnalyticsRouter from "../apps/analytics/api/orders-analytics";
import retortAnalyticsRouter from "../apps/analytics/api/retort-analytics";
import menuRouter from "../apps/menu/api/menu";
// ====== Admin app imports ======

// ====== Admin routes ======
router.use(`${ADMIN}/auth`, adminAuthRouter);
router.use(`${ADMIN}/users`, adminAuth, adminUsersRouter);
router.use(`${ADMIN}/permissions`, adminAuth, permissionsRouter);
router.use(`${ADMIN}/roles`, adminAuth, rolesRouter);
router.use(`${ADMIN}/franchise`, adminAuth, franchiseRouter);
router.use(`${ADMIN}/testimonials`, adminAuth, testimonialsRouter);
router.use(`${ADMIN}/reviews`, adminAuth, reviewsRouter);
router.use(`${ADMIN}/profile`, adminAuth, profileRouter);
router.use(`${ADMIN}/settings`, adminAuth, settingsRouter); // pending
router.use(`${ADMIN}/payments`, adminAuth, paymentsRouter); // pending
router.use(`${ADMIN}/analytics/leads`, adminAuth, leadsAnalyticsRouter); // pending
router.use(`${ADMIN}/analytics/orders`, adminAuth, ordersAnalyticsRouter); // pending
router.use(`${ADMIN}/analytics/retort-supply`, adminAuth, retortAnalyticsRouter); // pending
router.use(`${ADMIN}/menu`, adminAuth, menuRouter); // pending
router.use(`${ADMIN}/product`, adminAuth, productRouter);
router.use(`${ADMIN}/product/category`, adminAuth, productCategoryRouter);
router.use(`${ADMIN}/product/order`, adminAuth, orderRouter);
router.use(`${ADMIN}/product/tag`, adminAuth, productTagRouter);
router.use(`${ADMIN}/lead`, adminAuth, leadRouter);
router.use(`${ADMIN}/followup`, adminAuth, followUpsRouter);
// ====== Admin routes ======


// ====== Franchise imports ======
import { franchiseAuth } from '../middlewares/auth';
import franchiseAuthRouter from "../apps/franchise-auth/api";
import franchiseProfileRouter from "../apps/franchise-user/api/profile";
import franchiseSettingsRouter from "../apps/franchise-user/api/settings";
import orderFranchaiseAnalyticsRouter from "../apps/analytics/api/web/orders-analytics";
import retortFranchaiseAnalyticsRouter from "../apps/analytics/api/web/retort-analytics";
// ====== Franchise imports ======

// ====== Franchise auth routes ======
router.use(`${FRANCHISE}/auth`, franchiseAuthRouter);
router.use(`${FRANCHISE}/profile`, franchiseAuth, franchiseProfileRouter); // pending
router.use(`${FRANCHISE}/settings`, franchiseAuth, franchiseSettingsRouter); // pending
// router.use(`${FRANCHISE}/order`, franchiseAuth, productRouter); // pending
// router.use(`${FRANCHISE}/invoice`, franchiseAuth, productRouter); // pending

router.use(`${FRANCHISE}/analytics/orders`, franchiseAuth, orderFranchaiseAnalyticsRouter); // pending
router.use(`${FRANCHISE}/analytics/retort`, franchiseAuth, retortFranchaiseAnalyticsRouter); // pending
// ====== Franchise auth routes ======

// ====== Frontend imports ======
// import { customerAuth } from '../middlewares/auth';
// import customerAuthRouter from "../apps/customer-auth/api";
import webLeadRouter from "../apps/lead/api/web-lead";
import webTestimonialsRouter from "../apps/testimonials/api/web-testimonials";
import webReviewsRouter from "../apps/reviews/api/web-reviews";
import webProductsRouter from "../apps/ecommerce/api/web/products";
// ====== Frontend imports ======

// ====== Frontend routes ======
router.use(`${FRONTEND}lead`, webLeadRouter);
// router.use(`${FRONTEND}auth`, webLeadRouter); // login & registration
// router.use(`${FRONTEND}food-menu`, webLeadRouter);
router.use(`${FRONTEND}reviews`, webReviewsRouter); //             // Check if it is customer validation penmding
router.use(`${FRONTEND}testimonials`, webTestimonialsRouter);
router.use(`${FRONTEND}product`, webProductsRouter);
// ====== Frontend routes ======

export default router;
