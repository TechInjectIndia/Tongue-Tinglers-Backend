import * as express from "express";
import FollowUpsController from "../controllers/followups";
import * as FollowUpsValidation from "../validations/followups";

const router = express.Router();

const {
  validateTodayFollowUpsParams,
} = FollowUpsValidation;

// ====== FollowUps Starts ======
/**
 * @swagger
 * 
 * /api/admin/followup?start_date={start_date}&end_date={end_date}:
 *   get:
 *     summary: Get Follow Up Date Wise
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         default: "2018-08-28"
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: '2018-08-28'
 *         description: Start Date
 *       - in: query
 *         name: end_date
 *         default: "2018-08-28"
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: '2018-08-28'
 *         description: End Date
 *     responses:
 *       '200':
 *         description: Follow Up retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Follow Ups to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: FollowUps not found
 * 
 */

router.get("/", validateTodayFollowUpsParams, FollowUpsController.getTodayFollowUps);
// ====== FollowUps Ends ======

export default router;
