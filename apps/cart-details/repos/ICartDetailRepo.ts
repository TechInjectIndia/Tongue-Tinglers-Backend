export interface ICartDetailRepo {
    getCartDetailByUserId(userId: number): Promise<any>;
}