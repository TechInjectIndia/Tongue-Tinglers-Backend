import {
    DTO,
    getHandledErrorDTO,
    getSuccessDTO,
    getUnhandledErrorDTO,
} from "../../../../apps/common/models/DTO";
import LeadToProspect from "../react-templates/LeadToProspect";
import { IMail } from "../mail-class/IMailClass";
import { Mail } from "../mail-class/MailClass";
import { AllMailOptions, MailBodyOptions } from "../models/MailOptions";
import {
    ORDER_ITEM_TYPE,
    PRICE_COMP_TYPE_CART,
    VALUE_TYPE,
} from "apps/order/interface/OrderItem";
import {
    ParsedOrder,
    OrderStatus,
    PAYMENT_TYPE,
    ORDER_TYPE,
} from "apps/order/interface/Order";
import { PRODUCT_STATUS, PRODUCTS_TYPE } from "apps/product/interface/Product";
import { PRODUCT_OPTIONS_STATUS } from "apps/product/interface/ProductOptions";
import { CATEGORY_TYPE } from "apps/products-category/interface/Category";
import { USER_TYPE } from "apps/user/interface/user";
import { invoice } from "apps/invoice/functions/create-invoice";

interface IEmail extends IMail<null> {}

export class LeadToProspectMail extends Mail<null> implements IEmail {
    validator(data: any): string | null {
        return null;
    }

    parser(data: any): null {
        return null;
    }

    getBody(data: any): MailBodyOptions {
        const react = LeadToProspect(data);
        return {
            html: null,
            react: react,
            text: null,
        };
    }
    arrayBufferToBase64(buffer: ArrayBuffer){
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
    
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
    
        return btoa(binary);
    };

