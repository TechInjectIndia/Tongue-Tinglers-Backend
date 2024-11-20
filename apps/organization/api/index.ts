import * as express from "express";
import * as Validations from "../validations/OrganizationValidation";
import OrganizationController from "../controllers/OrganizationController";
import { validateEditOrganizationBody, validateEditOrgParams, validateListOrgQuery } from "../validations/OrganizationValidation";

const router = express.Router();

const { validateCreateOrganizationBody } = Validations;

// SWAGGER IS PENDING
/**
 * @swagger
 *
 * /api/admin/campaign-ad/create:
 *   post:
 *     summary: Create a new campaign Ad
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
 *               - name
 *               - franchiseId
 *               - region
 *               - questionList
 *               - startDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Summer Campaign"
 *               franchiseId:
 *                 type: string
 *                 example: "franchiseId"
 *               region:
 *                 type: string
 *                 example: "punjab"
 *               description:
 *                 type: string
 *                 example: "A campaign for summer promotions"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-08-31T23:59:59Z"
 *               questionList:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 example:
 *                   - "123e4567-e89b-12d3-a456-426614174000"
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
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               questionList:
 *                 type: array
 *                 items:
 *                   type: string
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
router.post(
    "/create",
    validateCreateOrganizationBody,
    OrganizationController.create
);

router.get("/get/:id", validateEditOrgParams, OrganizationController.get);
 
router.put("/update/:id",validateEditOrgParams, validateEditOrganizationBody, OrganizationController.update);
router.delete("/delete", validateEditOrgParams, OrganizationController.delete);

router.get("/list", validateListOrgQuery, OrganizationController.list);

export default router;
