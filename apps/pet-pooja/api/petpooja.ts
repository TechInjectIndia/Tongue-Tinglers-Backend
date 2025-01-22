import * as express from "express";
import PetPoojaController from "../controllers/petpooja";

const petPoojaRouter = express.Router();

// ====== Testimonials Starts ======
/**
 * @swagger
 * /api/pet-pooja/place-order:
 *   get:
 *     summary: PetPooja order
 *     tags: [PetPooja]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: type
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: order not found
 * 
 * /api/pet-pooja/inventory:
 *   get:
 *     summary: PetPooja inventory
 *     tags: [PetPooja]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: inventory retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: type
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: inventory not found
 * 
 */

petPoojaRouter.get("/place-order", PetPoojaController.newOrderPlaced);
petPoojaRouter.get("/inventory", PetPoojaController.processAndSaveStockData);
petPoojaRouter.post("/orders-webhook", PetPoojaController.callOrdersWebHook);
petPoojaRouter.post("/orders-callback", PetPoojaController.callOrdersWebHook);

export { petPoojaRouter };