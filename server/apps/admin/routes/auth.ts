import * as express from "express";
import AuthController from "apps/admin/controllers/auth/auth.controller";
import * as AuthValidation from "../controllers/auth/auth.validation";

const router = express.Router();

const { validateLoginAdminBody } = AuthValidation;
const { login } = AuthController;

router.post("/login", validateLoginAdminBody, login);

export default router;
