import {
    OrderState,
    RPOrder,
    ParsedOrder,
    OrderStatus,
    PAYMENT_TYPE,
    Order,
    RP_ORDER_STATUS,
} from "apps/order/interface/Order";
import { Address } from "apps/address/interface/Address";
import { IOrderProvider } from "./IOrderProvider";
import { AddressRepo } from "apps/address/repositories/AddressRepo";
import { DTO, getSuccessDTO, getUnhandledErrorDTO } from "apps/DTO/DTO";
import { BaseCartProduct, Cart } from "apps/cart-products/interface/Cart";
import { AdminRepo } from "apps/user/models/user";
import { TUserWithPermission } from "types/admin/admin-user";
import { getCartItemPayableIncTax, getCartItemTax } from "../utils/order-utils";
import { ParsedUser, USER_STATUS, USER_TYPE } from "apps/user/interface/user";
import {
    DISCOUNT_COMP_TYPE,
    IDiscComponent,
    ORDER_ITEM_TYPE,
    ParsedOrderItem,
    PRICE_COMP_TYPE,
    PRICE_COMP_TYPE_CART,
    PriceComponent,
    VALUE_TYPE,
} from "apps/order/interface/OrderItem";
import { ProductRepo } from "apps/product/repos/productRepo";
import { ProductOptionRepo } from "apps/product-options/repos/productOptionsRepo";
import {
    HandleCouponValidateResult,
    WrapperValidateResult,
} from "apps/common/models/CheckOutPageState";
import { COUPON_STATUS, DISCOUNT_TYPE } from "apps/coupons/models/Coupon";

import { CartDetailRepo } from "apps/cart-details/repos/cartDetailRepo";
import {ParsedProduct} from "../../product/interface/Product";

export class OrderProvider implements IOrderProvider {
    async processOrder(
        state: OrderState
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        // Fetch user, cart, and addresses concurrently
        const [user, cart, billingAddress, shippingAddress] = await Promise.all([
            this.fetchUser(state.userId),
            this.fetchCart(state.userId),
            this.fetchAddress(state.billingAddressId),
            this.fetchAddress(state.shippingAddressId),
        ]);

        if (!user.success) return getUnhandledErrorDTO("User not found");
        if (!cart.success) return getUnhandledErrorDTO("Cart not found");
        if (!billingAddress.success) return getUnhandledErrorDTO("billingAddress not found");
        if (!shippingAddress.success) return getUnhandledErrorDTO("shippingAddress not found");

        // Prepare the order using the fetched data
        const order = await this.prepareOrder(
            user.data,
            cart.data,
            billingAddress.data,
            shippingAddress.data,
            state.paymentType
        );

        // calculate Order
        this.calculateOrder(order, user.data);

        // Transform the order into RPOrder and ParsedOrder
        const rpOrder: RPOrder = this.transformToRPOrder(order);

        return getSuccessDTO({ rpOrder: rpOrder, parsedOrder: order });
    }

    ///////////////////////////PRIVATE METHODS////////////////////////////////////

    async calculateOrder(order: ParsedOrder, currUser: TUserWithPermission): Promise<ParsedOrder> {
        // calculate Order

        let result = await this.getCalculatedOrder(order, currUser);
        return result;
    }

    calculateBasePrice(order: ParsedOrder): DTO<ParsedOrder> {
        order.total = this.calculateTotalPrice(order);
        order.price[PRICE_COMP_TYPE.BASE_PRICE] = this.calculateBasePriceTotal(order);

        return getSuccessDTO(order);
    }

    private calculateTotalPrice(order: ParsedOrder) {
        let totalPrice = 0;
        let totalTax = 0;

        order.items.forEach((item) => {
            totalPrice += item.total_price * item.quantity;
            totalTax += item.totalTax * item.quantity;
        });
        order.total = totalPrice;
        order.totalTax = totalTax;

        return totalPrice;
    }

