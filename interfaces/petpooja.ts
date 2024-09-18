export interface IItemStockAttributes {
    user_id: string;
    startStock: number;
    endStock: number;
    recorded_at?: Date;
    createdAt: Date;
    updatedAt: Date;
}