import * as express from "express";
import MenuController from "../controllers/menu";
import * as MenuValidation from "../validations/menu";

const router = express.Router();

const {
  validateCreateMenuBody,
  validateEditMenuBody,
  validateEditMenuParams,
  validateListMenuQuery,
  validateEditMultipleIdsBody,
} = MenuValidation;

// ====== Menu Starts ======
/**
 * @swagger
 * /api/admin/menu/create:
 *   post:
 *     summary: Create a new Menu
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: AdminMenu 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
 *                default: 0
 *     responses:
 *       '200':
 *         description: Menu created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/admin/menu/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Menu
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         default: 10
 *         required: true
 *         schema:
 *           type: integer
 *         description: Size of the retreived data
 *       - in: query
 *         name: skip
 *         default: 0
 *         required: true
 *         schema:
 *           type: integer
 *         description: How many Rows want to skip
 *     responses:
 *       '200':
 *         description: Menu retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * /api/admin/menu/get/{id}:
 *   get:
 *     summary: Get a Menu by ID
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: string
 *         description: ID of the Menu to retrieve
 *     responses:
 *       '200':
 *         description: Menu retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: ID of the Menu to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu not found
 * 
 * /api/admin/menu/update/{id}:
 *   put:
 *     summary: Update a Menu
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Menu to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - city
 *              - zip_code
 *              - state
 *              - country
 *              - phone_number
 *              - email
 *              - address
 *              - additional_info
 *              - status
 *            properties:
 *              name:
 *                type: string
 *                default: Menu 
 *              city:
 *                type: text
 *                default: city
 *              zip_code:
 *                type: text
 *                default: zip_code
 *              state:
 *                type: text
 *                default: state
 *              country:
 *                type: text
 *                default: country
 *              phone_number:
 *                type: text
 *                default: phone_number
 *              email:
 *                type: text
 *                default: email
 *              address:
 *                type: text
 *                default: address
 *              additional_info:
 *                type: text
 *                default: additional_info
 *              status:
 *                type: boolean
 *                default: 0 
 *     responses:
 *       '200':
 *         description: Menu updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu not found
 * 
 * /api/admin/menu/delete:
 *   delete:
 *     summary: Delete a Menu
 *     tags: [Admin > Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - ids
 *            properties:
 *              ids:
 *                type: array
 *                default: [1]
 *     responses:
 *       '200':
 *         description: Menu deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Menu not found
 */
router.post("/create", validateCreateMenuBody, MenuController.add);
router.get("/list", validateListMenuQuery, MenuController.list);
router.get("/get/:id", validateEditMenuParams, MenuController.get);
router.put("/update/:id", validateEditMenuParams, validateEditMenuBody, MenuController.update);
router.delete("/delete", validateEditMultipleIdsBody, MenuController.delete);
// ====== Menu Ends ======

export default router;
