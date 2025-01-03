import {get} from "lodash";
import {
    BaseProductsCategory,
    Pagination,
    ProductsCategory
} from '../../../interfaces/products_category'
import RepoProvider from "../../RepoProvider";
import {sendResponse} from "../../../libraries";
import {RESPONSE_TYPE, SUCCESS_MESSAGE} from "../../../constants";
import {Request, Response} from "express";

export default class ProductsCategoryController {

    static async createProductsCategory(req: Request, res: Response) {
        try {
            const payload: any = req?.body;
            const user_id = <number>get(req, "user_id");
            if (!user_id || isNaN(user_id)) {
                throw Error(
                    'Missing user_id or isNaN');
            }

            const product = {
                ...payload,
                createdBy: user_id,
            };
            const productsCategoryDetails = await RepoProvider.productsCategoryRepo.createProductsCategory(
                product);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        productsCategoryDetails,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

    static async getProductsCategoryById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const productsCategory: ProductsCategory = await RepoProvider.productsCategoryRepo.getProductsCategoryById(
                id);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        productsCategory,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

    static async getProductsCategoryBySlug(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            const productsCategory: ProductsCategory = await RepoProvider.productsCategoryRepo.getProductsCategoryBySlug(
                slug);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        productsCategory,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

    static async getAllProductsCategory(req: Request, res: Response) {
        try {
            let page = parseInt(<string>get(req.query, 'page', '1'));
            if (isNaN(page)) page = 1;
            let limit = parseInt(<string>get(req.query, 'limit', '10'));
            if (isNaN(limit)) limit = 10;
            const search = <string>get(req.query, 'search', '');


            const productsCategory = await RepoProvider.productsCategoryRepo.getAllProductsCategory(
                page, limit, search);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        {
                            ...productsCategory,
                            currentPage: page,
                        }
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

    static async updateProductsCategory(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const user_id = get(req, "user_id", 0);
        
            const productsCategory: ProductsCategory = await RepoProvider.productsCategoryRepo.updateProductsCategory(
                payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        productsCategory,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

    static async deleteProductsCategory(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const productsCategory: ProductsCategory = await RepoProvider.productsCategoryRepo.deleteProductsCategory(
                id);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        productsCategory,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

    static async updateStatus(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload = req.body;
            payload.id = id;
            const productsCategory: ProductsCategory = await RepoProvider.productsCategoryRepo.changeStatus(
                payload);
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        productsCategory,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while fetching products.'),
            );
        }
    }

}
