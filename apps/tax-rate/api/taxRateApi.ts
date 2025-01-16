import * as express from 'express';
import TaxRateController from '../controllers/TaxRateController';
const router = express.Router();

router.post('/create', TaxRateController.create);
router.get('/list', TaxRateController.getAll);
router.get('/get/:id', TaxRateController.getById);
router.put('/update/:id', TaxRateController.update);
router.delete('/delete', TaxRateController.delete);

export default router;