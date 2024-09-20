import { TQueryFilters } from '../../../../types'

interface StockData {
    user_id: string;
    startStock: number;
    endStock: number;
    recorded_at?: Date;
}

interface Franchise {
    id: string;
    name: string;
    type: string;
}

interface Inventory {
    item_id: string;
    quantity: number;
}

interface IPetPoojaController<T, F extends TQueryFilters> {
    updateStockData(user_id: string, data: StockData): Promise<[affectedCount: number]>;
    saveStockData(data: StockData): Promise<StockData>;
    getAllFranchise(): Promise<Franchise[]>;
    allEndStock(): Promise<number>;
    itemStocks(): Promise<StockData[]>;
    aggregate(): Promise<[number, number]>;
    getStockTrends(): Promise<StockData[]>;
    getInventory(franchiseId: string): Promise<Inventory[]>;
    savePetPoojaOrder(franchiseId: string): Promise<any>;
}

export default IPetPoojaController;