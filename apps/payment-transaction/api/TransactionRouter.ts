import * as express from "express";
import transactionController from "../controllers/transactionController";
import { validateListLogsParams } from "../validations/logsValidator";

const transactionRouter = express.Router();

transactionRouter.get("/list", validateListLogsParams, transactionController.getAllLogs);


export { transactionRouter };

