import * as express from "express";
import { StorageLocationValidations } from "../validations/StorageLocationValidations";
import { StorageLocationController } from "../controller/StorageLocationController";

const apiInitialPath = "/storage-locations";
const storageLocationRouter = express.Router();

storageLocationRouter.post(apiInitialPath + "/create", StorageLocationValidations.validateCreate, StorageLocationController.create);

storageLocationRouter.put(apiInitialPath + "/update/:id", StorageLocationValidations.validateUpdate, StorageLocationController.update);

storageLocationRouter.delete(apiInitialPath + "/delete", StorageLocationValidations.validateDelete, StorageLocationController.delete);

storageLocationRouter.get(apiInitialPath + "/", StorageLocationValidations.validateGetAll, StorageLocationController.getAll);

storageLocationRouter.get(apiInitialPath + "/:id", StorageLocationValidations.validateGetById, StorageLocationController.getById);

export { storageLocationRouter };