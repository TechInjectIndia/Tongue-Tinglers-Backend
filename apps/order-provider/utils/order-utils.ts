import {
    ORDER_TYPE,
    OrderStatus,
    ParsedOrder,
    PAYMENT_TYPE,
    PresaleParsedOrder
} from "apps/order/interface/Order";
import {IDiscComponent, PriceComponent} from "apps/order/interface/OrderItem";
import {
    MetaUser,
    ParsedUser,
    USER_STATUS,
    USER_TYPE
} from "apps/user/interface/user";
import {UserModel} from "../../user/models/UserTable";
import user from "../../test-user/api/user";
import {FRANCHISE_STATUS} from "../../franchise/interface/Franchise";

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
        franchise: {
            id: 1,
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
            affiliate: {
                id: 0,
                type: "",
                codes: "",
                user: {
                    id: 0,
                    firstName: "",
                    lastName: "",
                    email: ""
                },
                createdAt: new Date(),
                updatedAt: new Date()
            },
            location: undefined,
            sm: [],
            assignedUser: undefined,
            createdBy: 0,
            updatedBy: 0,
            deletedBy: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
        },
        orderType: ORDER_TYPE.RM_ORDER,
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
        anomalyArr: [],
        billingAddress: {
            id: 0,
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phoneNumber: "",
            firstName: "",
            lastName: ""
        },
        cancelled_items: [],
        createdBy: 0,
        customer_details: 0,
        deletedBy: 0,
        delivery_details: 1,
        delivery_status: "",
        discount_prices: "",
        franchise: 0,
        item_count: 0,
        order_type: ORDER_TYPE.RM_ORDER,
        payment_id: "",
        payment_type: "",
        prices: "",
        shippingAddress: {
            id: 0,
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phoneNumber: "",
            firstName: "",
            lastName: ""
        },
        status: "",
        total_discount: 0,
        total_shipping: 0,
        total_tax: 0,
        updatedBy: 0,
        total: 0,
        totalTax: 0,
        cancelledItems: [], // Initialize with no cancelled items.
        totalDiscount: 0,
        coupon: null, // Initialize with no coupon.
        items: [],
        notes: [], // Initialize with no notes.
        orderItems: []
    };

    return preSaleParsedOrder
}

export { getEmptyParsedOrder, getCartItemPayableIncTax, getCartItemTax, parseIncludedUserModel , getEmptyPreSaleOrder};
