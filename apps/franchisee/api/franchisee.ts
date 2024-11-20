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
 * /api/admin/franchisee:
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
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               establishedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseAgreementSignedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseType:
 *                 type: string
 *                 enum: ['master_franchise', 'super_franchise', 'franchise']
 *               regionId:
 *                 type: string
 *               userid:
 *                 type: string
 *               referBy:
 *                 type: string
 *               parentFranchise:
 *                 type: string
 *               contractIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *               ratings:
 *                 type: number
 *               organizationId:
 *                 type: number
 *               franchiseRenewalInfo:
 *                 type: object
 *                 properties:
 *                   renewalDate:
 *                     type: string
 *                     format: date-time
 *                   conditions:
 *                     type: string
 *               franchiseLocation:
 *                 type: object
 *                 properties:
 *                   contactPhone:
 *                     type: string
 *                     description: "Contact phone number for this franchise location"
 *                   location:
 *                     type: string
 *                     description: "Specific location or address of the franchise"
 *                   city:
 *                     type: string
 *                     description: "City where the franchise location is situated"
 *                   state:
 *                     type: string
 *                     description: "State or region for the franchise location"
 *                   country:
 *                     type: string
 *                     description: "Country of the franchise location"
 *                   zipCode:
 *                     type: string
 *                     description: "Zip code or postal code for the franchise location"
 *               socialMediaDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: "URL of the social media profile"
 *                     type:
 *                       type: string
 *                       enum: ['fb', 'instagram', 'youtube']
 *                       description: "Type of social media platform"
 *             example: 
 *               {
 *                 "name": "ABC Franchise",
 *                 "ownerName": "John Doe",
 *                 "contactEmail": "john.doe@abcfranchise.com",
 *                 "contactNumber": "+1234567890",
 *                 "establishedDate": "2010-05-20T00:00:00.000Z",
 *                 "franchiseAgreementSignedDate": "2011-06-15T00:00:00.000Z",
 *                 "franchiseType": "multi",
 *                 "regionId": "region123",
 *                 "contractIds": ["contract1", "contract2"],
 *                 "isActive": true,
 *                 "ratings": 4.5,
 *                 "organizationId" : 1,
 *                 "franchiseRenewalInfo": {
 *                   "renewalDate": "2025-12-01T00:00:00.000Z",
 *                   "conditions": "Based on performance metrics"
 *                 },
 *                 "franchiseLocation": {
 *                   "contactPhone": "+11234567890",
 *                   "location": "Main Street 123",
 *                   "city": "New York",
 *                   "state": "NY",
 *                   "country": "USA",
 *                   "zipCode": "10001"
 *                 },
 *                 "socialMediaDetails": [
 *                   {
 *                     "url": "https://facebook.com/abcfranchise",
 *                     "type": "Facebook"
 *                   },
 *                   {
 *                     "url": "https://twitter.com/abcfranchise",
 *                     "type": "Twitter"
 *                   }
 *                 ]
 *               }
 *     responses:
 *       '201':
 *         description: Franchisee created successfully
 *       '400':
 *         description: Invalid input
 */
router.post('/', validateCreateFranchiseeBody, FranchiseeController.createFranchisee);

/**
 * @swagger
 * /api/admin/franchisee:
 *   get:
 *     summary: Retrieve all franchisees
 *     tags: [Franchisee]
 *     parameters:
 *       - in: query
 *         name: franchiseType
 *         required: false
 *         schema:
 *           type: string
 *           description: Filter franchisees by type (e.g., super_franchise, franchise, master_franchise)
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
 * /api/admin/franchisee/{id}:
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
 * /api/admin/franchisee/{id}:
 *   put:
 *     summary: Update an existing franchisee
 *     tags: [Franchisee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the franchisee to update
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
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               establishedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseAgreementSignedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseType:
 *                 type: string
 *                 enum: ['master_franchise', 'super_franchise', 'franchise']
 *               regionId:
 *                 type: string
 *               userid:
 *                 type: string
 *               referBy:
 *                 type: string
 *               parentFranchise:
 *                 type: string
 *               contractIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *               ratings:
 *                 type: number
 *               organizationId:
 *                 type: number
 *               franchiseRenewalInfo:
 *                 type: object
 *                 properties:
 *                   renewalDate:
 *                     type: string
 *                     format: date-time
 *                   conditions:
 *                     type: string
 *               franchiseLocation:
 *                 type: object
 *                 properties:
 *                   contactPhone:
 *                     type: string
 *                   location:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *               socialMediaDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: ['fb', 'instagram', 'youtube']
 *             example: 
 *               {
 *                 "name": "ABC Franchise",
 *                 "ownerName": "John Doe",
 *                 "contactEmail": "john.doe@abcfranchise.com",
 *                 "contactNumber": "+1234567890",
 *                 "establishedDate": "2010-05-20T00:00:00.000Z",
 *                 "franchiseAgreementSignedDate": "2011-06-15T00:00:00.000Z",
 *                 "franchiseType": "multi",
 *                 "regionId": "region123",
 *                 "contractIds": ["contract1", "contract2"],
 *                 "isActive": true,
 *                 "ratings": 4.5,
 *                 "organizationId" : 1,
 *                 "franchiseRenewalInfo": {
 *                   "renewalDate": "2025-12-01T00:00:00.000Z",
 *                   "conditions": "Based on performance metrics"
 *                 },
 *                 "franchiseLocation": {
 *                   "contactPhone": "+11234567890",
 *                   "location": "Main Street 123",
 *                   "city": "New York",
 *                   "state": "NY",
 *                   "country": "USA",
 *                   "zipCode": "10001"
 *                 },
 *                 "socialMediaDetails": [
 *                   {
 *                     "url": "https://facebook.com/abcfranchise",
 *                     "type": "fb"
 *                   },
 *                   {
 *                     "url": "https://twitter.com/abcfranchise",
 *                     "type": "twitter"
 *                   }
 *                 ]
 *               }
 *     responses:
 *       '200':
 *         description: Franchisee updated successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Franchisee not found
 */
router.put('/:id', validateEditFranchiseeParams, validateEditFranchiseeBody, FranchiseeController.updateFranchisee);

export default router;
