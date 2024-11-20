import * as express from "express";
import ContractController from "../controllers/ContractController";
import * as ContractValidation from "../validations/index";
import { hasPermission } from "../../../middlewares";

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
 *               - status
 *               - leadId
 *               - proposalData
 *               - templateId
 *               - amount
 *               - dueDate
 *               - validity
 *               - createdBy
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["draft", "active", "expired", "terminated"]
 *                 example: "active"
 *                 description: The status of the contract.
 *               proposalData:
 *                 type: object
 *               terminationDetails:
 *                 type: object
 *                 description: Details about the contract termination if applicable.
 *                 properties:
 *                   UserDetails:
 *                     type: object
 *                     required: true
 *                     description: Details of the user initiating the termination.
 *                   reason:
 *                     type: string
 *                     example: "Client requested termination"
 *                     description: Reason for terminating the contract.
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                     description: Date of termination.
 *               payment:
 *                 type: object
 *                 description: Payment details associated with the contract.
 *                 properties:
 *                   paymentId:
 *                     type: string
 *                     example: "payment123"
 *                     description: ID of the payment.
 *                   amount:
 *                     type: number
 *                     example: 1500.00
 *                     description: Amount paid.
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                     description: Date of payment.
 *                   status:
 *                     type: string
 *                     enum: ["pending", "completed", "failed"]
 *                     example: "pending"
 *                     description: Status of the payment.
 *                   additionalInfo:
 *                     type: string
 *                     example: "Payment processed via wire transfer"
 *                     description: Additional information about the payment.
 *               leadId:
 *                 type: string
 *                 example: "lead123"
 *                 description: ID of the lead associated with the contract.
 *               templateId:
 *                 type: string
 *                 example: "template456"
 *                 description: ID of the template used for the contract.
 *               amount:
 *                 type: number
 *                 example: 2500.00
 *                 description: Total amount for the contract.
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-20"
 *                 description: Date when the contract was signed.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-15"
 *                 description: Due date for the contract.
 *               validity:
 *                 type: object
 *                 description: Validity period of the contract.
 *                 properties:
 *                   from:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                     description: Start date of the validity.
 *                   to:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-15"
 *                     description: End date of the validity.
 *               additionalInfo:
 *                 type: string
 *                 example: "Additional contract details"
 *                 description: Any additional information regarding the contract.
 *               createdBy:
 *                 type: string
 *                 example: "admin123"
 *                 description: ID of the user who created the contract.
 *               updatedBy:
 *                 type: string
 *                 example: "admin456"
 *                 description: ID of the user who last updated the contract.
 *               deletedBy:
 *                 type: string
 *                 example: "admin789"
 *                 description: ID of the user who deleted the contract, if applicable.
 *               signedDocs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     docId:
 *                       type: string
 *                       example: "signedDoc123"
 *                       description: ID of the signed document.
 *                     sentBy:
 *                       type: object
 *                       required: true
 *                       description: Details of the sender of the signed document.
 *                     createdAt:
 *                       type: string
 *                       format: date
 *                       example: "2023-09-21"
 *                       description: Creation date of the signed document.
 *                     status:
 *                       type: string
 *                       enum: ["sent", "received", "signed"]
 *                       example: "signed"
 *                       description: Status of the signed document.
 *                     docLink:
 *                       type: string
 *                       example: "https://example.com/signedDocument.pdf"
 *                       description: Link to the signed document.
 *                     signedDate:
 *                       type: string
 *                       format: date
 *                       example: "2023-09-22"
 *                       description: Date when the document was signed.
 *                     notes:
 *                       type: string
 *                       example: "Notes regarding the signed document."
 *                       description: Any notes related to the signed document.
 *             description: Contract creation request body.
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
 *             required:
 *               - status
 *               - leadId
 *               - templateId
 *               - amount
 *               - dueDate
 *               - validity
 *               - createdBy
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["draft", "active", "expired", "terminated"]
 *                 example: "active"
 *                 description: The status of the contract.
 *               terminationDetails:
 *                 type: object
 *                 description: Details about the contract termination if applicable.
 *                 properties:
 *                   UserDetails:
 *                     type: object
 *                     required: true
 *                     description: Details of the user initiating the termination.
 *                   reason:
 *                     type: string
 *                     example: "Client requested termination"
 *                     description: Reason for terminating the contract.
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                     description: Date of termination.
 *               payment:
 *                 type: object
 *                 description: Payment details associated with the contract.
 *                 properties:
 *                   paymentId:
 *                     type: string
 *                     example: "payment123"
 *                     description: ID of the payment.
 *                   amount:
 *                     type: number
 *                     example: 1500.00
 *                     description: Amount paid.
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                     description: Date of payment.
 *                   status:
 *                     type: string
 *                     enum: ["pending", "completed", "failed"]
 *                     example: "pending"
 *                     description: Status of the payment.
 *                   additionalInfo:
 *                     type: string
 *                     example: "Payment processed via wire transfer"
 *                     description: Additional information about the payment.
 *               leadId:
 *                 type: string
 *                 example: "lead123"
 *                 description: ID of the lead associated with the contract.
 *               templateId:
 *                 type: string
 *                 example: "template456"
 *                 description: ID of the template used for the contract.
 *               amount:
 *                 type: number
 *                 example: 2500.00
 *                 description: Total amount for the contract.
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-09-20"
 *                 description: Date when the contract was signed.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-15"
 *                 description: Due date for the contract.
 *               validity:
 *                 type: object
 *                 description: Validity period of the contract.
 *                 properties:
 *                   from:
 *                     type: string
 *                     format: date
 *                     example: "2023-09-15"
 *                     description: Start date of the validity.
 *                   to:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-15"
 *                     description: End date of the validity.
 *               additionalInfo:
 *                 type: string
 *                 example: "Additional contract details"
 *                 description: Any additional information regarding the contract.
 *               createdBy:
 *                 type: string
 *                 example: "admin123"
 *                 description: ID of the user who created the contract.
 *               updatedBy:
 *                 type: string
 *                 example: "admin456"
 *                 description: ID of the user who last updated the contract.
 *               deletedBy:
 *                 type: string
 *                 example: "admin789"
 *                 description: ID of the user who deleted the contract, if applicable.
 *               signedDocs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     docId:
 *                       type: string
 *                       example: "signedDoc123"
 *                       description: ID of the signed document.
 *                     sentBy:
 *                       type: object
 *                       required: true
 *                       description: Details of the sender of the signed document.
 *                     createdAt:
 *                       type: string
 *                       format: date
 *                       example: "2023-09-21"
 *                       description: Creation date of the signed document.
 *                     status:
 *                       type: string
 *                       enum: ["sent", "received", "signed"]
 *                       example: "signed"
 *                       description: Status of the signed document.
 *                     docLink:
 *                       type: string
 *                       example: "https://example.com/signedDocument.pdf"
 *                       description: Link to the signed document.
 *                     signedDate:
 *                       type: string
 *                       format: date
 *                       example: "2023-09-22"
 *                       description: Date when the document was signed.
 *                     notes:
 *                       type: string
 *                       example: "Notes regarding the signed document."
 *                       description: Any notes related to the signed document.
 *             description: Contract creation request body.
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
router.post(
    "/create",
    hasPermission("contracts", "create"),
    validateCreateContractBody,
    ContractController.create
);
router.get(
    "/list",
    hasPermission("contracts", "read"),
    ContractController.list
);
router.get(
    "/get/:id",
    hasPermission("contracts", "read"),
    validateEditContractParams,
    ContractController.get
);
router.put(
    "/update/:id",
    hasPermission("contracts", "update"),
    validateEditContractParams,
    validateEditContractBody,
    ContractController.update
);
router.delete(
    "/delete",
    hasPermission("contracts", "delete"),
    ContractController.delete
);
router.post("/convert", ContractController.convert);
// ====== Contracts Ends ======

export default router;
