import * as express from "express";
import { PurchaseInvoiceValidations } from "../validations/PurchaseInvoiceValidations";
import { PurchaseInvoiceController } from "../controller/PurchaseInvoiceController";

const apiInitialPath = "/purchase-invoices";
const purchaseInvoicesRouter = express.Router();

purchaseInvoicesRouter.post(apiInitialPath + "/create", PurchaseInvoiceValidations.validateCreate, PurchaseInvoiceController.create);

// PurchaseInvoicesRouter.put(apiInitialPath + "/update/:id", PurchaseInvoiceValidations.validateUpdate, PurchaseInvoiceController.update);

// PurchaseInvoicesRouter.delete(apiInitialPath + "/delete", PurchaseInvoiceValidations.validateDelete, PurchaseInvoiceController.delete);

// PurchaseInvoicesRouter.get(apiInitialPath + "/", PurchaseInvoiceValidations.validateGetAll, PurchaseInvoiceController.getAll);

// PurchaseInvoicesRouter.get(apiInitialPath + "/:id", PurchaseInvoiceValidations.validateGetById, PurchaseInvoiceController.getById);

export { purchaseInvoicesRouter };