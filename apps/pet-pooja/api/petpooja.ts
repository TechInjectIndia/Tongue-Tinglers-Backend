import * as express from "express";
import PetPoojaController from "../controllers/petpooja";
const router = express.Router();

// ====== PetPooja Starts ======
/**
 * @swagger
 * /api/pet-pooja/franchise/order-placed:
 *   get:
 *     summary: Get PetPooja response
 *     tags: [PetPooja]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       '200':
 *         description: retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: PetPooja not found
 * 
 * /api/pet-pooja/franchise/inventory:
 *   get:
 *     summary: Get PetPooja response
 *     tags: [PetPooja]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       '200':
 *         description: retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: PetPooja not found
 */

router.get("/franchise/place-order", PetPoojaController.newOrderPlaced);
router.get("/franchise/inventory", PetPoojaController.getInventory);
// ====== PetPooja Ends ======

export default router;
