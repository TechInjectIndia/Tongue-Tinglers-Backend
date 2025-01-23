import * as express from 'express';
import PendingOrderController from "../controllers/PendingOrderController";

const router = express.Router();

router.post('/create', PendingOrderController.create);
router.get('/get/:id', PendingOrderController.getPendingOrderById);
router.get('/getPendingOrderByAttributes', PendingOrderController.getPendingOrderByAttributes);
router.delete('/delete/:id', PendingOrderController.deleteAllPendingOrderByOrderId);

export default router;
