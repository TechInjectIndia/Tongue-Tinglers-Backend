import * as express from "express";
import LeadController from "../controllers/lead";
import {
    validateCreateLeadBody,
    validateListLeadQuery,
    validateEditLeadParams,
    validateEditLeadBody,
    validateEditMultipleIdsBody,
    validateAssignLeadBody,
    validateLeadStatusBody,
    validateConvertLeadParams,
} from "../validations/lead";
import {hasPermission} from "../../../middlewares";
import affiliateRouter from "../../affiliate/api/";
import franchiseModelRouter from "../../franchise_model/api/";
import proposalModelRouter from "../../proposal_model/api/";

const router = express.Router();
router.post(
    "/create",
    hasPermission("lead", "create"),
    validateCreateLeadBody,
    LeadController.create
);

export default router;
