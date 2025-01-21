import * as express from 'express';
import PendingOrderController from "../controllers/PendingOrderController";

const router = express.Router();

router.post('/create', PendingOrderController.create);
router.delete('/:id', PendingOrderController.deleteAllPendingOrderByOrderId);

export default router;
