import * as express from "express";
import { ItemUnitValidations } from "../validations/ItemUnitValidations";
import { ItemUnitController } from "../controller/ItemUnitController";

const apiInitialPath = "/item-units";
const itemUnitRouter = express.Router();

itemUnitRouter.post(apiInitialPath + "/create", ItemUnitValidations.validateCreate, ItemUnitController.create);

itemUnitRouter.put(apiInitialPath + "/update/:id", ItemUnitValidations.validateUpdate, ItemUnitController.update);

itemUnitRouter.delete(apiInitialPath + "/delete", ItemUnitValidations.validateDelete, ItemUnitController.delete);

itemUnitRouter.get(apiInitialPath + "/", ItemUnitValidations.validateGetAll, ItemUnitController.getAll);

itemUnitRouter.get(apiInitialPath + "/:id", ItemUnitValidations.validateGetById, ItemUnitController.getById);

export { itemUnitRouter };