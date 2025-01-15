import * as express from "express";
import B2CUserAddressController from "../controllers/B2CUserAddressController";
const router = express.Router();

router.post('/create', B2CUserAddressController.save);
router.get('/getAddressByUserId', B2CUserAddressController.getAddressByUserId);
router.delete('/delete/:id', B2CUserAddressController.deleteAddressById);

export default router;