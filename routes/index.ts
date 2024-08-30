import { Router } from "express";
const router = Router();

const ADMIN = '/admin';
const FRANCHISE = '/franchise';
const FRONTEND = '/';

// ====== Auth app imports ======
import { auth } from '../middlewares/auth';
import authRouter from "../apps/auth/api";
router.use(`/auth`, authRouter);
// ====== Auth app imports ======

// ====== Admin app imports ======
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
router.use(`${ADMIN}/product/order`, auth, orderRouter);
router.use(`${ADMIN}/product/tag`, auth, productTagRouter);
router.use(`${ADMIN}/lead`, auth, leadRouter);
router.use(`${ADMIN}/followup`, auth, followUpsRouter);
// ====== Admin routes ======

// ====== Franchise imports ======
import franchiseProfileRouter from "../apps/franchise-user/api/profile";
import franchiseSettingsRouter from "../apps/franchise-user/api/settings";
import orderFranchaiseAnalyticsRouter from "../apps/analytics/api/web/orders-analytics";
import retortFranchaiseAnalyticsRouter from "../apps/analytics/api/web/retort-analytics";
// ====== Franchise imports ======

// ====== Franchise auth routes ======
router.use(`${FRANCHISE}/profile`, auth, franchiseProfileRouter); // pending
router.use(`${FRANCHISE}/settings`, auth, franchiseSettingsRouter); // pending
// router.use(`${FRANCHISE}/order`, auth, productRouter); // pending
// router.use(`${FRANCHISE}/invoice`, auth, productRouter); // pending

router.use(`${FRANCHISE}/analytics/orders`, auth, orderFranchaiseAnalyticsRouter); // pending
router.use(`${FRANCHISE}/analytics/retort`, auth, retortFranchaiseAnalyticsRouter); // pending
// ====== Franchise auth routes ======

// ====== Frontend imports ======
import customerAuthRouter from "../apps/customer-user/api";
import webLeadRouter from "../apps/lead/api/web-lead";
import webTestimonialsRouter from "../apps/testimonials/api/web-testimonials";
import webReviewsRouter from "../apps/reviews/api/web-reviews";
import webProductsRouter from "../apps/ecommerce/api/web/products";
// ====== Frontend imports ======

// ====== Frontend routes ======
router.use(`${FRONTEND}lead`, webLeadRouter);
router.use(`${FRONTEND}auth`, customerAuthRouter); // registration (pending)
// router.use(`${FRONTEND}food-menu`, webLeadRouter);
router.use(`${FRONTEND}reviews`, webReviewsRouter); // Check if it is customer validation pending
router.use(`${FRONTEND}testimonials`, webTestimonialsRouter);
router.use(`${FRONTEND}product`, webProductsRouter);
// ====== Frontend routes ======

export default router;
