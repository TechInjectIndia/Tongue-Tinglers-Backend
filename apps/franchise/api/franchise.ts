import * as express from "express";
import { hasPermission } from "../../../middlewares";
import FranchiseController from "../controllers/franchiseController";

const router = express.Router();

const { createFranchise, getById, getAll } = FranchiseController;


router.post("/create", hasPermission("admin", "get"), createFranchise);
router.get("/get/:id", hasPermission("admin", "get"), getById);
router.get('/', hasPermission("admin", "get"), getAll)

export default router;
