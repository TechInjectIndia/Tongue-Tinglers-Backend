// import * as express from "express";
// import RetortAnalyticsController from "../../controllers/retort-analytics";
// import * as AnalyticsValidation from "../../validations/retort-analytics";

// const router = express.Router();

// const {
//   validateListAnalyticsQuery,
// } = AnalyticsValidation;

// // ====== Analytics Retort Starts ======
// /**
//  * @swagger
//  * /api/admin/analytics/retort-supply?range={range}:
//  *   get:
//  *     summary: Get analytics
//  *     tags: [Admin > Analytics > Retort]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: range
//  *         default: Week
//  *         required: true
//  *         schema:
//  *           type: string
//  *           enum: [ "Week", "Month", "Year"]
//  *         description: Get order analytics
//  *     responses:
//  *       '200':
//  *         description: Analytics data retrieved successfully.
//  *       '400':
//  *         description: Invalid request body
//  *       '401':
//  *         description: Unauthorized
//  */
// router.get("/", validateListAnalyticsQuery, RetortAnalyticsController.list);
// // ====== Analytics Retort Ends ======

// export default router;
