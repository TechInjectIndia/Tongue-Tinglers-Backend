import express from 'express';
import FranchiseeController from '../controllers/FranchiseeController';
import {
    validateCreateFranchiseeBody,
    validateEditFranchiseeBody,
    validateEditFranchiseeParams
} from '../validations/validateFranchisee';

const router = express.Router();

/**
 * @swagger
 * /api/admin/franchisees:
 *   post:
 *     summary: Create a new franchisee
 *     tags: [Franchisee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerName:
 *                 type: string
 *               contactEmail:
 *                 type: array
 *                 items:
 *                   type: string
 *               franchiseLocations:
 *                 type: array
 *                 items:
 *                   type: object
 *               establishedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseAgreementSignedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseType:
 *                 type: string
 *               numberOfEmployees:
 *                 type: integer
 *               investmentAmount:
 *                 type: number
 *                 format: float
 *               royaltyPercentage:
 *                 type: number
 *                 format: float
 *               monthlyRevenue:
 *                 type: number
 *                 format: float
 *               numberOfOutlets:
 *                 type: integer
 *               menuSpecialty:
 *                 type: string
 *               businessHours:
 *                 type: string
 *               deliveryOptions:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Franchisee created successfully
 *       '400':
 *         description: Invalid input
 */
router.post('/', validateCreateFranchiseeBody, FranchiseeController.createFranchisee);

/**
 * @swagger
 * /api/admin/franchisees:
 *   get:
 *     summary: Retrieve all franchisees
 *     tags: [Franchisee]
 *     responses:
 *       '200':
 *         description: List of franchisees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   ownerName:
 *                     type: string
 *                   contactEmail:
 *                     type: array
 *                     items:
 *                       type: string
 *                   franchiseLocations:
 *                     type: array
 *                     items:
 *                       type: object
 *                   establishedDate:
 *                     type: string
 *                     format: date-time
 *                   franchiseType:
 *                     type: string
 *                   numberOfEmployees:
 *                     type: integer
 *                   investmentAmount:
 *                     type: number
 *                     format: float
 *                   isActive:
 *                     type: boolean
 *       '400':
 *         description: Bad request
 */
router.get('/', FranchiseeController.getAllFranchisees);

/**
 * @swagger
 * /api/admin/franchisees/{id}:
 *   get:
 *     summary: Retrieve a franchisee by ID
 *     tags: [Franchisee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the franchisee
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Franchisee found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 ownerName:
 *                   type: string
 *       '404':
 *         description: Franchisee not found
 *       '400':
 *         description: Bad request
 */
router.get('/:id', validateEditFranchiseeParams, FranchiseeController.getFranchiseeById);

/**
 * @swagger
 * /api/admin/franchisees/{id}:
 *   put:
 *     summary: Update a franchisee by ID
 *     tags: [Franchisee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the franchisee to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerName:
 *                 type: string
 *               contactEmail:
 *                 type: array
 *                 items:
 *                   type: string
 *               franchiseLocations:
 *                 type: array
 *                 items:
 *                   type: object
 *               establishedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseType:
 *                 type: string
 *               numberOfEmployees:
 *                 type: integer
 *               investmentAmount:
 *                 type: number
 *                 format: float
 *               royaltyPercentage:
 *                 type: number
 *                 format: float
 *               monthlyRevenue:
 *                 type: number
 *                 format: float
 *               numberOfOutlets:
 *                 type: integer
 *               menuSpecialty:
 *                 type: string
 *               businessHours:
 *                 type: string
 *               deliveryOptions:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Franchisee updated successfully
 *       '404':
 *         description: Franchisee not found
 *       '400':
 *         description: Invalid input
 */
router.put('/:id', validateEditFranchiseeParams, validateEditFranchiseeBody, FranchiseeController.updateFranchisee);

/**
 * @swagger
 * /api/admin/franchisees/{id}:
 *   delete:
 *     summary: Delete a franchisee by ID
 *     tags: [Franchisee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the franchisee to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Franchisee deleted successfully
 *       '404':
 *         description: Franchisee not found
 *       '400':
 *         description: Bad request
 */
router.delete('/:id', validateEditFranchiseeParams, FranchiseeController.deleteFranchisee);

export default router;
