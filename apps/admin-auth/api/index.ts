import * as express from "express";
import AuthController from "../controllers";
import * as AuthValidation from "../validations";

const router = express.Router();

const { validateLoginAdminBody } = AuthValidation;
const { login } = AuthController;

router.post("/login", validateLoginAdminBody, login);

export default router;