    private calculateBasePriceTotal(order: ParsedOrder): PriceComponent {
        // Initialize the IPriceComponent to accumulate total base price and tax
        let priceCom: PriceComponent = {
            taxPercent: 0,
            value: 0, // Total base price
            tax: 0, // Total tax
            percent: 0, // Optional percentage-based value
            type: PRICE_COMP_TYPE_CART.BASE_PRICE, // Assuming BASE_PRICE type
            calc: VALUE_TYPE.ABSOLUTE, // Default to absolute calculation
        };

        // Iterate over each order item
        order.items.forEach((item) => {
            const basePriceComp = item.prices[PRICE_COMP_TYPE.BASE_PRICE];

            // Check if the price calculation is percentage-based or absolute
            if (basePriceComp.calc === VALUE_TYPE.PERCENTAGE) {
                // If percentage-based, calculate value as a percentage of the base price
                const itemValue = (basePriceComp.value * basePriceComp.percent) / 100;
                priceCom.value += itemValue * item.quantity;
                priceCom.tax += ((basePriceComp.tax * basePriceComp.percent) / 100) * item.quantity;
            } else {
                // If absolute, just multiply by quantity
                priceCom.value += basePriceComp.value * item.quantity;
                priceCom.tax += basePriceComp.tax * item.quantity;
            }
        });

        return priceCom;
    }

    private async getCalculatedOrder(
        order: ParsedOrder,
        currUser: TUserWithPermission
    ): Promise<ParsedOrder> {
        let shippingApplied: boolean = false;

        // STEP 1: CALCULATE BASE PRICE
        // Tax is 0 after this function
        this.calculateBasePrice(order);

        // STEP 2: CALCULATE DISCOUNT
        // This function will be responsible to calculate the order item level discount,
        // order level discount based on coupons, student coupons and reward points
        const handleCouponValidatePromise = this.applyDiscounts(order, currUser);

        const [handleCouponValidateRes] = await Promise.all([handleCouponValidatePromise]);

        // change state based on coupon discount
        this.changeStateBasedOnCoupon(order, handleCouponValidateRes.data);

        // STEP 3: CALCULATE TAX
        // This function will calculate tax based on
        this.calculateTax(order);

        // STEP 4: CALCULATE SHIPPING AND SHIPPING TAX
        const res = this.calculateShippingCost(order);

        if (res.success) {
            order = res.data;
        }

        shippingApplied = true;

        // STEP 5: REWARD POINTS SHIPPING ADJUSTMENT
        // const handleRewardPointsShippingAdjustRes =
        await this.applyDiscounts(order, currUser, shippingApplied);

        // STEP 6:  CALCULATE ORDER PRICE
        this.calculateOrderPrice(order);

        order.totalDiscount = this.calcTotalDiscount(order);

        return order;
    }

    private calcTotalDiscount(order: ParsedOrder) {
        let discTotal: number = 0;

        order.items.forEach((item) => {
            discTotal += item.totalDiscount;
        });

        return discTotal;
    }

    private calculateOrderPrice(order: ParsedOrder): ParsedOrder {
        order.total += order.totalShipping;
        return order;
    }

    private calculateShippingCost(order: ParsedOrder): DTO<ParsedOrder> {
        order = this.calculateShipping(order);

        return getSuccessDTO(order);
    }

    private calculateShipping(order: ParsedOrder) {
        // todo @nitesh add shipping logic here
        return order;
    }

    private calculateTax(order: ParsedOrder): ParsedOrder {
        order.totalTax = this.getTotalTax(order);
        return order;
    }
    private getTotalTax(order: ParsedOrder) {
        let tax: number = 0;
        order.items.forEach((c) => {
            tax += c.totalTax;
        });
        return tax;
    }

