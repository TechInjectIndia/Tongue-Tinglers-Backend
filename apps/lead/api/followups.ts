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
 *     summary: Get today Follow Ups
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         default: "02/02/2024"
 *         required: true
 *         schema:
 *           type: string
 *         description: Date
 *       - in: query
 *         name: end_date
 *         default: "02/02/2024"
 *         required: true
 *         schema:
 *           type: string
 *         description: Date
 *     responses:
 *       '200':
 *         description: Today Follow Up retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Follow Up to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: FollowUps not found
 * 
 */

router.get("/", FollowUpsController.getTodayFollowUps);
// ====== FollowUps Ends ======

export default router;
