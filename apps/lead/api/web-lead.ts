import * as express from "express";
import LeadController from "../controllers/lead";
import {
    validateCreateLeadBody,
} from "../validations/lead";
import { hasPermission } from "../../../middlewares";

const router = express.Router();
router.post(
    "/create",
    hasPermission("lead", "create"),
    validateCreateLeadBody,
    LeadController.frontEnd
);

export default router;
