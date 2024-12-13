import * as express from 'express';
import {DocumentController} from "../controllers/documentController";
const router = express.Router();

const {createDocument} = DocumentController;

router.post('/create', createDocument);

export default router;