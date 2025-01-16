import {BaseOrder, Order, ORDER_TYPE, ParsedOrder} from "../interface/Order"
import {parseOrderItem} from "../../order-items/parser/parseOrderItem";
import {
    BaseOrderItem,
    PRICE_COMP_TYPE_CART,
    VALUE_TYPE
} from "../interface/OrderItem";
import {PendingOrder} from "../../pending-orders/interface/PendingOrder";
import {OrderModel} from "../models/OrderTable";
import {OrderItemsModel} from "../../order-items/models/OrderItemsTable";
import { parseCustomerDetails, parseUserToMetaUser } from "apps/user/parser/user-parser";
import { UserModel } from "apps/user/models/UserTable";
import { ParsedUser } from "apps/user/interface/user";
import { parseFranchise } from "apps/franchise/parser/franchiseParser";


const parseOrder = (order: any): ParsedOrder => {
    console.log('order.orderItems: ', order.orderItems);
    const productVariations = order.orderItems.map((orderItem: any) =>{
            console.log(">>>>>>>parseOrderItem>>>>>>>>>>>",parseOrderItem(orderItem));
            parseOrderItem(orderItem)
        }
    );

console.log("productVariations: ",productVariations)

    const data: ParsedOrder = {
        anomalyArr: [],
        billingAddress: order.billingAddress,
        cancelledItems: [],
        coupon: "",
        couponCodes: [],
        createdAt: order.created_at,
        createdBy: order.createdByUser ? parseUserToMetaUser(order.createdByUser) : null,
        customerDetails: order.customer ? parseCustomerDetails(order.customer) : null,
        deletedAt: order.deletedAt,
        deletedBy: order.deletedByUser ? parseUserToMetaUser(order.deletedByUser) : null,
        deliveryDetails: order.delivery_details,
        deliveryStatus: order.delivery_status,
        discount: null,
        id: order.id,
        items: [],
        notes: [],
        orderItems: productVariations,
        paymentId: order.payment_id,
        paymentType: order.payment_type,
        price: order.prices,
        shippingAddress: order.shippingAddress,
        status: order.status,
        total: order.total,
        totalDiscount: order.total_discount,
        totalShipping: order.total_shipping,
        totalTax: order.total_tax,
        updatedAt: order.updatedAt,
        updatedBy: order.updatedByUser ? parseUserToMetaUser(order.updatedByUser) : null,
        orderType: order.orderType,
        franchise: order.franchise ? parseFranchise(order.franchise) : null
    };

    return data; // Return the result
};


// const parseOrder = async (order: any): Promise<ParsedOrder> => {
//     // console.log('order.orderItems: ', order.orderItems);
//     const customerDetails = await UserModel.findOne(({where: {id: order.customer_details},attributes:['id', 'firstName', 'lastName','email']}))
//     console.log('customerDetails: ', customerDetails);
//     // Use await inside map to ensure promises are resolved
//     const productVariations = await Promise.all(
//         order.orderItems.map(async (orderItem: any) => {// Await the parseOrderItem result
//             return await parseOrderItem(orderItem); // Ensure to return the parsed item
//         })
//     );



//     const data: ParsedOrder = {
//         anomalyArr: [],
//         billingAddress: undefined,
//         cancelledItems: [],
//         coupon: "",
//         couponCodes: [],
//         createdAt: order.created_at,
//         createdBy: order.createdBy,
//         customerDetails: customerDetails as unknown as ParsedUser,
//         deletedAt: order.deletedAt,
//         deletedBy: order.deletedBy,
//         deliveryDetails: null,
//         deliveryStatus: "",
//         discount: null,
//         id: 0,
//         items: [],
//         notes: [],
//         orderItems: productVariations, // Now populated with the resolved values
//         paymentId: 0,
//         paymentType: null,
//         price: order.price,
//         shippingAddress: order.shippingAddress,
//         status: order.status,
//         total: 0,
//         totalDiscount: 0,
//         totalShipping: 0,
//         totalTax: 0,
//         updatedAt: order.updatedAt,
//         updatedBy: order.updatedBy,
//     };

//     return data; // Return the result
// };


export const parseAndSavePendingOrderToOrder = async (pendingOrder: PendingOrder): Promise<any> => {
    try {
        // Extract relevant data from PendingOrder
        let {
            orderId,
            status,
            total,
            totalTax,
            deliveryStatus,
            customerDetails,
            paymentType,
            paymentId,
            paymentOrderId,
            cancelledItems,
            discount,
            totalDiscount,
            deliveryDetails,
            shippingAddress,
            totalShipping,
            anomalyArr,
            coupon,
            items,
            price,
            couponCodes,
        } = pendingOrder;

        // Create the order object that will be saved in the database
        const orderData:BaseOrder = {
            cancelled_items: null,
            customer_details: customerDetails.id,
            deletedBy: 1,
            delivery_details: null,
            updatedBy: null,
            status,
            item_count: items.length, // Assuming items contain the order items
            total,
            total_tax: 0,
            delivery_status: null,
            payment_id: paymentId,
            payment_type: null,
            total_discount: null,
            total_shipping: null,
            franchise: null, // Replace with logic if necessary
            billingAddress: shippingAddress, // Assuming billingAddress is the same as shippingAddress for simplicity
            shippingAddress: shippingAddress,
            anomalyArr:null,
            prices: JSON.stringify(price), // Converting price to JSON string if it's an object
            discount_prices: null, // Assuming discount is an object
            order_type: ORDER_TYPE.RM_ORDER, // Assuming order type is RM_ORDER
            createdBy: customerDetails.id // Assuming the `createdBy` field comes from the customer
        };


        const orderItems:BaseOrderItem[] = pendingOrder.items.map((pr)=>{
            return {
                product_id: pr.product.id,
                product_option_id: pr.productOption.id,
                quantity: pr.quantity,
                total_price: pr.total_price,
                total_tax: pr.totalTax,
                coupon_discount: 0,
                points_discount: 0,
                student_discount: 0,
                type: pr.type
            }
        });

        //
        const response = await  OrderItemsModel.bulkCreate(orderItems);
        const orderInstance = await OrderModel.create(orderData);
        await orderInstance.addOrderItems(response)

    } catch (error) {
        console.error("Error parsing pending order to order:", error);
        throw new Error("Failed to parse pending order to order");
    }
};


export { parseOrder };
