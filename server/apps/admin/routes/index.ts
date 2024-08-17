import * as express from "express";
import authRouter from "./auth";
import adminRouter from "./admin";
import { auth } from "apps/admin/middlewares";

const router = express.Router();

router.use("/", authRouter);
router.use("/user", auth, adminRouter);

export default router;
