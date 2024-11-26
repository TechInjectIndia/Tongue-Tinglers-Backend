import * as express from "express";
import PdiChecklistController from "../controllers/pdiController";
import {
    validateCreateIChecklistBody,
    validateDeleteMultipleIdsBody,
    validateEditChecklistBody,
    validateEditCheckpointParams,
    validateListChecklistQuery,
} from "../validations/pdiValidations";
const router = express.Router();

router.post(
    "/create",
    validateCreateIChecklistBody,
    PdiChecklistController.create
);
router.get("/list", validateListChecklistQuery, PdiChecklistController.list);
router.get(
    "/get/:id",
    validateEditCheckpointParams,
    PdiChecklistController.get
);
router.put(
    "/update/:id",
    validateEditChecklistBody,
    validateEditChecklistBody,
    PdiChecklistController.update
);
router.delete(
    "/delete",
    validateDeleteMultipleIdsBody,
    PdiChecklistController.delete
);

export default router;
