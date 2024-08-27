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
import analyticsRouter from "../apps/analytics/api/analytics";
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

router.use(`${ADMIN}/settings`, adminAuth, settingsRouter);

router.use(`${ADMIN}/payments/settings`, adminAuth, paymentsRouter);
router.use(`${ADMIN}/payments`, adminAuth, paymentsRouter);

router.use(`${ADMIN}/analytics/orders`, adminAuth, analyticsRouter);
router.use(`${ADMIN}/analytics/leads`, adminAuth, analyticsRouter);
router.use(`${ADMIN}/analytics/retort-supply`, adminAuth, productRouter);

router.use(`${ADMIN}/menu`, adminAuth, menuRouter);

router.use(`${ADMIN}/product`, adminAuth, productRouter);
router.use(`${ADMIN}/product/category`, adminAuth, productCategoryRouter);
router.use(`${ADMIN}/product/order`, adminAuth, orderRouter);
router.use(`${ADMIN}/product/tag`, adminAuth, productTagRouter);
router.use(`${ADMIN}/lead`, adminAuth, leadRouter);
router.use(`${ADMIN}/lead/followup`, adminAuth, followUpsRouter);
// ====== Admin routes ======


// ====== Franchise imports ======
import { franchiseAuth } from '../middlewares/auth';
import franchiseAuthRouter from "../apps/franchise-auth/api";
// ====== Franchise imports ======

// ====== Franchise auth routes ======
router.use(`${FRANCHISE}/auth`, franchiseAuthRouter);
// router.use(`${FRANCHISE}/profile`, franchiseAuth, productRouter);
// router.use(`${FRANCHISE}/settings`, franchiseAuth, productRouter);
// router.use(`${FRANCHISE}/order`, franchiseAuth, productRouter);
// router.use(`${FRANCHISE}/invoice`, franchiseAuth, productRouter);
// router.use(`${FRANCHISE}/analytics/orders`, franchiseAuth, productRouter);
// router.use(`${FRANCHISE}/analytics/retort-supply`, franchiseAuth, productRouter);
// ====== Franchise auth routes ======

// ====== Frontend imports ======
// import { customerAuth } from '../middlewares/auth';
// import customerAuthRouter from "../apps/customer-auth/api";
import webLeadRouter from "../apps/lead/api/web-lead";
// ====== Frontend imports ======

// ====== Frontend routes ======
router.use(`${FRONTEND}lead`, webLeadRouter);
// router.use(`${FRONTEND}auth`, webLeadRouter); // login & registration
// router.use(`${FRONTEND}food-menu`, webLeadRouter);
// router.use(`${FRONTEND}reviews`, webLeadRouter);
// router.use(`${FRONTEND}testimonials`, webLeadRouter);
// router.use(`${FRONTEND}product`, webLeadRouter); // list, single , new & upcoming products
// ====== Frontend routes ======

export default router;
