import * as express from "express";
import { hasPermission } from "../../../middlewares";
import FranchiseController from "../controllers/franchiseController";

const router = express.Router();

const { createFranchise } = FranchiseController;


router.post("/create", hasPermission("admin", "create"), createFranchise);

export default router;
