import { AgreementDocRepo } from './../repos/agreementDocRepo';
import * as express from 'express';
import AgreementDocController from '../controllers/agreementDocController';

const { createAgreementDoc, getAgreementDoc } = AgreementDocController

const router = express.Router();

router.post('/create', createAgreementDoc);
router.get('/get/:id', getAgreementDoc);

export default router