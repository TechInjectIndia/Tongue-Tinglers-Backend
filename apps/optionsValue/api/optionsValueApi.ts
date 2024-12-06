import * as express from 'express';
import OptionsValueController from '../controllers/optionsValueController';

const router = express.Router();

const {createOptionsValue, getAllOptionsValue}  = OptionsValueController;

router.post('/create', createOptionsValue);
router.get('/list', getAllOptionsValue);

export default router;