    private changeStateBasedOnCoupon(
        order: ParsedOrder,
        applyCouponRes: WrapperValidateResult | null
    ): DTO<ParsedOrder> {
        order.total = this.calculateTotalPrice(order);

        const totalDisc = this.getOrderTotalDiscAfterCoupon(order.items);
        order.coupon = applyCouponRes?.couponObj.code ?? "";

        if (totalDisc) {
            if (!order.discount[DISCOUNT_COMP_TYPE.COUPON_DISCOUNT]) {
                order.discount[DISCOUNT_COMP_TYPE.COUPON_DISCOUNT] = {
                    calc: VALUE_TYPE.PERCENTAGE,
                    percent: 0,
                    tax: 0,
                    taxPercent: 0,
                    type: DISCOUNT_COMP_TYPE.COUPON_DISCOUNT,
                    value: 0,
                };
            }
            order.discount[DISCOUNT_COMP_TYPE.COUPON_DISCOUNT].value = totalDisc;
        }
        return getSuccessDTO(order);
    }

    getOrderTotalDiscAfterCoupon(orderItems: ParsedOrderItem[]) {
        let discount: number = 0;
        orderItems.forEach((item) => {
            discount += getCartItemPayableIncTax(item.prices, item.disc).disc * item.quantity;
        });

        return discount;
    }

    private calcOrderItemsAfterDisc(items: ParsedOrderItem[]) {
        return items;
    }

    private async prepareOrder(
        currUser: TUserWithPermission,
        cart: Cart,
        billingAddressObj: Address,
        shippingAddressObj: Address,
        paymentData: PAYMENT_TYPE
    ): Promise<ParsedOrder> {
        // initialise Order instance

        const user: ParsedUser = {
            id: currUser.id,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
            email: currUser.email,
            phoneNumber: currUser.phoneNumber,
            type: currUser.type as USER_TYPE,
            status: currUser.status as USER_STATUS,
            role: currUser.role,
            updatedBy: currUser.updatedBy,
            deletedBy: currUser.deletedBy,
            createdAt: currUser.createdAt,
            updatedAt: currUser.updatedAt,
            deletedAt: currUser.deletedAt,
            createdBy: currUser.createdBy,
        };

        const orderItems = await this.getOrderProcessCart(cart);

        const order: ParsedOrder = {
            id: 0,
            status: OrderStatus.PROCESSED,
            total: 0,
            totalTax: 0,
            deliveryStatus: "",
            customerDetails: user,
            paymentType: paymentData,
            paymentId: 0,
            cancelledItems: [],
            totalDiscount: 0,
            deliveryDetails: shippingAddressObj,
            shippingAddress: billingAddressObj,
            totalShipping: 0,
            anomalyArr: [],
            coupon: "",
            items: orderItems,
            updatedBy: {email: "", firstName: "", id: 0, lastName: ""},
            deletedBy: {email: "", firstName: "", id: 0, lastName: ""},
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
            notes: [],
            orderItems: [],
            couponCodes: [],
            discount: {},
            price: {},
            createdBy: 0
        };

        // SET ORDER ITEMS

        return order;
    }

    async applyDiscounts(
        order: ParsedOrder,
        currUser: TUserWithPermission,
        shippingApplied: boolean = false
    ): Promise<DTO<WrapperValidateResult>> {
        const wrapperCouponRes: WrapperValidateResult = {
            order,
            inValidCoupon: true,
            couponObj: null,
            issues: {},
            hasAppliedCouponMap: false,
            inValidStudentCoupon: false,
            studentCouponObj: null,
            studentIssues: {},
            hasAppliedStudentCouponMap: false,
        };

        const couponValidateRes = await this.applyCoupon(wrapperCouponRes.order, currUser);

        if (couponValidateRes) {
            if (couponValidateRes.hasAppliedCouponMap) {
                order.items.forEach((oi) => {
                    const couponRes = couponValidateRes.appliedCouponMap[oi.id];
                    if (couponRes) {
                        const OICIP = oi.product;
                        if (!OICIP) throw new Error("impossible - earlier fetched product missing");
                        const res = this.getDiscountMapFromProduct(
                            OICIP,
                            oi.totalTax,
                            oi.prices,
                            oi.quantity,
                            shippingApplied,
                            order
                        );

                        if (!res.success) throw new Error(res.message);
                        oi.disc = res.data;
                        const { subtotal, disc } = getCartItemPayableIncTax(oi.prices, oi.disc);
                        oi.totalDiscount = disc;
                        oi.total_price = subtotal - disc;
                        oi.totalTax = getCartItemTax(oi.prices, oi.disc);
                        // console.log("oi.totalTax",oi.totalTax);
                    }
                });
            }

            wrapperCouponRes.couponObj = couponValidateRes.couponObj;
            wrapperCouponRes.hasAppliedCouponMap = couponValidateRes.hasAppliedCouponMap;
            wrapperCouponRes.inValidCoupon = couponValidateRes.inValidCoupon;

            if (!wrapperCouponRes.inValidCoupon) {
                if (wrapperCouponRes.couponObj) {
                    order.couponCodes = [wrapperCouponRes.couponObj.code];
                }
            }

            wrapperCouponRes.issues = couponValidateRes.issues;
            wrapperCouponRes.order = order;
        }

        return getSuccessDTO(wrapperCouponRes);
    }

