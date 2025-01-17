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
import { ParsedCartProductDetails } from "apps/cart-details/interface/CartDetail";
import { getUid } from "apps/common/utils/commonUtils";
import { CURRENCY_TYPE, RPOrderParams } from "apps/razorpay/models/RPModels";
import { Orders } from "node_modules/razorpay/dist/types/orders";
import { RazorpayProvider } from "apps/razorpay/repositories/razorpay/RazorpayProvider";
import { ParsedProduct } from "../../product/interface/Product";
import {
    DTO,
    getHandledErrorDTO,
    getSuccessDTO,
    getUnhandledErrorDTO
} from "apps/common/models/DTO";


import { PendingOrderRepo } from "apps/pending-orders/repos/PendingOrderRepo";
import {
    PendingOrder,
    PendingOrderPayload
} from "apps/pending-orders/interface/PendingOrder";
import { runAtomicFetch } from "../../common/utils/atomic-fetch/atomic-fetch";
import RepoProvider from "../../RepoProvider";
import {RPOrderTable} from "../../rp-order/models/RPOrderTable";
import user from "../../test-user/api/user";
import {FRANCHISE_STATUS} from "../../franchise/interface/Franchise";
export class OrderProvider implements IOrderProvider {
    async processOrder(
        state: OrderState,
    ): Promise<DTO<{ rpOrder: RPOrder; parsedOrder: ParsedOrder }>> {
        // Fetch user, cart, and addresses concurrently
        const [user, cart, billingAddress, shippingAddress] = await Promise.all(
            [
                this.fetchUser(state.userId),
                this.fetchCart(state.userId),
                this.fetchAddress(state.billingAddressId),
                this.fetchAddress(state.shippingAddressId),
            ],
        );

        if (!user.success) return getUnhandledErrorDTO("User not found");
        if (!cart.success) return getUnhandledErrorDTO("Cart not found");
        if (!billingAddress.success)
            return getUnhandledErrorDTO("billingAddress not found");
        if (!shippingAddress.success)
            return getUnhandledErrorDTO("shippingAddress not found");

        console.log("shippppp", shippingAddress);

        // Prepare the order using the fetched data
        const order = await this.prepareOrder(
            user.data,
            cart.data,
            billingAddress.data,
            shippingAddress.data,
            state.paymentType,
        );

        console.log("order--------->", order);

        // calculate Order
        this.calculateOrder(order, user.data);

        // Transform the order into RPOrder and ParsedOrder
        const rpOrderRes = await this.transformToRPOrder(order);


        // const pendingOrderData = await new PendingOrderRepo().createPendigOrderPayload(order, rpOrderRes.data.id);
        // await new PendingOrderRepo().create(pendingOrderData)
        // await RPOrderTable.create(rpOrderRes.data);

        console.log("RP order--------->", rpOrderRes.data);

        if (!rpOrderRes.success)
            return getUnhandledErrorDTO("Failed to create RP Order");

        return getSuccessDTO({ rpOrder: rpOrderRes.data, parsedOrder: order });
    }

    async processPostOrder(paymentOrderId: string, paymentId:string): Promise<DTO<null>> {
        // revalidate the payment with razorpay

        // TODO @sumeet sir

        const validationRes = await this.verifyFromRazorpay(paymentId);
        if (!validationRes)
            return getHandledErrorDTO(
                `revalidation failed for: ${paymentOrderId}`,
            );

        const processRes =
            await RepoProvider.orderRepo.processPostOrderTransaction(
                paymentOrderId,
            );

        if (!processRes.success)
            return getHandledErrorDTO(processRes.message, processRes);
        const res = processRes.data;

        // perform post OrderTasks with run atomic fetch
        if (!res.alreadyProcessed && res.order) {
            await this.performPostPaymentTasks(res.order);
        }

        return getSuccessDTO(null);
    }

    ///////////////////////////PRIVATE METHODS////////////////////////////////////

    /**
     * this is going to have promise but works synchronous for future proofing
     * @param order
     * @param currUser
     */
    private async calculateOrder(
        order: ParsedOrder,
        currUser: TUserWithPermission,
    ): Promise<ParsedOrder> {
        // calculate Order

        let result = await this.getCalculatedOrder(order, currUser);
        return result;
    }

