// src/routes/CampaignRoutes.ts
import * as express from "express";
import CampaignController from "../controllers/CampaignController";
import * as CampaignValidation from "../validations/CampaignValidation";

const router = express.Router();
const campaignRouter = express.Router();

const {
    validateCreateCampaignBody,
    validateEditCampaignBody,
    validateEditCampaignParams,
    validateListCampaignQuery,
    validateDeleteMultipleIdsBody,
} = CampaignValidation;

/**
 * @swagger
 *
 * /api/admin/campaign-ad/create:
 *   post:
 *     summary: Create a new campaign Ad
 *     tags:
 *       - Campaigns-Ad
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - franchiseId
 *               - regionId
 *               - questionList
 *               - start
 *               - to
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test 2"
 *                 description: "Name of the campaign"
 *               description:
 *                 type: string
 *                 example: "Test"
 *                 description: "Description of the campaign"
 *               questionList:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "c83e8df1-d958-489a-9f6f-17fb09d6927d"
 *                 description: "List of question IDs associated with the campaign"
 *               franchiseId:
 *                 type: string
 *                 example: "cb5511e3-82b8-4a7d-9dec-8769a747dc64"
 *                 description: "Franchise ID associated with the campaign"
 *               regionId:
 *                 type: integer
 *                 example: 1
 *                 description: "Region ID associated with the campaign"
 *               affiliateId:
 *                 type: string
 *                 example: "a61f854a-1234-4a67-a428-d77473be7c59"
 *                 description: "Affiliate ID associated with the campaign"
 *               proposalIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "c83e8df1-d958-489a-9f6f-17fb09d6927d"
 *                 description: "List of proposal IDs associated with the campaign"
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-11-19"
 *                 description: "Start date of the campaign"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-11-20"
 *                 description: "End date of the campaign"
 *     responses:
 *       '201':
 *         description: Campaign created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *
 * /api/admin/campaign-ad/list:
 *   get:
 *     summary: Get all campaign ads with filtering and pagination
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of records to retrieve per page (limit).
 *       - in: query
 *         name: skip
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of records to skip (offset).
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for matching campaigns based on name, franchise ID, region, description, or other relevant fields.
 *       - in: query
 *         name: sorting
 *         required: false
 *         schema:
 *           type: string
 *           enum: [id ASC, id DESC, name ASC, name DESC, createdAt ASC, createdAt DESC]
 *         description: Sorting order for the results, e.g., 'id ASC' or 'createdAt DESC'.
 *       - in: query
 *         name: franchiseId
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter campaigns by franchise ID.
 *       - in: query
 *         name: region
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter campaigns by region.
 *       - in: query
 *         name: trashOnly
 *         required: false
 *         schema:
 *           type: string
 *         description: Flag to return only campaigns marked for deletion (trash).
 *     responses:
 *       '200':
 *         description: Campaigns retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *
 * /api/admin/campaign-ad/get/{id}:
 *   get:
 *     summary: Get a campaign Ad by ID
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the campaign to retrieve
 *     responses:
 *       '200':
 *         description: Campaign retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaign not found
 *
* /api/admin/campaign-ad/update/{id}:
 *   put:
 *     summary: Update a campaign Ad
 *     tags: [Campaigns-Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the campaign to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test Updated"
 *                 description: Name of the campaign
 *               description:
 *                 type: string
 *                 example: "Test"
 *                 description: Description of the campaign
 *               questionList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["c83e8df1-d958-489a-9f6f-17fb09d6927d", "82928a12-f2f9-4212-9189-5ae20242c438"]
 *                 description: List of question IDs associated with the campaign
 *               franchiseId:
 *                 type: string
 *                 example: "cb5511e3-82b8-4a7d-9dec-8769a747dc64"
 *                 description: Franchise ID associated with the campaign
 *               regionId:
 *                 type: integer
 *                 example: 1
 *                 description: Region ID associated with the campaign
 *               affiliateId:
 *                 type: string
 *                 example: "a61f854a-1234-4a67-a428-d77473be7c59"
 *                 description: Affiliate ID associated with the campaign
 *               proposalIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["c83e8df1-d958-489a-9f6f-17fb09d6927d", "82928a12-f2f9-4212-9189-5ae20242c438"]
 *                 description: List of proposal IDs associated with the campaign
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-11-19"
 *                 description: Start date of the campaign
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-11-20"
 *                 description: End date of the campaign
 *     responses:
 *       '200':
 *         description: Campaign updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaign not found
 *
 * /api/admin/campaign-ad/delete:
 *   delete:
 *     summary: Delete campaigns Ad
 *     tags: [Campaigns-Ad]
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
 *         description: Campaigns deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Campaigns not found
 */
router.post("/create", validateCreateCampaignBody, CampaignController.create);
campaignRouter.post("/create", validateCreateCampaignBody, CampaignController.create);
router.get("/list", validateListCampaignQuery, CampaignController.list);
router.get("/get/:id", CampaignController.get);
router.put(
    "/update/:id",
    validateEditCampaignParams,
    validateEditCampaignBody,
    CampaignController.update
);
router.delete(
    "/delete",
    validateDeleteMultipleIdsBody,
    CampaignController.delete
);

export default router;
