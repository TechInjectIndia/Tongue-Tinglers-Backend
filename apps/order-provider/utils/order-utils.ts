import { OrderStatus, ParsedOrder, PAYMENT_TYPE } from "apps/order/interface/Order";
import { IDiscComponent, PriceComponent } from "apps/order/interface/OrderItem";
import { MetaUser, ParsedUser, USER_STATUS, USER_TYPE } from "apps/user/interface/user";

const getEmptyParsedOrder = () => {
    const metaObj: MetaUser = { email: "", firstName: "", id: 0, lastName: "" };
    const user: ParsedUser = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        type: USER_TYPE.ADMIN,
        status: USER_STATUS.ACTIVE,
        role: 0,
        updatedBy: metaObj,
        deletedBy: metaObj,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        createdBy: 0
    };

    const obj: ParsedOrder = {
        id: 0,
        status: OrderStatus.PROCESSED,
        total: 0,
        totalTax: 0,
        deliveryStatus: "",
        customerDetails: user,
        paymentType: PAYMENT_TYPE.RP_CHECKOUT,
        paymentId: 0,
        cancelledItems: [],
        totalDiscount: 0,
        deliveryDetails: null,
        shippingAddress: {
            city: "",
            country: "",
            firstName: "",
            id: 0,
            lastName: "",
            phoneNumber: "",
            postalCode: "",
            state: "",
            street: "",
        },
        totalShipping: 0,
        anomalyArr: [],
        coupon: "",
        items: [],
        updatedBy: metaObj,
        deletedBy: metaObj,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        notes: [],
        orderItems: [],
        couponCodes: [],
        discount: {},
        price: {},
        createdBy: 0
    };

    return obj;
};

const getCartItemPayableIncTax = (
    prices: Record<string, PriceComponent>,
    discs: Record<string, IDiscComponent>
) => {
    return {
        subtotal: Object.values(prices).reduce((acc, next) => acc + next.tax + next.value, 0),
        disc: Object.values(discs).reduce((acc, next) => acc + next.tax + next.value, 0),
    };
};

const getCartItemTax = (
    prices: Record<string, PriceComponent>,
    discs: Record<string, IDiscComponent>
) => {
    return (
        Object.values(prices).reduce((acc, next) => acc + next.tax, 0) -
        Object.values(discs).reduce((acc, next) => acc + next.tax, 0)
    );
};

export { getEmptyParsedOrder, getCartItemPayableIncTax, getCartItemTax };
