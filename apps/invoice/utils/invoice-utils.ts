import { ParsedOrder } from "apps/order/interface/Order";

const getGSTNumber = (order: ParsedOrder) => {
    return "03AARFT8662Q1ZF";
} 

const getInvoiceNumber = (order: ParsedOrder) => {
    return "12323";
} 

export { getGSTNumber, getInvoiceNumber };
