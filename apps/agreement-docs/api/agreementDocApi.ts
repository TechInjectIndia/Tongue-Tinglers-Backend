import { AgreementDocRepo } from './../repos/agreementDocRepo';
import * as express from 'express';
import AgreementDocController from '../controllers/agreementDocController';

const { createAgreementDoc } = AgreementDocController

const router = express.Router();

router.post('/create', createAgreementDoc);

export default router