import * as express from "express";
import PdiChecklistController from "../controllers/PdiChecklistController";
import {
    validateCreatePdiChecklistBody,
    validateUpdatePdiChecklistParams,
    validateUpdatePdiChecklistBody,
    validateGetPdiChecklistParams,
    validateDeletePdiChecklistBody,
} from "../validations/pdiChecklistValidation";
import { hasPermission } from "../../../middlewares";

const router = express.Router();

router.post(
    "/create",
    hasPermission("pdichecklist", "create"),
    validateCreatePdiChecklistBody,
    PdiChecklistController.create
);
router.put(
    "/update/:id",
    hasPermission("pdichecklist", "update"),
    validateUpdatePdiChecklistParams,
    validateUpdatePdiChecklistBody,
    PdiChecklistController.update
);
router.get(
    "/get/:id",
    hasPermission("pdichecklist", "read"),
    validateGetPdiChecklistParams,
    PdiChecklistController.get
);
router.delete(
    "/delete",
    hasPermission("pdichecklist", "delete"),
    validateDeletePdiChecklistBody,
    PdiChecklistController.delete
);

export default router;
