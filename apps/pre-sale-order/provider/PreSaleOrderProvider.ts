import { PresaleParsedOrder } from "../../../interfaces";
import { BaseCartProduct, Cart } from "../../../interfaces/cart_products";
import {
    BaseOrderItem,
    ORDER_ITEM_TYPE,
    PreSaleParsedOrderItem,
} from "../../../interfaces/order_items";
import { DTO, getSuccessDTO, getUnhandledErrorDTO } from "../../common/models/DTO";
import RepoProvider from "../../RepoProvider";
import { IPreSaleOrderProvider } from "../provider/IPreSaleOrderProvider";

export class PreSaleOrderProvider implements IPreSaleOrderProvider {
    /**
     * Fetches and constructs a pre-sale order based on the provided cart.
     * @param payload - The cart containing product information.
     * @returns A DTO containing the parsed pre-sale order or an error message.
     */
    async getPreSaleOrder(payload: Cart): Promise<DTO<PresaleParsedOrder>> {
        // Process each cart item to get its corresponding pre-sale parsed order item.
        const preSaleOrderItemsRes = await Promise.all(
            payload.carts.map((item) => this.getPreSaleParsedOrderItemByBaseCartProduct(item))
        );

        const preSaleOrderItems: PreSaleParsedOrderItem[] = [];

        // Collect successful items and handle errors.
        for (const obj of preSaleOrderItemsRes) {
            if (!obj.success) return getUnhandledErrorDTO(obj.message);
            preSaleOrderItems.push(obj.data);
        }

        // Construct the complete pre-sale parsed order.
        const preSaleParsedOrder: PresaleParsedOrder = {
            total: this.getTotalByPreSaleOrderItems(preSaleOrderItems),
            totalTax: this.getTotalTaxByPreSaleOrderItems(),
            cancelledItems: [], // Initialize with no cancelled items.
            totalDiscount: this.getTotalDiscountByPreSaleOrderItems(),
            coupon: "", // Initialize with no coupon.
            items: preSaleOrderItems,
            notes: [], // Initialize with no notes.
            orderItems: this.getOrderItemsByPreSaleParsedOrderItems(preSaleOrderItems),
        };

        return getSuccessDTO(preSaleParsedOrder);
    }

    ///////////////////////////// PRIVATE METHODS ////////////////////////////////

    /**
     * Calculates the total discount from pre-sale order items.
     * Placeholder implementation.
     * @returns Total discount (currently 0).
     */
    private getTotalDiscountByPreSaleOrderItems() {
        return 0;
    }

    /**
     * Calculates the total tax from pre-sale order items.
     * Placeholder implementation.
     * @returns Total tax (currently 0).
     */
    private getTotalTaxByPreSaleOrderItems() {
        return 0;
    }

    /**
     * Converts pre-sale parsed order items into order items.
     * @param items - Array of pre-sale parsed order items.
     * @returns Array of base order items.
     */
    private getOrderItemsByPreSaleParsedOrderItems(items: PreSaleParsedOrderItem[]) {
        return items.map((item) => ({
            product_id: item.product.id,
            product_option_id: item.productOptionId.id,
            quantity: item.quantity,
            total_price: item.total_price,
            total_tax: item.totalTax,
            coupon_discount: 0,
            points_discount: 0,
            student_discount: 0,
            type: ORDER_ITEM_TYPE.RETORT,
        }));
    }

    /**
     * Calculates the total price of pre-sale order items.
     * @param items - Array of pre-sale parsed order items.
     * @returns Total price.
     */
    private getTotalByPreSaleOrderItems(items: PreSaleParsedOrderItem[]) {
        return items.reduce((total, item) => total + item.total_price, 0);
    }

    /**
     * Fetches and parses a pre-sale order item from a base cart product.
     * @param cartProduct - The cart product to process.
     * @returns A DTO containing the parsed pre-sale order item or an error message.
     */
    private async getPreSaleParsedOrderItemByBaseCartProduct(
        cartProduct: BaseCartProduct
    ): Promise<DTO<PreSaleParsedOrderItem>> {
        // Fetch the product by ID.
        const product = await RepoProvider.ProductRepo.getById(cartProduct.product_id);
        if (!product) return getUnhandledErrorDTO(`Product not found: ${cartProduct.product_id}`);

        // Validate product variations.
        if (!product.variations) {
            return getUnhandledErrorDTO(`${product.name} does not contain variations.`);
        }

        // Find the specific variation by ID.
        const variation = product.variations.find((p) => p.id === cartProduct.product_option_id);
        if (!variation) {
            return getUnhandledErrorDTO(
                `${product.name} does not contain variation: ${cartProduct.product_option_id}`
            );
        }

        // Construct the pre-sale parsed order item.
        const preSaleParsedOrderItem: PreSaleParsedOrderItem = {
            product,
            productOptionId: variation,
            quantity: cartProduct.quantity,
            total_price: cartProduct.quantity * variation.price,
            totalTax: 0,
            prices: [],
            disc: [],
            type: ORDER_ITEM_TYPE.RETORT,
        };

        return getSuccessDTO(preSaleParsedOrderItem);
    }
}
