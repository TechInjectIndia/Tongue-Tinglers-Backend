import * as express from "express";
import { validateCreateCommission, validateCreateCommissionMapEntry, validateDeleteCommission, validateGetCommissionById, validateSearchCommission, validateUpdateCommission } from "../validations/CommissionValidations";
import { ControllerProvider } from "../../common/utils/ControllerProvider";
import { auth } from '../../../middlewares/auth';


const commissionRouter = express.Router();


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
commissionRouter.post("/create", auth, validateCreateCommission, ControllerProvider.commissionController.create);

commissionRouter.put("/update/:id", auth, validateUpdateCommission, ControllerProvider.commissionController.update);

commissionRouter.delete("/delete", auth, validateDeleteCommission, ControllerProvider.commissionController.update);

commissionRouter.get("/", auth, ControllerProvider.commissionController.getAll);


commissionRouter.get("/search", auth, validateSearchCommission, ControllerProvider.commissionController.searchCommission);


commissionRouter.post("/create-commission-mapping", auth, validateCreateCommissionMapEntry, ControllerProvider.commissionController.createMapEntry);

commissionRouter.get("/commission-mappings", auth, ControllerProvider.commissionController.getMappingsData);

commissionRouter.get("/:id", auth, validateGetCommissionById, ControllerProvider.commissionController.getById);


export { commissionRouter };
