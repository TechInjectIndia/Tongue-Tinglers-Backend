import * as express from 'express';
import OptionsValueController from '../controllers/optionsValueController';

const router = express.Router();

const {createOptionsValue}  = OptionsValueController;

router.post('/create', createOptionsValue);

export default router;
