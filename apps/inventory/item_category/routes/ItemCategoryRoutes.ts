import * as express from "express";
import { ItemCategoryValidations } from "../validations/ItemCategoryValidations";
import { ItemCategoryController } from "../controller/ItemCategoryController";

const apiInitialPath = "/item-categories";
const itemCategoryRouter = express.Router();

itemCategoryRouter.post(apiInitialPath + "/create", ItemCategoryValidations.validateCreate, ItemCategoryController.create);

itemCategoryRouter.put(apiInitialPath + "/update/:id", ItemCategoryValidations.validateUpdate, ItemCategoryController.update);

itemCategoryRouter.delete(apiInitialPath + "/delete", ItemCategoryValidations.validateDelete, ItemCategoryController.delete);

itemCategoryRouter.get(apiInitialPath + "/search", ItemCategoryValidations.validateGetAll, ItemCategoryController.search);

itemCategoryRouter.get(apiInitialPath + "/", ItemCategoryValidations.validateGetAll, ItemCategoryController.getAll);

itemCategoryRouter.get(apiInitialPath + "/:id", ItemCategoryValidations.validateGetById, ItemCategoryController.getById);

export { itemCategoryRouter };