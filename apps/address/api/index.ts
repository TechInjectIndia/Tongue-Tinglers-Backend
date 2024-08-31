import * as express from "express";
import AddressController from "../controllers/";
import * as AddressValidation from "../validations";

const router = express.Router();

const {
  validateCreateAddressBody,
  validateEditAddressBody,
  validateEditAddressParams,
  validateListAddressQuery,
  validateEditMultipleIdsBody,
} = AddressValidation;

// ====== Address Starts ======
/**
 * @swagger
 * /api/user/address/create:
 *   post:
 *     summary: Create a new Address
 *     tags: [Users > address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - street
 *              - city
 *              - state
 *              - postalCode
 *              - country
 *            properties:
 *              street:
 *                type: string
 *                default: street 
 *              city:
 *                type: string
 *                default: city
 *              state:
 *                type: string
 *                default: state
 *              postalCode:
 *                type: string
 *                default: postalCode
 *              country:
 *                type: string
 *                default: country
 *     responses:
 *       '200':
 *         description: Address created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/user/address/list?size={size}&skip={skip}:
 *   get:
 *     summary: Get all Address
 *     tags: [Users > address]
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
 *         description: Address retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/user/address/get/{id}:
 *   get:
 *     summary: Get a Address by ID
 *     tags: [Users > address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         default: 1
 *         schema:
 *           type: number
 *         description: ID of the Address to retrieve
 *     responses:
 *       '200':
 *         description: Address retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               description: ID of the Address to retrieve
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Address not found
 * 
 * /api/user/address/update/{id}:
 *   put:
 *     summary: Update a Address
 *     tags: [Users > address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Address to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - street
 *              - city
 *              - state
 *              - postalCode
 *              - country
 *            properties:
 *              street:
 *                type: string
 *                default: street 
 *              city:
 *                type: string
 *                default: city
 *              state:
 *                type: string
 *                default: state
 *              postalCode:
 *                type: string
 *                default: postalCode
 *              country:
 *                type: string
 *                default: country
 *     responses:
 *       '200':
 *         description: Address updated successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Address not found
 * 
 * /api/user/address/delete:
 *   delete:
 *     summary: Delete a Address
 *     tags: [Users > address]
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
 *         description: Address deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Address not found
 */
router.post("/create", validateCreateAddressBody, AddressController.create);
router.get("/list", validateListAddressQuery, AddressController.list);
router.get("/get/:id", validateEditAddressParams, AddressController.get);
router.put("/update/:id", validateEditAddressParams, validateEditAddressBody, AddressController.update);
router.delete("/delete", validateEditMultipleIdsBody, AddressController.delete);

export default router;
