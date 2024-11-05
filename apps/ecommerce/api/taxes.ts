import express from 'express';
import TaxController from '../controllers/TaxController';

const router = express.Router();

/**
 * @swagger
 * /api/admin/tax:
 *   get:
 *     summary: Retrieve a list of all taxes
 *     tags: [Admin > Ecommerce > Taxes]
 *     responses:
 *       200:
 *         description: List of taxes retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', TaxController.getAll);

/**
 * @swagger
 * /api/admin/tax/{id}:
 *   get:
 *     summary: Retrieve a tax by ID
 *     tags: [Admin > Ecommerce > Taxes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tax ID
 *     responses:
 *       200:
 *         description: Tax retrieved successfully
 *       404:
 *         description: Tax not found
 */
router.get('/:id', TaxController.getById);

/**
 * @swagger
 * /api/admin/tax:
 *   post:
 *     summary: Create a new tax
 *     tags: [Admin > Ecommerce > Taxes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rate:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *             example:
 *               name: VAT
 *               rate: 5.00
 *               isActive: true
 *     responses:
 *       201:
 *         description: Tax created successfully
 */
router.post('/', TaxController.create);

/**
 * @swagger
 * /api/admin/tax/{id}:
 *   put:
 *     summary: Update an existing tax
 *     tags: [Admin > Ecommerce > Taxes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tax ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rate:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *             example:
 *               name: VAT
 *               rate: 5.50
 *               isActive: true
 *     responses:
 *       200:
 *         description: Tax updated successfully
 *       404:
 *         description: Tax not found
 */
router.put('/:id', TaxController.update);

/**
 * @swagger
 * /api/admin/tax/{id}:
 *   delete:
 *     summary: Delete a tax
 *     tags: [Admin > Ecommerce > Taxes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tax ID
 *     responses:
 *       204:
 *         description: Tax deleted successfully
 *       404:
 *         description: Tax not found
 */
router.delete('/:id', TaxController.delete);

export default router;
