import * as express from "express";
import { hasPermission } from "../../../middlewares";
import FranchiseController from "../controllers/franchiseController";

const router = express.Router();

const { createFranchise, getById } = FranchiseController;


router.post("/create", hasPermission("admin", "create"), createFranchise);
router.get("/get/:id", hasPermission("admin", "create"), getById);

export default router;
