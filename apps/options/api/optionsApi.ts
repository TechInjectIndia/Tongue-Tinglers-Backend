import * as express from 'express';
import OptionsController from '../controllers/optionsController';

const router = express.Router();

const {createOptions}  = OptionsController;

router.post('/create', createOptions);

export default router;
