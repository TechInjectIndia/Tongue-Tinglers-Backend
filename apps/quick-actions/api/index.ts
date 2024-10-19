
import express from 'express';
import emailRouter from "../api/email";
import whatsAppRouter from "../api/whatsapp";

const router = express.Router();

router.use("/email", emailRouter);
router.use("/whatsapp", whatsAppRouter);

export default router;
