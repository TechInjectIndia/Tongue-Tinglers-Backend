import * as express from "express";
import { RawMaterialValidations } from "../validations/RawMaterialValidations";
import { RawMaterialController } from "../controller/RawMaterialController";

const apiInitialPath = "/raw-materials";
const rawMaterialRouter = express.Router();

rawMaterialRouter.post(apiInitialPath + "/create", RawMaterialValidations.validateCreate, RawMaterialController.create);

rawMaterialRouter.put(apiInitialPath + "/update/:id", RawMaterialValidations.validateUpdate, RawMaterialController.update);

rawMaterialRouter.delete(apiInitialPath + "/delete", RawMaterialValidations.validateDelete, RawMaterialController.delete);

rawMaterialRouter.get(apiInitialPath + "/", RawMaterialValidations.validateGetAll, RawMaterialController.getAll);

rawMaterialRouter.get(apiInitialPath + "/:id", RawMaterialValidations.validateGetById, RawMaterialController.getById);

export { rawMaterialRouter };