    getDiscountMapFromProduct(
        product: ParsedProduct,
        applicableTaxPercent: number,
        prices: Record<string, PriceComponent>,
        qty: number,
        shippingApplied: boolean = false, //denoting shipping is applied or yet to be applied
        order: ParsedOrder | null = null // to calculate reward points
    ): DTO<Record<string, IDiscComponent>> {
        // Initialize the discount object with null values and a pre-filled clearance discount

        let discObj: Record<string, IDiscComponent> = {};
        // todo nitish update this code when product contain disc
        //STEP 1. CLEARANCES
        // if (product.discs[DISCOUNT_COMP_TYPE.CLEARANCE]) {
        //     discObj = this.processPricesForClearance(
        //         prices,
        //         product.discs[DISCOUNT_COMP_TYPE.CLEARANCE],
        //         applicableTaxPercent
        //     );
        // }

        //STEP 2. COUPON
        // if (coupon) {
        //     if (coupon.discountType === DISCOUNT_TYPE.PERCENTAGE) {
        //         discObj = this.processPricesForCouponPercent(
        //             prices,
        //             discObj,
        //             applicableTaxPercent,
        //             coupon
        //         );
        //     } else {
        //         if (!totalOrderPayableATM)
        //             throw Error("Pass totalOrderPayableAtm Inc tax with Abs type Coupons");
        //         discObj = this.processPricesForCouponAbs(
        //             prices,
        //             discObj,
        //             applicableTaxPercent,
        //             coupon,
        //             totalOrderPayableATM,
        //             qty
        //         );
        //     }
        // }

        // empty function return same disc map for now
        // STEP 3. Student Coupon
        // if (studentCoupon) {
        //     if (studentCoupon.discountType === DISCOUNT_TYPE.PERCENTAGE) {
        //         discObj = this.processPricesForStudentCouponPercent(
        //             prices,
        //             discObj,
        //             applicableTaxPercent,
        //             studentCoupon
        //         );
        //     } else {
        //         if (!totalOrderPayableATM)
        //             throw Error("Pass totalOrderPayableAtm Inc tax with Abs type Coupons");
        //         discObj = this.processPricesForStudentCouponAbs(
        //             prices,
        //             discObj,
        //             applicableTaxPercent,
        //             studentCoupon,
        //             totalOrderPayableATM,
        //             qty
        //         );
        //     }
        // }
        // STEP 4. Reward Points pre shipping
        // let unusedPoints = rewardPoints ?? 0;
        // let unusedPointsValue = unusedPoints * REWARD_POINTS_VALUE;

        // if (rewardPoints && order && rewardPointsToggle) {
        //     discObj = this.processPricesForRewardPoints(
        //         order,
        //         qty,
        //         prices,
        //         discObj,
        //         applicableTaxPercent,
        //         rewardPoints
        //     );
        //     unusedPoints =
        //         rewardPoints - (order.pointsData?.value ?? 0) - (order.pointsData?.tax ?? 0);
        //     unusedPointsValue = unusedPoints * REWARD_POINTS_VALUE;
        // }

        // STEP 5. Reward Points post shipping
        //adjusting points against shipping
        // if (order && shippingApplied && unusedPointsValue > 0) {
        //     // if(shipping is being charged, adjust points discount against it)
        //     this.processPricesForRewardPointsAfterShipping(
        //         order,
        //         applicableTaxPercent,
        //         unusedPoints
        //     );
        // }

        return getSuccessDTO(discObj);
    }

