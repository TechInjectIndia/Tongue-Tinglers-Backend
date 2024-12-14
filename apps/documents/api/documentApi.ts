import * as express from 'express';
import {DocumentController} from "../controllers/documentController";
const router = express.Router();

const {createDocument, getDocument, getDocumentByUser} = DocumentController;

router.post('/create', createDocument);
router.get('/get/:id', getDocument);
router.get('/documents', getDocumentByUser);

export default router;