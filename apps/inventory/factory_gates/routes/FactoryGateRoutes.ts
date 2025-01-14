import * as express from "express";
import { FactoryGateValidations } from "../validations/FactoryGateValidations";
import { FactoryGateController } from "../controller/FactoryGateController";

const apiInitialPath = "/factory-gates";
const factoryGatesRouter = express.Router();

factoryGatesRouter.post(apiInitialPath + "/create", FactoryGateValidations.validateCreate, FactoryGateController.create);

factoryGatesRouter.put(apiInitialPath + "/update/:id", FactoryGateValidations.validateUpdate, FactoryGateController.update);

factoryGatesRouter.delete(apiInitialPath + "/delete", FactoryGateValidations.validateDelete, FactoryGateController.delete);

factoryGatesRouter.get(apiInitialPath + "/", FactoryGateValidations.validateGetAll, FactoryGateController.getAll);

factoryGatesRouter.get(apiInitialPath + "/:id", FactoryGateValidations.validateGetById, FactoryGateController.getById);

export { factoryGatesRouter };