    async applyCoupon(
        order: ParsedOrder,
        currUser: TUserWithPermission
    ): Promise<HandleCouponValidateResult | null> {
        const result = await this.handleCouponValidate(order, currUser);

        order = result.order;

        return result;
    }

    private async getOrderProcessCart(cart: {
        carts: BaseCartProduct[];
    }): Promise<ParsedOrderItem[]> {
        const orderItems = await Promise.all(cart.carts.map((c) => this.getOrderItemByCartItem(c)));
        return orderItems;
    }

    private handleCouponValidate = async (
        order: ParsedOrder,
        user: TUserWithPermission
    ): Promise<HandleCouponValidateResult> => {
        //   add coupon validations here
        return {
            inValidCoupon: false,
            couponObj: {
                code: "",
                amount: 0,
                discountType: DISCOUNT_TYPE.PERCENTAGE,
                title: "",
                description: "",
                status: COUPON_STATUS.ACTIVE,
                startDate: undefined,
                endDate: undefined,
                usageCount: 0,
                restriction: undefined,
                usageLimit: {
                    count: 0,
                    perUserCount: 0,
                },
                id: 0,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined,
                createdBy: 0,
                updatedBy: 0,
                deletedBy: 0
            },
            issues: {},
            hasAppliedCouponMap: false,
            order: order,
            appliedCouponMap: {},
        };
    };

    private async getOrderItemByCartItem(cartItem: BaseCartProduct): Promise<ParsedOrderItem> {
        const [product, productOption] = await Promise.all([
            new ProductRepo().getById(cartItem.product_id),
            new ProductOptionRepo().getById(cartItem.product_option_id),
        ]);

        const objItem: ParsedOrderItem = {
            id: 0,
            product: product,
            productOption: productOption,
            quantity: cartItem.quantity,
            total_price: 0,
            totalTax: 0,
            prices: {},
            disc: {},
            type: ORDER_ITEM_TYPE.RETORT,
            totalDiscount: 0,
        };

        return objItem;
    }

    private transformToRPOrder(order: ParsedOrder): RPOrder {
        const rpOrder: RPOrder = {
            id: String(order.id),
            amount: order.total,
            amount_paid: order.total,
            amount_due: 0,
            currency: "INR",
            receipt: "zero",
            offer_id: "zero",
            status: RP_ORDER_STATUS.PAID,
            attempts: 1,
            notes: [],
            created_at: new Date(),
        };
        return rpOrder;
    }

    // Mock methods to fetch data (replace with actual implementations)
    private async fetchUser(userId: number): Promise<DTO<TUserWithPermission>> {
        // Fetch user by userId
        const existingAdmin = await new AdminRepo().get(userId);

        if (!existingAdmin) return getUnhandledErrorDTO("No user found");

        return getSuccessDTO(existingAdmin);
    }

    private async fetchCart(userId: number): Promise<DTO<Cart>> {
        const cart = await new CartDetailRepo().getCartDetailByUserId(userId);
        if (!cart) return getUnhandledErrorDTO("Cart not found");
        return getSuccessDTO(cart);
    }

    private async fetchAddress(addressId: number): Promise<DTO<Address>> {
        // Fetch address by addressId
        const userAddress = await new AddressRepo().findById(addressId);

        if (!userAddress) return getUnhandledErrorDTO("No address found!");

        return getSuccessDTO(userAddress);
    }
}
