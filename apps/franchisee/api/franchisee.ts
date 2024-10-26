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
 *               franchiseLocations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     contactPhone:
 *                       type: string
 *                     location:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     zipCode:
 *                       type: string
 *               establishedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseAgreementSignedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseType:
 *                 type: string
 *                 enum: ['master', 'single', 'multi']
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
 *             example: 
 *               {
 *                 "name": "ABC Franchise",
 *                 "ownerName": "John Doe",
 *                 "contactEmail": "john.doe@abcfranchise.com",
 *                 "contactNumber": "+1234567890",
 *                 "franchiseLocations": [
 *                   {
 *                     "contactPhone": "+11234567890",
 *                     "location": "Main Street 123",
 *                     "city": "New York",
 *                     "state": "NY",
 *                     "country": "USA",
 *                     "zipCode": "10001"
 *                   }
 *                 ],
 *                 "establishedDate": "2010-05-20T00:00:00.000Z",
 *                 "franchiseAgreementSignedDate": "2011-06-15T00:00:00.000Z",
 *                 "franchiseType": "multi",
 *                 "region": "North America",
 *                 "description": "A leading franchise in fast food",
 *                 "website": "https://www.abcfranchise.com",
 *                 "socialMediaLinks": ["https://www.facebook.com/abcfranchise"],
 *                 "logo": "https://www.abcfranchise.com/logo.png",
 *                 "numberOfEmployees": 50,
 *                 "investmentAmount": 100000,
 *                 "royaltyPercentage": 5.5,
 *                 "monthlyRevenue": 50000,
 *                 "numberOfOutlets": 10,
 *                 "menuSpecialty": "Burgers and Fries",
 *                 "businessHours": "9 AM - 9 PM",
 *                 "deliveryOptions": true,
 *                 "isActive": true,
 *                 "ratings": 4.5,
 *                 "promotions": ["Summer Discount"],
 *                 "targetMarket": "Young professionals",
 *                 "sustainabilityPractices": "Recycling packaging",
 *                 "trainingPrograms": ["Franchisee Onboarding"],
 *                 "supportContact": "+1234567890",
 *                 "operationalChallenges": ["Staffing issues"],
 *                 "competitiveAdvantages": "High-quality products",
 *                 "expansionPlans": "Opening 5 new outlets next year",
 *                 "customerFeedback": ["Great service"],
 *                 "industryCertifications": ["ISO 9001"],
 *                 "affiliatePrograms": ["Loyalty Program"],
 *                 "performanceMetrics": {"monthlyGrowth": 8.5, "customerSatisfaction": 92},
 *                 "franchiseRenewalInfo": {
 *                   "renewalDate": "2025-12-01T00:00:00.000Z",
 *                   "conditions": "Based on performance metrics"
 *                 },
 *                 "partnerships": ["UberEats"],
 *                 "marketingStrategies": ["Social media campaigns"],
 *                 "trainingHistory": [
 *                   {"date": "2022-03-15T00:00:00.000Z", "topic": "Food Safety Training"}
 *                 ],
 *                 "crisisManagementPlans": "Emergency response plan",
 *                 "diversityInitiatives": "Inclusive hiring policies"
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
 *                 type: string
 *               franchiseLocations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     contactPhone:
 *                       type: string
 *                     location:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     zipCode:
 *                       type: string
 *               establishedDate:
 *                 type: string
 *                 format: date-time
 *               franchiseType:
 *                 type: string
 *                 enum: ['master', 'single', 'multi']
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
 *             example:
 *               {
 *                 "name": "ABC Franchise Updated",
 *                 "ownerName": "John Doe Updated",
 *                 "contactEmail": "john.doe@abcfranchise.com",
 *                 "franchiseLocations": [
 *                   {
 *                     "contactPhone": "+11234567890",
 *                     "location": "Main Street 123",
 *                     "city": "New York",
 *                     "state": "NY",
 *                     "country": "USA",
 *                     "zipCode": "10001"
 *                   }
 *                 ],
 *                 "establishedDate": "2010-05-20T00:00:00.000Z",
 *                 "franchiseType": "multi",
 *                 "numberOfEmployees": 50,
 *                 "investmentAmount": 100000,
 *                 "royaltyPercentage": 5.5,
 *                 "monthlyRevenue": 55000,
 *                 "numberOfOutlets": 11,
 *                 "menuSpecialty": "Burgers and Fries",
 *                 "businessHours": "9 AM - 10 PM",
 *                 "deliveryOptions": true,
 *                 "isActive": true
 *               }
 *     responses:
 *       '200':
 *         description: Franchisee updated successfully
 *       '404':
 *         description: Franchisee not found
 *       '400':
 *         description: Invalid input
 */
router.put('/:id', validateEditFranchiseeParams, validateEditFranchiseeBody, FranchiseeController.updateFranchisee);

export default router;
