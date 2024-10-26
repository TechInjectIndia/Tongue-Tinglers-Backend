import * as express from "express";
import WebLeadController from "../controllers/web-lead";
import { auth } from '../../../middlewares/auth';

const router = express.Router();

import {
  validateCreateLeadBody,
  validateListLeadsQuery,
} from "../validations/web-lead";

// ====== Web Lead Starts ======

/**
 * @swagger
 * /api/lead/create:
 *   post:
 *     summary: Create a new Lead
 *     tags: [Frontend > Lead]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - city
 *              - state
 *              - zip_code
 *              - country
 *              - phoneNumber
 *              - address
 *              - additional_info
 *            properties:
 *              firstName:
 *                type: string
 *                default: lead 
 *              lastName:
 *                type: string
 *                default: lead 
 *              email:
 *                type: text
 *                default: email
 *              city:
 *                type: text
 *                default: city
 *              state:
 *                type: text
 *                default: state
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              country:
 *                type: text
 *                default: country
 *              phoneNumber:
 *                type: text
 *                default: phone_number
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *     responses:
 *       '200':
 *         description: Lead submit successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post("/create", validateCreateLeadBody, WebLeadController.create);

/**
 * @swagger
 * /api/lead/list:
 *   get:
 *     summary: List Leads
 *     tags: [Frontend > Lead]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search term to filter leads by first name
 *         schema:
 *           type: string
 *       - name: offset
 *         in: query
 *         required: false
 *         description: Offset for pagination
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: filter
 *         in: query
 *         required: false
 *         description: filter via "this_week", "last_week", "this_month", "last_month", "this_year", "last_year","custom"
 *         schema:
 *           type: string
 *           example: this_week
 *       - name: sorting
 *         in: query
 *         required: false
 *         description: Sorting options, e.g. 'name ASC, createdAt DESC'
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved leads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of leads
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       zip_code:
 *                         type: string
 *                       country:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       address:
 *                         type: string
 *                       additional_info:
 *                         type: string
 *       '400':
 *         description: Invalid query parameters
 *       '401':
 *         description: Unauthorized
 */
router.get("/list", auth, validateListLeadsQuery, WebLeadController.list);

// ====== Web Lead Ends ======

export default router;
