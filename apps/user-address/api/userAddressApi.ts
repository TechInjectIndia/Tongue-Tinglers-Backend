import express from 'express';
import UserAddressController from '../controllers/UserAddressController';
import * as UserAddressValidation from '../validations/UserAddressValidations';

const router = express.Router();

const {
  validateCreateUserAddress,
  validateUpdateUserAddress,
  validateDeleteUserAddress,
} = UserAddressValidation;

// ====== User Address Routes ======

/**
 * @swagger
 *
 * /api/user-address:
 *   post:
 *     summary: Create a new user address
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - address
 *               - city
 *               - state
 *               - country
 *               - zipCode
 *               - isActive
 *             properties:
 *               title:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               gstin:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: User address created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *
 * /api/user-address/list:
 *   get:
 *     summary: Get all Address
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Address retrieved successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 * 
 * /api/user-address/{id}:
 *   get:
 *     summary: Get a user address by ID
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User address retrieved successfully
 *       '404':
 *         description: User address not found
 *       '401':
 *         description: Unauthorized
 *
 *   put:
 *     summary: Update a user address by ID
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: User address updated successfully
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: User address not found
 *       '401':
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a user address by ID
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: User address deleted successfully
 *       '404':
 *         description: User address not found
 *       '401':
 *         description: Unauthorized
 */

router.post('/', validateCreateUserAddress, UserAddressController.createUserAddress);
router.get("/list", UserAddressController.list);
router.get('/:id', UserAddressController.getUserAddressById);
router.put('/:id', validateUpdateUserAddress, UserAddressController.updateUserAddress);
router.delete('/:id', validateDeleteUserAddress, UserAddressController.deleteUserAddress);

export default router;
// ====== User Address Routes End ======
