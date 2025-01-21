import * as express from 'express';
import TaxRateController from '../controllers/TaxRateController';
const router = express.Router();

import {validateCreateTaxRatePayload, validateGetTaxRateSchema, validateListTaxRateSchema, validateUpdateTaxRateSchema} from "../validations/taxRateValidation"

router.post('/create', validateCreateTaxRatePayload,TaxRateController.create);
router.get('/list', validateListTaxRateSchema, TaxRateController.getAll);
router.get('/get/:id', validateGetTaxRateSchema, TaxRateController.getById);
router.put('/update/:id', validateGetTaxRateSchema, validateCreateTaxRatePayload, TaxRateController.update);
router.delete('/delete/:id', validateGetTaxRateSchema, TaxRateController.delete);

export default router;