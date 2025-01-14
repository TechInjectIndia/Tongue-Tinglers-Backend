import { OrderStatus, ParsedOrder, PAYMENT_TYPE, PresaleParsedOrder } from "apps/order/interface/Order";
import { IDiscComponent, PriceComponent } from "apps/order/interface/OrderItem";
import { MetaUser, ParsedUser, TUser, USER_STATUS, USER_TYPE } from "apps/user/interface/user";
import { json } from "sequelize";
import {UserModel} from "../../user/models/UserTable";

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
        createdBy: 0,
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
        billingAddress: {
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
        createdBy: 0,
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

function parseIncludedUserModel(obj: any): UserModel {
    console.log(JSON.stringify(obj));
    const json = obj.users;
    return {
        ...json,
        lastLoginAt: new Date(json.lastLoginAt),
        createdAt: new Date(json.createdAt),
        updatedAt: new Date(json.updatedAt),
        deletedAt: json.deletedAt ? new Date(json.deletedAt) : null,
    }
}

const getEmptyPreSaleOrder=()=>{
    const preSaleParsedOrder: PresaleParsedOrder = {
        total: 0,
        totalTax: 0,
        cancelledItems: [], // Initialize with no cancelled items.
        totalDiscount: 0,
        coupon: null, // Initialize with no coupon.
        items: [],
        notes: [], // Initialize with no notes.
        orderItems: [],
    };

    return preSaleParsedOrder
}

export { getEmptyParsedOrder, getCartItemPayableIncTax, getCartItemTax, parseIncludedUserModel , getEmptyPreSaleOrder};
