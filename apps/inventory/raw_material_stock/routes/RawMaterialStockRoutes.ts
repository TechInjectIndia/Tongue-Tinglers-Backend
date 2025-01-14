import * as express from "express";
import { RawMaterialStockValidations } from "../validations/RawMaterialStockValidations";
import { RawMaterialStockController } from "../controller/RawMaterialStockController";

const apiInitialPath = "/raw-materials-stock";
const rawMaterialStockRouter = express.Router();


rawMaterialStockRouter.post(apiInitialPath + "/receive", RawMaterialStockValidations.validateReceiveStock, RawMaterialStockController.receiveStock);

rawMaterialStockRouter.get(apiInitialPath + "/stock-in", RawMaterialStockValidations.validateGetAll, RawMaterialStockController.getStockIn);

rawMaterialStockRouter.get(apiInitialPath + "/", RawMaterialStockValidations.validateGetAll, RawMaterialStockController.getAll);

// rawMaterialStockRouter.get(apiInitialPath + "/:id", RawMaterialStockValidations.validateGetById, RawMaterialStockController.getById);

export { rawMaterialStockRouter };