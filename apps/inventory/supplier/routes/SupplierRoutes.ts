import * as express from "express";
import { SupplierValidations } from "../validations/SupplierValidations";
import { SupplierController } from "../controller/SupplierController";

const apiInitialPath = "/suppliers";
const supplierRouter = express.Router();

supplierRouter.post(apiInitialPath + "/create", SupplierValidations.validateCreate, SupplierController.create);

supplierRouter.put(apiInitialPath + "/update/:id", SupplierValidations.validateUpdate, SupplierController.update);

supplierRouter.delete(apiInitialPath + "/delete", SupplierValidations.validateDelete, SupplierController.delete);

supplierRouter.get(apiInitialPath + "/search", SupplierValidations.validateSearch, SupplierController.search);

supplierRouter.get(apiInitialPath + "/", SupplierValidations.validateGetAll, SupplierController.getAll);

supplierRouter.get(apiInitialPath + "/:id", SupplierValidations.validateGetById, SupplierController.getById);

export { supplierRouter };