import { Router } from "express";
import adminRouter from "apps/admin/routes";

const router = Router();

// ====== Admin routes ======
router.use("/admin", adminRouter);

// ====== Franchisee routes ======
// router.use("/admin", adminRouter); // Coming soon

// ====== Customer/Website routes ======
// router.use("/admin", adminRouter); // Coming soon

export default router;
