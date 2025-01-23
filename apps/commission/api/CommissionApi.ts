import * as express from "express";
import {
    validateCreateCommission,
    validateCreateCommissionMapEntry,
    validateDeleteCommission,
    validateGetCommissionById,
    validateSearchCommission,
    validateUpdateCommission,
    validateUpdateCommissionEntityStatus,
} from "../validations/CommissionValidations";
import { auth } from "../../../middlewares/auth";
import { PostgresCommissionController } from "../controllers/PostgresCommissionController";
console.log(PostgresCommissionController, "check here");
const commissionRouter = express.Router();
import { ControllerProvider } from "../../common/utils/ControllerProvider";

const commissionController = ControllerProvider.commissionController;
/**
 * @swagger
 *
 * /api/commission/create:
 *   post:
 *     summary: Create a commission
 *     tags: [Commission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - value
 *               - eventType
 *             properties:
 *               type:
 *                 type: string
 *               value:
 *                 type: number
 *               eventType:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Commission created
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *
 *
 */
// commissionRouter.post("/create", auth, validateCreateCommission, ControllerProvider.commissionController.create);
//
// commissionRouter.put("/update/:id", auth, validateUpdateCommission, ControllerProvider.commissionController.update);
//
// commissionRouter.delete("/delete", auth, validateDeleteCommission, ControllerProvider.commissionController.update);
//
commissionRouter.get("/list", auth, commissionController.getAll);

commissionRouter.get("/get/:id", commissionController.getById);

commissionRouter.post(
    "/create",
    auth,
    validateCreateCommission,
    commissionController.create,
);

commissionRouter.put(
    "/update/:id",
    auth,
    validateUpdateCommission,
    commissionController.update,
);

commissionRouter.delete("/delete", commissionController.delete);

//
// commissionRouter.get("/search", auth, validateSearchCommission, ControllerProvider.commissionController.searchCommission);
//
// commissionRouter.post("/create-commission-mapping", auth, validateCreateCommissionMapEntry, ControllerProvider.commissionController.createMapEntry);
//
// commissionRouter.get("/commission-mappings", auth, ControllerProvider.commissionController.getMappingsData);
//
// commissionRouter.get("/:id", auth, validateGetCommissionById, ControllerProvider.commissionController.getById);
//
// commissionRouter.put("/update-commission-entity-status/:id", auth, validateGetCommissionById, validateUpdateCommissionEntityStatus, ControllerProvider.commissionController.updateCommisionEntityStatus)
//

// TODO @Dhruv
// api required:
//     - get all commissions - DTO<Array<ParsedCommission>|null>
// commissionRouter.get("/list", getAllCommision);
//     - get commission by id - DTO<ParsedCommission|null>
// commissionRouter.get("/get/:id", getById);
//     - create commission - DTO<ParsedCommission|null>
// commissionRouter.post("/create", createCommission);
//     - update commission - DTO<ParsedCommission>
//     - delete commission - DTO<boolean>
//     - get all commission mappings - DTO<Array<ParsedCommissionEntity> | null>
//     - get commission mapping by id - DTO<ParsedCommissionEntity | null>
//     - create commission mapping - DTO<ParsedCommissionEntity | null>
//     - update commission mapping - DTO<ParsedCommissionEntity | null>
//     - delete commission mapping - DTO<boolean>
//     - get all commission voucher - DTO<Array<ParsedVoucher>|null>
//     - get commission voucher by id - DTO<ParsedVoucher|null>
//     - create commission voucher - DTO<ParsedVoucher | null>
//     - update commission voucher - DTO<ParsedVoucher | null>
//     - delete commission voucher - DTO<boolean>
//     - get all commission payout - DTO<Array<ParsedPayout>|null>
//     - get commission payout by id - DTO<ParsedPayout|null>
//     - create commission payout - DTO<ParsedPayout|null>
//     - update commission payout - DTO<ParsedPayout|null>
//     - delete commission payout - DTO<boolean>

export { commissionRouter };
