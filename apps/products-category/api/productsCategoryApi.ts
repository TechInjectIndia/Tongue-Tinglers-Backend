import * as express from 'express';
import ProductsCategoryController from '../controllers/productsCategoryController';
import { validateCreateProductsCategory, validateDeleteProductsCategory, validateGetAllProductsCategory, validateGetProductsCategoryById, validateGetProductsCategoryBySlug, validateUpdateProductsCategory, validateUpdateStatus } from '../validations/productsCategoryValidation';
// import { validateCreateProduct, validateProductList, validateProductById, validateUpdateProduct, validateDeleteProduct, validateChangeProductStatus } from "../validations/productValidations";
const {createProductsCategory, deleteProductsCategory, getProductsCategoryById, getProductsCategoryBySlug, updateProductsCategory, updateStatus} = ProductsCategoryController
const router = express.Router();

router.post('/create', validateCreateProductsCategory,createProductsCategory);
// router.get('/list', validateGetAllProductsCategory,getAllProductsCategory);
router.get('/:id', validateGetProductsCategoryById,getProductsCategoryById);
router.get('/slug/:slug', validateGetProductsCategoryBySlug,getProductsCategoryBySlug);
router.put('/update/:id',validateGetProductsCategoryById,validateUpdateProductsCategory ,updateProductsCategory);
router.put('/delete/:id',validateGetProductsCategoryById,validateDeleteProductsCategory,deleteProductsCategory);
router.put('/status/:id', validateGetProductsCategoryById,validateUpdateStatus, updateStatus);

export default router;