// import * as express from "express";

// import * as CampaignSubmissionsValidation from "../validations/CampaignSubmissionsValidation";

// const router = express.Router();

// const {
//   validateEditCampaignParams,
//   validateListCampaignQuery,
//   validateDeleteMultipleIdsBody,
// } = CampaignSubmissionsValidation;

// /**
//  * @swagger
//  * /api/admin/campaign-submissions/list:
//  *   get:
//  *     summary: Get all
//  *     tags: [Campaign Submissions]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: size
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: Size of the retrieved data
//  *       - in: query
//  *         name: skip
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: How many rows to skip
//  *     responses:
//  *       '200':
//  *         description: Data retrieved successfully
//  *       '400':
//  *         description: Invalid request
//  *       '401':
//  *         description: Unauthorized
//  */
// router.get("/list", validateListCampaignQuery, CampaignSubmissionsController.list);

// /**
//  * @swagger
//  * /api/admin/campaign-submissions/get/{id}:
//  *   get:
//  *     summary: Get a submission by ID
//  *     tags: [Campaign Submissions]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the submission
//  *     responses:
//  *       '200':
//  *         description: Submission retrieved successfully
//  *       '404':
//  *         description: Submission not found
//  */
// router.get("/get/:id", validateEditCampaignParams, CampaignSubmissionsController.get);

// /**
//  * @swagger
//  * /api/admin/campaign-submissions/delete:
//  *   delete:
//  *     summary: Delete multiple submissions
//  *     tags: [Campaign Submissions]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - ids
//  *             properties:
//  *               ids:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 example: ["1", "2"]
//  *     responses:
//  *       '200':
//  *         description: Submissions deleted successfully
//  */
// router.delete("/delete", validateDeleteMultipleIdsBody, CampaignSubmissionsController.delete);

// export default router;
