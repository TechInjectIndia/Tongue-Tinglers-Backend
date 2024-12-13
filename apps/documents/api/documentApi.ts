import * as express from 'express';
import {DocumentController} from "../controllers/documentController";
const router = express.Router();

const {createDocument, getDocument} = DocumentController;

router.post('/create', createDocument);
router.get('/get/:id', getDocument);

export default router;