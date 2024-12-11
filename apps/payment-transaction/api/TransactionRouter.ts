import * as express from "express";
import logsController from "../controllers/logsController";
import { validateListLogsParams } from "../validations/logsValidator";

const transactionRouter = express.Router();

transactionRouter.get("/list", validateListLogsParams, logsController.getAllLogs);


export { transactionRouter };

