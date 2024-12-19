import * as express from 'express';
import AgreementDocController from '../controllers/agreementDocController';
import { validateCreateAgreementDoc, validateGetAgreementDocById, validateGetAgreementDoc, validateUpdateAgreementDoc, validateGetAllAgreementDoc } from "../validations/agreementDocValidation";

const { createAgreementDoc, getAgreementDocById, getAgreementDoc, getAllAgreementDoc, updateAgreementDoc } = AgreementDocController

const router = express.Router();

router.post('/create', validateCreateAgreementDoc, createAgreementDoc);
router.get('/get/:id', validateGetAgreementDocById, getAgreementDocById);
router.get('/getByEntity', validateGetAgreementDoc, getAgreementDoc);
router.get('/getAll', validateGetAllAgreementDoc, getAllAgreementDoc);
router.put('/update/:id', validateGetAgreementDocById, validateUpdateAgreementDoc, updateAgreementDoc);

export default router