import * as express from "express";
import AffiliateController from "../controllers";
import * as AffiliateValidation from "../validations";

const router = express.Router();

const {
  validateCreateAffiliateBody,
  validateEditAffiliateBody,
  validateEditAffiliateParams,
  validateListAffiliateQuery,
  validateEditMultipleIdsBody,
} = AffiliateValidation;

// ====== Affiliate Starts ======
/**
 * @swagger
 * components:
 *   schemas:
 *     SMDetails:
 *       type: object
 *       properties:
 *         handle:
 *           type: string
 *           description: Social media handle
 *           example: "@affiliate_handle"
 *         followers:
 *           type: integer
 *           description: Number of followers
 *           example: 1500
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the social media profile
 *           example: ["influencer", "marketing"]
 *     AffiliateModel:
 *       type: object
 *       required:
 *         - type
 *         - codes
 *         - sm
 *       properties:
 *         type:
 *           type: string
 *           description: Type of the Affiliate
 *           example: "Influencer"
 *         codes:
 *           type: object
 *           description: Key-value pairs of affiliate codes
 *           additionalProperties:
 *             type: string
 *           example: { "DISCOUNT10": "Save 10%", "FREESHIP": "Free Shipping" }
 *         sm:
 *           type: object
 *           description: Social media details associated with the Affiliate
 *           additionalProperties:
 *             $ref: '#/components/schemas/SMDetails'
 *           example: { "twitter": { "handle": "@affiliate_handle", "followers": 1500, "tags": ["influencer", "marketing"] } }
 */

/**
 * @swagger
 * /api/admin/lead/affiliate/create:
 *   post:
 *     summary: Create a new Affiliate
 *     tags: [Affiliate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AffiliateModel'
 *     responses:
 *       '201':
 *         description: Affiliate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateModel'
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Type is required.", "Codes must be an object."]
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 */

/**
 * @swagger
 * /api/admin/lead/affiliate/list:
 *   get:
 *     summary: Get all Affiliates
 *     tags: [Affiliate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of records to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: Number of records to skip
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *         required: false
 *         description: Search term to filter Affiliates
 *       - in: query
 *         name: sorting
 *         schema:
 *           type: string
 *           default: ""
 *         required: false
 *         description: Sorting criteria (e.g., "type:asc")
 *     responses:
 *       '200':
 *         description: Affiliates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AffiliateModel'
 *                 total:
 *                   type: integer
 *                   description: Total number of Affiliates
 *                   example: 50
 *       '400':
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Size must be a positive integer."]
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 */

/**
 * @swagger
 * /api/admin/lead/affiliate/get/{id}:
 *   get:
 *     summary: Get an Affiliate by ID
 *     tags: [Affiliate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the Affiliate to retrieve
 *     responses:
 *       '200':
 *         description: Affiliate retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateModel'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: Affiliate not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Affiliate not found"
 */

/**
 * @swagger
 * /api/admin/lead/affiliate/update/{id}:
 *   put:
 *     summary: Update an Affiliate
 *     tags: [Affiliate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the Affiliate to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AffiliateModel'
 *     responses:
 *       '200':
 *         description: Affiliate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateModel'
 *       '400':
 *         description: Invalid request body or parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Type must be a string.", "Codes must be an object."]
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: Affiliate not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Affiliate not found"
 */

/**
 * @swagger
 * /api/admin/lead/affiliate/delete:
 *   delete:
 *     summary: Delete one or more Affiliates
 *     tags: [Affiliate]
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
 *                   format: uuid
 *                 description: Array of Affiliate IDs to delete
 *                 example: ["123e4567-e89b-12d3-a456-426614174000", "223e4567-e89b-12d3-a456-426614174001"]
 *     responses:
 *       '200':
 *         description: Affiliates deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   description: Number of Affiliates deleted
 *                   example: 2
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["At least one ID is required.", "Each ID must be a valid UUID."]
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: One or more Affiliates not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "One or more Affiliates not found"
 */

router.post("/create", validateCreateAffiliateBody, AffiliateController.create);
router.get("/list", validateListAffiliateQuery, AffiliateController.list);
router.get("/get/:id", validateEditAffiliateParams, AffiliateController.get);
router.put("/update/:id", validateEditAffiliateParams, validateEditAffiliateBody, AffiliateController.update);
router.delete("/delete", validateEditMultipleIdsBody, AffiliateController.delete);

export default router;
