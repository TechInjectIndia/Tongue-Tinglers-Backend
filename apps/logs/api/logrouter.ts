import * as express from "express";
import logsController from "../controllers/logsController";
import { validateListLogsParams } from "../validations/logsValidator";

const logRouter = express.Router();

logRouter.get("/list", validateListLogsParams, logsController.getAllLogs);
logRouter.get(
    "/getLogs",
    logsController.getLogsModelNameAndId,
);

export { logRouter };

