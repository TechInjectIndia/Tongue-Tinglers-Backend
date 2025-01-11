import * as express from 'express';
import PendingOrderController from '../controllers/PendingOrderController';

const router = express.Router();

router.post('/create', PendingOrderController.prototype.create);
router.delete('/:id', PendingOrderController.prototype.deleteAllPendingOrderByOrderId);

export default router;