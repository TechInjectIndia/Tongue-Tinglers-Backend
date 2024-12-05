import * as express from 'express';
import CartDetailController from '../controllers/cartDetailController';

const {getCartDetailByUserId} = CartDetailController;

const router = express.Router();

router.get('/detail', getCartDetailByUserId);

export default router;