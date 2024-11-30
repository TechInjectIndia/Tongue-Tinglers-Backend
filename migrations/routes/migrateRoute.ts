import * as express from "express";
import { migrate } from "../services/migrationService";
const router = express.Router();

router.post('/migrate', migrate);

export default router;