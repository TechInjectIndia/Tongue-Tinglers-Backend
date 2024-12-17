import * as express from 'express';
import {DocumentController} from "../controllers/documentController";
import {validateDocument, validateDocumentById} from "../validations/documentValidation";

const router = express.Router();

const {createDocument, getDocument, getDocumentByUser, updateDocument} = DocumentController;

router.post('/create', validateDocument, createDocument);
router.get('/get/:id', validateDocumentById, getDocument);
router.get('/documents', getDocumentByUser);
router.put('/update', validateDocument, updateDocument)

export default router;