import * as express from "express";
import PaymentsController from "../controllers";
import * as PaymentsValidation from "../validations";

const router = express.Router();

const {
  validateGenerateLinkBody
} = PaymentsValidation;

// ====== Payments Starts ======
router.post("/generate-link", validateGenerateLinkBody, PaymentsController.generatePaymentLink);
// ====== Payments Ends ======

export default router;
