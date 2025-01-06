import type{ ParsedCartDetail } from "../interface/CartDetail";

export interface ICartDetailRepo {
    getCartDetailByUserId(userId: number): Promise<ParsedCartDetail>;
}