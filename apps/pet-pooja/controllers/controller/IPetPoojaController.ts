import { TQueryFilters } from '../../../../types';

/**
 * Interface representing stock data.
 */
interface StockData {
    user_id: number;
    startStock: number;
    endStock: number;
    recorded_at?: Date;
}

/**
 * Interface representing a franchise.
 */
interface Franchise {
    id: number;
    name: string;
    type: string;
}

/**
 * Interface representing inventory details.
 */
interface Inventory {
    item_id: number;
    quantity: number;
}

/**
 * Interface for Pet Pooja Controller.
 */
interface IPetPoojaController<T, F extends TQueryFilters> {
    /**
     * Update stock data for a user.
     * @param user_id - The ID of the user.
     * @param data - The stock data to update.
     * @returns Promise resolving to the affected count.
     */
    updateStockData(user_id: number, data: StockData): Promise<[affectedCount: number]>;

    /**
     * Save stock data.
     * @param data - The stock data to save.
     * @returns Promise resolving to the saved stock data.
     */
    saveStockData(data: StockData): Promise<StockData>;

    /**
     * Get all franchises.
     * @returns Promise resolving to an array of franchises.
     */
    getAllFranchise(): Promise<Franchise[]>;

    /**
     * Get total end stock across all franchises.
     * @returns Promise resolving to the total end stock.
     */
    allEndStock(): Promise<number>;

    /**
     * Get all stock data.
     * @returns Promise resolving to an array of stock data.
     */
    itemStocks(): Promise<StockData[]>;

    /**
     * Aggregate stock data.
     * @returns Promise resolving to an array containing total start and end stock.
     */
    aggregate(): Promise<[number, number]>; 

    /**
     * Get stock trends over time.
     * @returns Promise resolving to an array of stock trends.
     */
    getStockTrends(): Promise<StockData[]>;

    /**
     * Get inventory for a specific franchise.
     * @param franchiseId - The ID of the franchise.
     * @returns Promise resolving to an array of inventory items.
     */
    getInventory(franchiseId: number): Promise<Inventory[]>;

    /**
     * Save a Pet Pooja order for a franchise.
     * @param franchiseId - The ID of the franchise.
     * @returns Promise resolving to the order details.
     */
    savePetPoojaOrder(franchiseId: number): Promise<any>;
}

export default IPetPoojaController;
