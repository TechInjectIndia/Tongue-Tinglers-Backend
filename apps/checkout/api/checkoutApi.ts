import * as express from 'express';

const router = express.Router();

router.get('/getCart', getCartDetailByUserId);

export default router;
