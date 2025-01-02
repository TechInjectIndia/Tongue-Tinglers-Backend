import * as express from "express";
import * as Validations from "../validations/OrganizationValidation";
import OrganizationController from "../controllers/OrganizationController";
import {
    validateEditOrganizationBody,
    validateEditOrgParams,
    validateListOrgQuery,
    validateOrganizationAddressPayloadSchema
} from "../validations/OrganizationValidation";

const router = express.Router();

const { validateCreateOrganizationBody } = Validations;

router.post(
    "/create",
    validateCreateOrganizationBody,
    OrganizationController.create
);

router.post(
    "/createUsingDashboard",
    validateCreateOrganizationBody,
    OrganizationController.create
);

router.get("/get/:id", validateEditOrgParams, OrganizationController.get);

router.put(
    "/update/:id",
    validateEditOrgParams,
    validateEditOrganizationBody,
    OrganizationController.update
);
router.delete("/delete", validateEditOrgParams, OrganizationController.delete);

router.get("/list", validateListOrgQuery, OrganizationController.list);

router.put("/updateAddress/:id", validateOrganizationAddressPayloadSchema, OrganizationController.updateAddressOfOrganization);

router.get("/getAddress/:id", OrganizationController.getAddressOfOrganization);

export default router;
