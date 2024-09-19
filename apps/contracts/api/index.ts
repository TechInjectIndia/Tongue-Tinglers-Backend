import * as express from "express";
import ContractController from "../controllers/ContractController";
import * as ContractValidation from "../validations/index";
import { hasPermission } from '../../../middlewares';

const router = express.Router();

const {
    validateCreateContractBody,
    validateEditContractBody,
    validateEditContractParams,
} = ContractValidation;

/**
 * @swagger
 * /api/admin/contracts/create:
 *   post:
 *     summary: Create a new contract
 *     tags: [Admin > Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leadId
 *               - status
 *               - templateId
 *               - amount
 *               - dueDate
 *               - validity
 *               - createdBy
 *             properties:
 *               leadId:
 *                 type: string
 *                 example: "1"
 *               status:
 *                 type: string
 *                 enum: ["draft", "active", "expired", "terminated"]
 *                 example: "draft"
 *               templateId:
 *                 type: string
 *                 example: "template123"
 *               amount:
 *                 type: number
 *                 example: 1500.00
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-15"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-15"
 *               validity:
 *                 type: object
 *                 required:
 *                   - from
 *                   - to
 *                 properties:
 *                   from:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                   to:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-15"
 *               additionalInfo:
 *                 type: string
 *                 example: "Additional contract information"
 *               createdBy:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       '201':
 *         description: Contract created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/contracts/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all contracts
 *     tags: [Admin > Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Size of the retrieved data
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: How many rows to skip
 *     responses:
 *       '200':
 *         description: Contracts retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/contracts/get/{id}:
 *   get:
 *     summary: Get a contract by ID
 *     tags: [Admin > Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contract to retrieve
 *     responses:
 *       '200':
 *         description: Contract retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TContract'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Contract not found
 * 
 * /api/admin/contracts/update/{id}:
 *   put:
 *     summary: Update a contract
 *     tags: [Admin > Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contract to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               templateId:
 *                 type: string
 *                 example: "template123"
 *               amount:
 *                 type: number
 *                 example: 1600.00
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-16"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-16"
 *               validity:
 *                 type: object
 *                 properties:
 *                   from:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-16"
 *                   to:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-16"
 *               additionalInfo:
 *                 type: string
 *                 example: "Updated contract information"
 *               updatedBy:
 *                 type: string
 *                 example: "admin456"
 *     responses:
 *       '200':
 *         description: Contract updated successfully
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Contract not found
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/contracts/delete:
 *   delete:
 *     summary: Delete contracts
 *     tags: [Admin > Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1", "2"]
 *     responses:
 *       '200':
 *         description: Contracts deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Contracts not found
 */

// ====== Contracts Starts ======
router.post("/create", hasPermission('contracts', 'create'), validateCreateContractBody, ContractController.create);
router.get("/list", hasPermission('contracts', 'read'), ContractController.list);
router.get("/get/:id", hasPermission('contracts', 'read'), validateEditContractParams, ContractController.get);
router.put("/update/:id", hasPermission('contracts', 'update'), validateEditContractParams, validateEditContractBody, ContractController.update);
router.delete("/delete/:id", hasPermission('contracts', 'delete'), validateEditContractParams, ContractController.delete);
// ====== Contracts Ends ======

export default router;
