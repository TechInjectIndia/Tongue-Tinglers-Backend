import { Router } from "express";
import adminRouter from "../apps/admin-user/api";
import adminAuthRouter from "../apps/admin-auth/api";

const ADMIN = '/admin';

const router = Router();

// ====== Admin auth routes ======
router.use(`${ADMIN}/auth`, adminAuthRouter);

// ====== Admin user routes ======
router.use(`${ADMIN}`, adminRouter);

export default router;
