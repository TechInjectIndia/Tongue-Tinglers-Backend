import * as express from "express";
import FollowUpsController from "../controllers/followups";
import * as FollowUpsValidation from "../validations/followups";
import { hasPermission } from '../../../middlewares';

const router = express.Router();
const followUpsController = new FollowUpsController(); // Instantiate the controller

/**
 * @swagger
 * /api/admin/followup/today/{assignedTo}:
 *   get:
 *     summary: Get today's follow-ups for a specific assigned user
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: assignedTo
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the assigned user
 *     responses:
 *       '200':
 *         description: Follow-ups retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   followDetails:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         followedDate:
 *                           type: string
 *                           format: date
 *                         followedBy:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                         notes:
 *                           type: string
 *                         description:
 *                           type: string
 *                         status:
 *                           type: string
 *       '400':
 *         description: Bad Request - Assigned user ID is required
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Follow-ups not found
 */

router.get("/today/:assignedTo", hasPermission('followup', 'read'), FollowUpsController.getTodayFollowUps);

/**
 * @swagger
 * /api/admin/followup/today:
 *   get:
 *     summary: Get all leads with follow-ups scheduled for today
 *     tags: [Admin > Lead > Follow Ups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Leads with today's follow-ups retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   followDetails:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         followedDate:
 *                           type: string
 *                           format: date
 *                         followedBy:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                         notes:
 *                           type: string
 *                         description:
 *                           type: string
 *                         status:
 *                           type: string
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No leads found with today's follow-ups
 */
router.get("/today", hasPermission('followup', 'read'), FollowUpsController.getLeadsByTodayFollowUps);

export default router;
