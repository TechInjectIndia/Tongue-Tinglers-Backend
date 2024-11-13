const { Op } = require("sequelize");
import {
    TProduct,
    TProductFilters,
    TProductsList,
    TEditProduct,
    TAddProduct,
} from "../../../types/ecommerce";
import { ProductsModel, ProductImagesModel, ProductCategoryModel, ProductTagModel, VendorModel } from "../../../database/schema";
import { uploadFileToFirebase } from '../../../libraries';
import IBaseRepo from '../controllers/controller/product/IProductsController';

export class ProductRepo implements IBaseRepo<TProduct, TProductFilters> {
    constructor() { }

    // Upload an image to Firebase Storage and save the image data in the database
    public async uploadImage(productId: any, file: any, fileInfo: any, destinationPath: string): Promise<any> {

        const findImage = await ProductImagesModel.findAll({
            where: {
                productId,
                isMainImage: true
            }
        });

        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];
        const newImage = await ProductImagesModel.create({
            productId: productId,
            fileName: fileInfo.name,
            filePath: url,
            originalName: fileInfo.name,
            caption: fileInfo.caption,
            isMainImage: findImage == null ? true : false,
            fileSize: 0,
        });
        return newImage.filePath;
    }

    public async create(data: TAddProduct): Promise<TProduct> {
        const response = await ProductsModel.create(data);
        return response;
    }

    public async getProductByName(name: string): Promise<TProduct> {
        const data = await ProductsModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TProduct> {
        const data = await ProductsModel.findOne({
            where: {
                id,
            },
            include: [{
                model: ProductImagesModel,
                as: 'images'
            },
            {
                model: VendorModel,
                as: 'vendorData'
            },
            {
                model: ProductCategoryModel,
                as: 'categories',
                through: {
                    attributes: ['id'],
                }
            },
            {
                model: ProductTagModel,
                as: 'tags',
                through: {
                    attributes: ['id'],
                }
            }]
        });
        return data;
    }

    public async list(filters: TProductFilters): Promise<TProductsList> {
        const total = await ProductsModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await ProductsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async update(id: number, data: TEditProduct): Promise<[affectedCount: number]> {
        const response = await ProductsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ProductsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
