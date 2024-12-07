import * as express from 'express';
import ProductOptionsController from '../controllers/productOptionsController';
import {validateCreateProductOptions,validateGetProductOptionById, validateUpdatePrice, validateUpdateProductOptions, validateUpdateStatus, validateUpdateStock} from "../validations/productOptionValidations";
const router = express.Router();

const {createProductOptions, updatePrice, updateStock, updateStatus, getProductOptionsById, updateProductOptions, getByProductId}  = ProductOptionsController;

router.post('/create',validateCreateProductOptions, createProductOptions)
router.get('/:id', validateGetProductOptionById, getProductOptionsById)
router.get('/product/:id', getByProductId)
router.put('/update/:id',validateGetProductOptionById, validateUpdateProductOptions, updateProductOptions)
router.put('/update-price/:id',validateGetProductOptionById, validateUpdatePrice, updatePrice)
router.put('/update-stock/:id', validateGetProductOptionById, validateUpdateStock , updateStock)
router.put('/update-status/:id', validateGetProductOptionById, validateUpdateStatus, updateStatus)

export default router;