    private calculateBasePrice(order: ParsedOrder): DTO<ParsedOrder> {
        order.total = this.calculateTotalPrice(order);
        order.price[PRICE_COMP_TYPE.BASE_PRICE] =
            this.calculateBasePriceTotal(order);

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
                const itemValue =
                    (basePriceComp.value * basePriceComp.percent) / 100;
                priceCom.value += itemValue * item.quantity;
                priceCom.tax +=
                    ((basePriceComp.tax * basePriceComp.percent) / 100) *
                    item.quantity;
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
        currUser: TUserWithPermission,
    ): Promise<ParsedOrder> {
        let shippingApplied: boolean = false;

        // STEP 1: CALCULATE BASE PRICE
        // Tax is 0 after this function
        this.calculateBasePrice(order);

        // STEP 2: CALCULATE DISCOUNT
        // This function will be responsible to calculate the order item level discount,
        // order level discount based on coupons, student coupons and reward points
        const handleCouponValidatePromise = this.applyDiscounts(
            order,
            currUser,
        );

        const [handleCouponValidateRes] = await Promise.all([
            handleCouponValidatePromise,
        ]);

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
        applyCouponRes: WrapperValidateResult | null,
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
            order.discount[DISCOUNT_COMP_TYPE.COUPON_DISCOUNT].value =
                totalDisc;
        }
        return getSuccessDTO(order);
    }

    getOrderTotalDiscAfterCoupon(orderItems: ParsedOrderItem[]) {
        let discount: number = 0;
        orderItems.forEach((item) => {
            discount +=
                getCartItemPayableIncTax(item.prices, item.disc).disc *
                item.quantity;
        });

        return discount;
    }

    private calcOrderItemsAfterDisc(items: ParsedOrderItem[]) {
        return items;
    }

    private async prepareOrder(
        currUser: TUserWithPermission,
        cart: ParsedCartProductDetails[],
        billingAddressObj: Address | null,
        shippingAddressObj: Address | null,
        paymentData: PAYMENT_TYPE,
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
            franchise: {
                id: 0,
                pocName: "",
                pocEmail: "",
                pocPhoneNumber: "",
                users: [],
                region: undefined,
                area: "",
                agreementIds: [],
                paymentIds: [],
                organization: undefined,
                status: FRANCHISE_STATUS.Active,
                establishedDate: undefined,
                affiliate: undefined,
                location: undefined,
                sm: [],
                assignedUser: undefined,
                createdBy: 0,
                updatedBy: 0,
                deletedBy: 0,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined
            }
            , orderType: undefined,
            id: 0,
            status: OrderStatus.PROCESSED,
            total: 0,
            totalTax: 0,
            deliveryStatus: "",
            customerDetails: user,
            paymentType: paymentData,
            paymentId: '',
            cancelledItems: [],
            totalDiscount: 0,
            deliveryDetails: null,
            shippingAddress: shippingAddressObj,
            billingAddress: billingAddressObj,
            totalShipping: 0,
            anomalyArr: [],
            coupon: "",
            items: orderItems,
            updatedBy: { email: "", firstName: "", id: 0, lastName: "" },
            deletedBy: { email: "", firstName: "", id: 0, lastName: "" },
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
        shippingApplied: boolean = false,
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

        const couponValidateRes = await this.applyCoupon(
            wrapperCouponRes.order,
            currUser,
        );

        if (couponValidateRes) {
            if (couponValidateRes.hasAppliedCouponMap) {
                order.items.forEach((oi) => {
                    const couponRes = couponValidateRes.appliedCouponMap[oi.id];
                    if (couponRes) {
                        const OICIP = oi.product;
                        if (!OICIP)
                            throw new Error(
                                "impossible - earlier fetched product missing",
                            );
                        const res = this.getDiscountMapFromProduct(
                            OICIP,
                            oi.totalTax,
                            oi.prices,
                            oi.quantity,
                            shippingApplied,
                            order,
                        );

                        if (!res.success) throw new Error(res.message);
                        oi.disc = res.data;
                        const { subtotal, disc } = getCartItemPayableIncTax(
                            oi.prices,
                            oi.disc,
                        );
                        oi.totalDiscount = disc;
                        oi.total_price = subtotal - disc;
                        oi.totalTax = getCartItemTax(oi.prices, oi.disc);
                        // console.log("oi.totalTax",oi.totalTax);
                    }
                });
            }

            wrapperCouponRes.couponObj = couponValidateRes.couponObj;
            wrapperCouponRes.hasAppliedCouponMap =
                couponValidateRes.hasAppliedCouponMap;
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
        order: ParsedOrder | null = null, // to calculate reward points
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
        currUser: TUserWithPermission,
    ): Promise<HandleCouponValidateResult | null> {
        const result = await this.handleCouponValidate(order, currUser);

        order = result.order;

        return result;
    }

    private async getOrderProcessCart(
        carts: ParsedCartProductDetails[],
    ): Promise<ParsedOrderItem[]> {
        const orderItems = await Promise.all(
            carts.map((c) => this.getOrderItemByCartItem(c)),
        );
        return orderItems;
    }

    private handleCouponValidate = async (
        order: ParsedOrder,
        user: TUserWithPermission,
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
                deletedBy: 0,
            },
            issues: {},
            hasAppliedCouponMap: false,
            order: order,
            appliedCouponMap: {},
        };
    };

    private async getOrderItemByCartItem(
        cartItem: ParsedCartProductDetails,
    ): Promise<ParsedOrderItem> {
        const product = await new ProductRepo().getById(cartItem.product.id);

        const priceCom: PriceComponent = {
            type: PRICE_COMP_TYPE_CART.BASE_PRICE,
            percent: 0,
            taxPercent: 0,
            value: cartItem.variation.price,
            tax: 0,
            calc: VALUE_TYPE.ABSOLUTE,
        };

        // cartItem.variation.price
        const objItem: ParsedOrderItem = {
            id: cartItem.id,
            product: product,
            productOption: cartItem.variation.optionsValue,
            quantity: cartItem.quantity,
            total_price: cartItem.variation.price,
            totalTax: 0,
            prices: {
                [PRICE_COMP_TYPE.BASE_PRICE]: priceCom,
            },
            disc: {},
            type: ORDER_ITEM_TYPE.RETORT,
            totalDiscount: 0,
        };

        return objItem;
    }

    private async transformToRPOrder(
        order: ParsedOrder,
    ): Promise<DTO<RPOrder>> {
        // STEP 1: create order in payment
        const response = await this.createOrder(order);

        return response;
    }

    private async createOrder(order: ParsedOrder): Promise<DTO<RPOrder>> {
        try {
            const body: RPOrderParams = {
                currency: CURRENCY_TYPE.INR,
                receipt: order.id.toString(),
                amount: Number(order.total.toFixed(2)),
                notes: [order.id.toFixed(2)],
            };

            const resJson = await this.createOrderReq(body);
            if (!resJson) return getUnhandledErrorDTO("payment order failed");
            return getSuccessDTO(resJson) as DTO<RPOrder>;
        } catch (error: any) {
            return getUnhandledErrorDTO(error.message);
        }
    }

    private async createOrderReq(orderData: RPOrderParams) {
        try {
            // match amount and host
            const id = orderData?.notes?.[0];

            // console.log("_*after check*_*_**", remoteOrder);

            // _*_*_*_*_*_*_*_*_*_* MAIN _*_*_*_*_*_*_*_*_*_*

            orderData.amount = Number(
                (Number(orderData.amount) * 100).toFixed(2),
            );
            let result: DTO<Orders.RazorpayOrder>;
            // console.log('here key',RP_ID_PROD);

            const rpInstance = RazorpayProvider.getRazorpayInstance();

            // todo rajinder access keys from env later

            const order: Orders.RazorpayOrder = await rpInstance.orders.create(
                orderData as unknown as Orders.RazorpayOrderCreateRequestBody,
            );

            return order;
        } catch (e: any) {
            console.log(e);

            return getUnhandledErrorDTO(e.message);
        }
    }

    // Mock methods to fetch data (replace with actual implementations)
    private async fetchUser(userId: number): Promise<DTO<TUserWithPermission>> {
        // Fetch user by userId
        const existingAdmin = await new AdminRepo().get(userId);

        if (!existingAdmin) return getUnhandledErrorDTO("No user found");

        return getSuccessDTO(existingAdmin);
    }

    private async fetchCart(
        userId: number,
    ): Promise<DTO<ParsedCartProductDetails[]>> {
        const cart = await new CartDetailRepo().getCartDetailByUserId(userId);
        if (!cart) return getUnhandledErrorDTO("Cart not found");
        console.log("got", cart);

        return getSuccessDTO(cart.cart);
    }

    private async fetchAddress(
        addressId: number | null,
    ): Promise<DTO<Address | null>> {
        if (!addressId) return getSuccessDTO(null);
        // Fetch address by addressId
        const userAddress = await new AddressRepo().findById(addressId);

        if (!userAddress) return getUnhandledErrorDTO("No address found!");

        return getSuccessDTO(userAddress);
    }

    //     Process Post Order private functions

    private async performPostPaymentTasks(order: ParsedOrder): Promise<void> {
        // todo @Nitesh add more tasks here!!
        const p1 = this.sendOrderMailAtomic(order);

        await Promise.all([p1]);
    }

    private async sendOrderMailAtomic(
        order: ParsedOrder,
        // paymentVerificationMethod: PAYMENT_VERIFICATION_METHODS,
    ) {
        // const orderMetaField = ORDER_META_FIELDS.CONFIRMATION_MAIL;
        // todo @Hargun implement this!!
        return runAtomicFetch(
            () => {
                return new Promise(() => true);
                // return RepoProvider.orderRepo.getMetaFlagAndOccupy(order.pendingId, orderMetaField);
            },
            () => {
                return this.sendOrderMail(order);
            },
            (executionStatus: boolean) => {
                return new Promise(() => getSuccessDTO(null));
                // return RepoProvider.orderRepo.updateMetaFlag(
                //     order.pendingId,
                //     orderMetaField,
                //     executionStatus,
                //     paymentVerificationMethod
                // );
            },
        );
    }

    // todo @Nitesh add mailing function here.
    private async sendOrderMail(order: ParsedOrder): Promise<boolean> {
        //     send mail functions

        throw new Error("method not implemented");
    }

    private async verifyFromRazorpay(paymentId: string) {
        const res =
            await RepoProvider.razorpayRepo.getTransaction(paymentId)

        if (res.success && res.data.status && res.data.status === "captured") {
            return true;
        } else {
            return false;
        }
    }
}