    async getPayload(data: any, to: string | Array<string>): Promise<DTO<AllMailOptions>> {
        try {
            if (
                (typeof to === "string" && to.trim() !== "") ||
                (Array.isArray(to) && to.length > 0)
            ) {
                const body = this.getBody(data);

                let order: ParsedOrder = {
                    id: 0,
                    status: OrderStatus.PROCESSED,
                    total: 2997,
                    totalTax: 539.46,
                    deliveryStatus: "",
                    customerDetails: {
                        id: 1,
                        firstName: "Root",
                        lastName: "User",
                        email: "admin@TongueTingler.com",
                        phoneNumber: "+918220735528",
                        type: USER_TYPE.ADMIN,
                        status: null,
                        role: 0,
                        updatedBy: null,
                        deletedBy: null,
                        createdAt: new Date("2025-01-18T06:40:28.613Z"),
                        updatedAt: new Date("2025-01-18T06:40:28.615Z"),
                        deletedAt: null,
                        createdBy: null,
                        profilePhoto: "",
                    },
                    paymentType: PAYMENT_TYPE.RP_CHECKOUT,
                    paymentId: "1234",
                    cancelledItems: [],
                    totalDiscount: 0,
                    deliveryDetails: null,
                    shippingAddress: {
                        id: 3,
                        street: "Mathura",
                        city: "Mathura",
                        state: "Uttar Pradesh",
                        postalCode: "281004",
                        country: "India",
                        phoneNumber: "+919997016578",
                        firstName: "Nitesh",
                        lastName: "Kumar",
                    },
                    billingAddress: {
                        id: 3,
                        street: "Mathura",
                        city: "Mathura",
                        state: "Uttar Pradesh",
                        postalCode: "281004",
                        country: "India",
                        phoneNumber: "+919997016578",
                        firstName: "Nitesh",
                        lastName: "Kumar",
                    },
                    totalShipping: 0,
                    anomalyArr: [],
                    coupon: "",
                    items: [
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                        {
                            id: 5,
                            product: {
                                id: 3,
                                name: "Non Veg Kit ",
                                MOQ: 1,
                                category: {
                                    id: 3,
                                    name: "Non Veg Kit",
                                    slug: "Non-Veg-Kit",
                                    description: "Non-Veg-Kit",
                                    status: PRODUCT_STATUS.ACTIVE,
                                    type: CATEGORY_TYPE.SAMPLE_KIT,
                                },
                                description:
                                    "Enjoy juicy chicken kebabs, rich curries, and fragrant biryanis. A feast for meat lovers!",
                                images: [
                                    "https://firebasestorage.googleapis.com/v0/b/tongue-tinglers.appspot.com/o/productimage-kit-2.png?alt=media&token=e50b9549-7bfd-412d-bc85-e3893d6494d1",
                                ],
                                slug: "Non-Veg-Kit",
                                status: PRODUCT_STATUS.ACTIVE,
                                type: PRODUCTS_TYPE.RETORT,
                                tax_rate_id: 1,
                                vendorId: 1,
                                updatedBy: null,
                                deletedBy: null,
                                createdAt: new Date("2025-01-18T07:06:05.961Z"),
                                updatedAt: new Date("2025-01-18T07:06:05.961Z"),
                                deletedAt: null,
                                createdBy: 1,
                                variations: [
                                    {
                                        id: 4,
                                        option_value: {
                                            id: 2,
                                            name: "Large",
                                            options: {
                                                id: 2,
                                                name: "Size",
                                            },
                                        },
                                        price: 999,
                                        stock: 12,
                                        status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                        images: "",
                                    },
                                ],
                            },
                            productOption: {
                                id: 2,
                                option_value: undefined,
                                price: 0,
                                stock: 0,
                                status: PRODUCT_OPTIONS_STATUS.ACTIVE,
                                images: "",
                            },
                            quantity: 1,
                            total_price: 999,
                            totalTax: 179.82,
                            prices: {
                                "base-price": {
                                    type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                                    percent: 18,
                                    value: 999,
                                    tax: 179.82,
                                    taxPercent: 0,
                                    calc: VALUE_TYPE.ABSOLUTE,
                                },
                            },
                            disc: {},
                            type: ORDER_ITEM_TYPE.RETORT,
                            totalDiscount: 0,
                        },
                    ],
                    updatedBy: {
                        email: "",
                        firstName: "",
                        id: 0,
                        lastName: "",
                    },
                    deletedBy: {
                        email: "",
                        firstName: "",
                        id: 0,
                        lastName: "",
                    },
                    createdAt: new Date("2025-01-18T07:59:14.439Z"),
                    updatedAt: null,
                    deletedAt: null,
                    notes: [],
                    orderItems: [],
                    couponCodes: [""],
                    discount: {},
                    price: {
                        "base-price": {
                            taxPercent: 0,
                            value: 2997,
                            tax: 539.46,
                            percent: 0,
                            type: PRICE_COMP_TYPE_CART.BASE_PRICE,
                            calc: VALUE_TYPE.ABSOLUTE,
                        },
                    },
                    createdBy: 0,
                    orderType: ORDER_TYPE.RM_ORDER,
                    franchise: undefined,
                };
                const content = await invoice(order!)
                // console.log("hjg");
                
                // console.log(content.toString('base64'));

                const returnData: AllMailOptions = {
                    to: to,
                    subject: this.getSubject(),
                    html: null,
                    attachments: [
                        {
                            filename: "invoice.pdf",
                            path: content.toString('base64')
                        },
                    ],
                };

                if (body.html) {
                    returnData.html = body.html as string;
                } else if (body.react) {
                    returnData.react = body.react;
                } else if (body.text) {
                    returnData.text = body.text as string;
                }
                return getSuccessDTO(returnData);
            } else if (!to) {
                return getHandledErrorDTO("to - invalid data");
            } else {
                return getUnhandledErrorDTO("internal error");
            }
        } catch (error: any) {
            return getUnhandledErrorDTO("invalid data", error);
        }
    }
    getSubject(): string {
        return "Welcome to the Tongue Tinglers Family!";
    }
}
