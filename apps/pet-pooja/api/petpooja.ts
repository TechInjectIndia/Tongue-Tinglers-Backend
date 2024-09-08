import * as express from "express";
import PetPoojaController from "../controllers/petpooja";
const router = express.Router();

// ====== PetPooja Starts ======
/**
 * @swagger
 * /api/pet-pooja/get:
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

router.get("/get", PetPoojaController.get);
// ====== PetPooja Ends ======

export default router;
