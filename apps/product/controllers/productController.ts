import { get } from "lodash";
import { BaseProduct, Pagination, Product } from "../../../interfaces/products";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Request, Response } from "express";
export default class ProductController {
  static async createProduct(req: Request, res: Response) {
    const payload: any = req?.body;

    const user_id = get(req, "user_id", 0);
    const product: BaseProduct = {
      ...payload,
      createdBy: user_id,
    };

    const productDetails = await RepoProvider.ProductRepo.create(product);
    return res
      .status(200)
      .send(
        sendResponse(
          RESPONSE_TYPE.SUCCESS,
          SUCCESS_MESSAGE.CREATED,
          productDetails
        )
      );
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page, 0) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const search = (req.query.search as string) || ""; // For text search
      const filters = (req.query.filters as string) || "";

      // Parse filters into an object
      let filterObj = {};
      if (filters) {
        try {
          filterObj = JSON.parse(filters);
        } catch (error) {
          return res
            .status(400)
            .send(
              sendResponse(
                RESPONSE_TYPE.ERROR,
                "Invalid filter format. It should be a valid JSON string."
              )
            );
        }
      }
      const products: Pagination<Product> =
        await RepoProvider.ProductRepo.getAll(page, limit, search, filterObj);
      return res.status(200).send(
        sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, {
          ...products,
          currentPage: page,
        })
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          sendResponse(
            RESPONSE_TYPE.ERROR,
            "An error occurred while fetching products."
          )
        );
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 0);
      const product: Product = await RepoProvider.ProductRepo.getById(id);
      return res
        .status(200)
        .send(
          sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, product)
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          sendResponse(
            RESPONSE_TYPE.ERROR,
            "An error occurred while fetching products."
          )
        );
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 0);
      const payload: Product = req.body;
      payload.id = id;
      const user_id = get(req, "user_id", 0);
      payload.updatedBy = user_id;
      const product: Product = await RepoProvider.ProductRepo.update(payload);
      return res
        .status(200)
        .send(
          sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, product)
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          sendResponse(
            RESPONSE_TYPE.ERROR,
            "An error occurred while fetching products."
          )
        );
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 0);

      const product: Product | null = await RepoProvider.ProductRepo.delete(id);
      return res
        .status(200)
        .send(
          sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED, product)
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          sendResponse(
            RESPONSE_TYPE.ERROR,
            "An error occurred while fetching products."
          )
        );
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 0);
      const payload = req.body;
      payload.id = id;
      const product: Product = await RepoProvider.ProductRepo.changeStatus(
        payload
      );
      return res
        .status(200)
        .send(
          sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, product)
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send(
          sendResponse(
            RESPONSE_TYPE.ERROR,
            "An error occurred while fetching products."
          )
        );
    }
  }
}
