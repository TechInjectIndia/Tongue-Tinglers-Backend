import { StockModel } from '../../../database/schema';

export class StockRepo {
    // Method to create stock for a product
    async create(stockData: { productId: number; quantity: number }) {
        return await StockModel.create(stockData);
    }

    // Method to update stock quantity for a product
    async update(productId: number, quantity: number) {
        return await StockModel.update({ quantity }, { where: { productId } });
    }

    // Method to retrieve stock by product ID
    async getByProductId(productId: number) {
        return await StockModel.findOne({ where: { productId } });
    }

    // Method to delete stock based on product IDs
    async deleteByProductIds(productIds: number[]) {
        return await StockModel.destroy({ where: { productId: productIds } });
    }
}
