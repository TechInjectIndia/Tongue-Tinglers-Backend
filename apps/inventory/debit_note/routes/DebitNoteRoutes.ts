import * as express from "express";
import { DebitNoteValidations } from "../validations/DebitNoteValidations";
import { DebitNoteController } from "../controller/DebitNoteController";

const apiInitialPath = "/debit-notes";
const debitNoteRouter = express.Router();


debitNoteRouter.put(apiInitialPath + "/mark-paid", DebitNoteValidations.validateMarkPaid, DebitNoteController.markPaid);



debitNoteRouter.get(apiInitialPath + "/", DebitNoteValidations.validateGetAll, DebitNoteController.getAll);

debitNoteRouter.get(apiInitialPath + "/:id", DebitNoteValidations.validateGetById, DebitNoteController.getByPurchasInvoiceId);

export { debitNoteRouter as DebitNoteRouter };