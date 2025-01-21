import { logger } from "firebase-functions/v2";
import { jsPDF } from "jspdf";
import { type InvoiceOrderItem, type Invoice } from "../models/Invoice";
import { Timestamp } from "firebase-admin/firestore";
import { ParsedOrder } from "apps/order/interface/Order";
import { COMPANY_ADDRESS, COMPANY_NAME } from "../models/invoice-contants";
import { getStringFromAddress, getTotalDiscount } from "../utils/invoice-utils";
import { formatDateUI } from "apps/common/utils/commonUtils";

export async function invoice(order: ParsedOrder) {
    const data = invoiceDtoFromOrder(order);
    const jspdfData = await createInvoicePdf(data!);
    return jspdfData;
}

export async function shippingLabel(order: ParsedOrder) {
    const data = invoiceDtoFromOrder(order);
    const jspdfData = await createShippingLabelPdf(data!);
    return jspdfData;
}

function invoiceDtoFromOrder(order: ParsedOrder): Invoice | undefined {
    try {
        const invoiceId = order.id;
        const shippingCharge = order.totalShipping;
        const billingAddress = {
            name: `${order.billingAddress.firstName.trim()} ${order.billingAddress.lastName?.trim() ?? ""}`,
            address: `${order.billingAddress.street.trim()}, ${order.billingAddress.city ?? ""}, ${order.billingAddress.state ?? ""} `,
            pin: `${order.billingAddress.postalCode ?? ""}`,
            contact: `${order.billingAddress.phoneNumber ?? ""}`,
            email: `${order.customerDetails.email ?? ""}`,
        };
        const shippingAddress = {
            name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName ?? ""}`,
            address: `${order.shippingAddress.street.trim()}, ${order.shippingAddress.city ?? ""}, ${order.shippingAddress.state ?? ""} `,
            pin: `${order.shippingAddress.postalCode ?? ""}`,
            contact: `${order.shippingAddress.phoneNumber ?? ""}`,
            email: `${order.customerDetails.email ?? ""}`,
        };
        const companyDetails = {
            companyName: COMPANY_NAME,
            companyAddress: COMPANY_ADDRESS,
            returnAddress: COMPANY_ADDRESS,
        };

        const orderItems: InvoiceOrderItem[] = [];
        order.items.map((item) => {
            orderItems.push({
                name: item.product.name,
                // model: item.product.id,
                qty: item.quantity,
                unitPrice: item.total_price,
                selectedOption: item.productOption,
            });
        });
        return {
            invoiceId: invoiceId,
            billingDetails: billingAddress,
            shippingDetails: shippingAddress,
            companyDetails: companyDetails,
            orderItems: orderItems,
            tax: order.totalTax,
            discount: getTotalDiscount(order),
            subTotal: order.price["base-price"].value,
            grandTotal: order.price["base-price"].value + order.totalTax,
            date: formatDateToDDMMYYYY(getDateFromTimeStamp(order.createdAt)),
            shippingCharge: shippingCharge,
            contact: order.customerDetails.phoneNumber,
            paymentType: order.paymentType,
            // rewardPoints: order.pointsData ? order.pointsData.value + order.pointsData.tax : 0,
            couponCode: order.couponCodes.length > 0 ? order.couponCodes[0] : null,
            paymentId: order.paymentId,
            // note:
            //     order.customerDetails.notes.length > 0 &&
            //     order.customerDetails.notes[0].createdBy === order.customerDetails.uid
            //         ? order.customerDetails.notes[0].note 
            //         : null,
        };
    } catch (e) {
        logger.error(e);
        return undefined;
    }
}

async function createInvoicePdf(invoice: Invoice) {
    const doc = initializeDoc();
    await addLogo(doc);
    const yvalue = addShippingDetails(doc, invoice);
    addCompanyDetails(doc, invoice);
    // addShippingDetails(doc, invoice);
    addPaymentDetails(doc, invoice);
    addInvoiceInfo(doc, invoice);
    const summaryStart = addOrderItemsTable(doc, invoice, yvalue + 10);
    addSummarySection(doc, invoice, summaryStart);
    return Buffer.from(doc.output(), "binary");
}

async function createShippingLabelPdf(invoice: Invoice) {
    const doc = initializeDoc();
    await addLogo(doc);
    addShippingDetails(doc, invoice);
    addShippingCompanyDetails(doc, invoice);
    addInvoiceInfo(doc, invoice);
    addPaymentDetails(doc, invoice);
    const n = addShippingItemsTable(doc, invoice);
    doc.rect(25, n, 400, 0, "FD");
    return Buffer.from(doc.output(), "binary");
}

/* eslint-disable new-cap */
function initializeDoc() {
    return new jsPDF("p", "px", "a4", true);
}

async function addLogo(doc: jsPDF) {
    const logoHeight = 15;
    const logoPositionY = 20;
    doc.setFontSize(10).setFont("helvetica", "normal");
    const dateUTC = new Date();
    let date = dateUTC.getTime();
    let dateIST = new Date(date);
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    doc.text(formatDateUI(new Date(dateIST), true), 30, 15);
    doc.setFontSize(14).setFont("helvetica", "normal");
    doc.setFontSize(10).setFont("helvetica", "normal");
    // doc.text("Telephone : ", 30, logoPositionY + logoHeight);
    // doc.text(TELEPHONE, 75, logoPositionY + logoHeight);
    // doc.text("Email : ", 30, logoPositionY + logoHeight + 10);
    // doc.text(EMAIL, 55, logoPositionY + logoHeight + 10);
    // doc.text("Website : ", 30, logoPositionY + logoHeight + 20);
    // doc.text(WEBSITE, 65, logoPositionY + logoHeight + 20);
}

function addShippingDetails(doc: jsPDF, invoice: Invoice) {
    let yvalue = 100;
    doc.rect(25, 80, 400, 0, "FD");
    doc.setFontSize(14).setFont("helvetica", "normal");
    doc.setTextColor("black");

    doc.setFontSize(10).setFont("helvetica", "bold");
    doc.text("Shipping Address:", 155, 100);

    doc.setFontSize(10).setFont("helvetica", "normal");
    doc.text(capitalizeWordsAndSlash(invoice.shippingDetails.name), 155, 110);

    let addressStr = capitalizeWordsAndSlash(invoice.shippingDetails.address);
    addressStr = addressStr.replace(/[\n\r]/g, "");

    const words = breakIntoLines(addressStr, 27);
    doc.setFontSize(10).setFont("helvetica");
    doc.text(words[0], 155, 120);

    if (words[3]) {
        yvalue = 170;
        doc.text(words[1], 155, 130);
        doc.text(words[2], 155, 140);
        doc.text(words[3], 155, 150);
        doc.text(capitalizeWordsAndSlash(invoice.shippingDetails.pin), 155, 160);
        doc.text(invoice.shippingDetails.contact, 155, 170);
    } else if (words[2]) {
        yvalue = 160;
        doc.text(words[1], 155, 130);
        doc.text(words[2], 155, 140);
        doc.text(capitalizeWordsAndSlash(invoice.shippingDetails.pin), 155, 150);
        doc.text(invoice.shippingDetails.contact, 155, 160);
    } else if (words[1]) {
        yvalue = 150;
        doc.text(words[1], 155, 130);
        doc.text(capitalizeWordsAndSlash(invoice.shippingDetails.pin), 155, 140);
        doc.text(invoice.shippingDetails.contact, 155, 150);
    } else {
        yvalue = 140;
        doc.text(capitalizeWordsAndSlash(invoice.shippingDetails.pin), 155, 130);
        doc.text(invoice.shippingDetails.contact, 155, 140);
    }
    return yvalue;
}

function addPaymentDetails(doc: jsPDF, invoice: Invoice) {
    doc.setFontSize(14).setFont("helvetica");
    doc.setTextColor("black");

    doc.setFontSize(10).setFont("helvetica", "bold");
    doc.text("Payment Details:", 300, 100);
    doc.setFontSize(10).setFont("helvetica", "normal");
    doc.text("Payment Method:", 300, 110);
    doc.text(invoice.paymentType, 360, 110);
    doc.text("Payment Id:", 300, 120);
    doc.text(invoice.paymentId ?? "-", 342, 120);
}

function addCompanyDetails(doc: jsPDF, invoice: Invoice) {
    const logoPositionX = doc.internal.pageSize.getWidth() - 100 + 10;
    doc.setFontSize(30).setFont("helvetica", "italic");
    doc.text("Invoice #" + invoice.invoiceId, logoPositionX - 120, 45);
    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.setTextColor("black");
}

function addShippingCompanyDetails(doc: jsPDF, invoice: Invoice) {
    const logoPositionX = doc.internal.pageSize.getWidth() - 100 + 10;
    doc.setFontSize(18).setFont("helvetica", "italic");
    doc.text("Dispatch Note #" + invoice.invoiceId, logoPositionX - 95, 25);
    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.setTextColor("black");
    doc.text("From Address:", logoPositionX - 45, 45);
    doc.setFontSize(10).setFont("helvetica", "normal");
    doc.text(invoice.companyDetails.companyName, logoPositionX - 45, 55);

    const addressArr = breakIntoLines(
        capitalizeWordsAndSlash(getStringFromAddress(invoice.companyDetails.companyAddress)),
        25
    );
    addressArr.forEach((add, index) => {
        doc.setFontSize(10).setFont("helvetica");
        doc.text(add, logoPositionX - 45, 55 + (index + 1) * 10);
    });
}

function addInvoiceInfo(doc: jsPDF, invoice: Invoice) {
    doc.setFontSize(14).setFont("helvetica");
    doc.setTextColor("black");
    const positionX = 30;

    doc.setFontSize(10).setFont("helvetica");
    doc.text("Order Id:", positionX, 100);

    doc.setFontSize(10).setFont("helvetica");
    doc.text(invoice.invoiceId.toString(), positionX + 32, 100);

    doc.setFontSize(10).setFont("helvetica");
    doc.text("Date:", positionX, 110);

    doc.setFontSize(10).setFont("helvetica");
    doc.text(String(invoice.date), positionX + 20, 110);

    doc.setFontSize(10).setFont("helvetica");
}

function addOrderItemsTable(doc: jsPDF, invoice: Invoice, yvalue: number): number {
    const tableLeft = 25;
    const rowHeight = 15;

    doc.setFontSize(10).setFont("helvetica", "bold");

    doc.setTextColor("black");
    doc.setFillColor("white");

    doc.rect(tableLeft, yvalue + 5, 257, 17, "FD");
    doc.rect(282, yvalue + 5, 30, 17, "FD");
    doc.rect(312, yvalue + 5, 60, 17, "FD");
    doc.rect(372, yvalue + 5, 53, 17, "FD");

    doc.text("Product", tableLeft + 5, yvalue + rowHeight);
    doc.text("Qty.", tableLeft + 260, yvalue + rowHeight);
    doc.text("Unit Price", tableLeft + 290, yvalue + rowHeight);
    doc.text("Total", tableLeft + 350, yvalue + rowHeight);
    doc.setFontSize(10).setFont("helvetica", "normal");

    // Add table rows

    doc.setTextColor("black");
    doc.setFillColor("white");

    yvalue = yvalue + 1.5 * rowHeight;
    doc.setFontSize(10).setFont("helvetica");
    doc.setTextColor("black");

    return printItems(doc, invoice.orderItems, yvalue);
}

function printItems(doc: jsPDF, arr: InvoiceOrderItem[], y: number): number {
    const tableLeft = 25;

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        y = printItem(item, tableLeft, y, doc);
    }
    return y;
}

const printItem = (item: InvoiceOrderItem, x: number, y: number, doc: jsPDF): number => {
    let yvalue = y;
    const quantity = item.qty;
    let price = item.unitPrice;
    const total = item.unitPrice * item.qty;
    const height = checkRowHeight(item);
    const isNew = isFullLengthUsed(y + height, doc);

    if (isNew) {
        y = 50;
        yvalue = 50;
    }

    doc.setTextColor("black");
    doc.setFillColor("white");

    doc.rect(x, y, 257, height + 9, "FD");
    doc.rect(282, y, 30, height + 9, "FD");
    doc.rect(312, y, 60, height + 9, "FD");
    doc.rect(372, y, 53, height + 9, "FD");

    doc.text(item.name, x + 5, y + 10);
    y = y + 10;

    doc.setFontSize(10).setFont("helvetica");
    doc.text(String(quantity), x + 260, y);
    doc.text("Rs. " + String(price.toFixed(2)), x + 290, y);
    doc.text("Rs. " + String(total.toFixed(2)), x + 350, y);

    Object.keys(item.selectedOption).forEach((key) => {
        doc.setFontSize(7).setFont("helvetica");
        doc.text(`-${key} : ${item.selectedOption[key]}`, x + 5, y + 10);
        y = y + 7;
    });
    doc.setFontSize(10).setFont("helvetica");
    return yvalue + height + 9;
};

const checkRowHeight = (item: InvoiceOrderItem): number => {
    let rowHeight = 0;
    rowHeight = rowHeight + 10;
    const length = Object.keys(item.selectedOption).length;
    rowHeight = rowHeight + length * 9;
    return rowHeight;
};

const isFullLengthUsed = (h: number, doc: jsPDF) => {
    const finalHeight = doc.internal.pageSize.getHeight() - 50;
 
    if (h > finalHeight) {
        doc.addPage();
        return true;
    } else {
        return false;
    }
};
/**
 * Recursively adds order items to multiple pages of the PDF document if needed.
 *
 * @param {jsPDF} doc - The PDF document to which the order items will be added.
 * @param {InvoiceOrderItem[]} arr - An array of InvoiceOrderItem objects representing the items to be added.
 * @return {number} The final Y-coordinate position after printing all order items.
 */
function orderItemsRecursion(doc: jsPDF, arr: InvoiceOrderItem[]): number {
    if (arr.length < 11) {
        doc.addPage();
        return printItems(doc, arr, 50);
    }

    doc.addPage();
    printItems(doc, arr.slice(0, 11), 50);
    return orderItemsRecursion(doc, arr.slice(11));
}

/**
 * Adds a summary section to the PDF document, including sub-total, shipping charge, discount (coupon), and grand total.
 *
 * @param {jsPDF} doc - The PDF document to which the summary section will be added.
 * @param {Invoice} invoice - The Invoice object containing the summary details.
 * @param {number} summaryStart - The Y-coordinate position where the summary section should start.
 * @param {number} shippingCharge - The shipping charge to be included in the summary.
 */
function addSummarySection(doc: jsPDF, invoice: Invoice, summaryStart: number) {
    const isFullLength = isFullLengthUsed(summaryStart + 50, doc);
    if (isFullLength) {
        summaryStart = 50;
    }

    doc.rect(25, summaryStart, 400, 0, "FD");
    let startY = summaryStart + 10;
    doc.setFontSize(9).setFont("helvetica");
    doc.text("Subtotal :", 315, startY);
    doc.setFontSize(9).setFont("helvetica");
    doc.text("Rs. " + String(invoice.subTotal.toFixed(2)), 380, startY);

    doc.setFontSize(9).setFont("helvetica");
    doc.text("Total Items :", 245, startY);
    doc.setFontSize(9).setFont("helvetica");
    doc.text(String(getTotalItemsQty(invoice.orderItems)), 285, startY);

    // if (invoice.note) {
    //     doc.setFontSize(9).setFont("helvetica");
    //     doc.text("Note :", 30, startY);
    //     doc.setFontSize(9).setFont("helvetica");
    //     doc.text(invoice.note, 50, startY ,{maxWidth:150});
    
    // }

    if (invoice.couponCode) {
        doc.text("Coupon Code :", 315, startY + 10);
        doc.setFontSize(9).setFont("helvetica");
        doc.text(String(invoice.couponCode), 380, startY + 10);
        startY = startY + 10;
    }

    // doc.text("Credits :", 315, startY + 10);
    // doc.setFontSize(9).setFont("helvetica");
    // doc.text("- " + "Rs. " + String(invoice.rewardPoints?.toFixed(2) ?? 0), 376, startY + 10);
    
    doc.setFontSize(9).setFont("helvetica");
    doc.text("Shipping :", 315, startY + 20);
    doc.setFontSize(9).setFont("helvetica");
    doc.text("+ " + "Rs. " + String(invoice.shippingCharge?.toFixed(2) ?? 0), 376, startY + 20);

    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.rect(315, startY + 25, 115, 0, "FD");
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("Total :", 315, startY + 35);
    doc.text("Rs. " + String(invoice.grandTotal.toFixed(2)), 376, startY + 35);
    doc.setFontSize(6).setFont("helvetica", "normal");
}

function printShippingItems(doc: jsPDF, arr: InvoiceOrderItem[], y: number): number {
    const rowHeight = 55;
    const tableLeft = 25;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        let yVal = 10;
        const quantity = item.qty;

        const nameStringArr = breakSentence(item.name, 40);

        // const sku = capitalizeWordsAndSlash(item.model);
        // doc.text(sku, tableLeft + 200, y + yVal);
        
        doc.text(String(quantity), tableLeft + 300, y + yVal);
        doc.setFontSize(10).setFont("helvetica");
        doc.text("0 " + "g", tableLeft + 355, y + yVal);

        const nameStringLines = nameStringArr.length;

        nameStringArr.forEach((name, index) => {
            doc.text(name, tableLeft + 5, y + (index + 1) * 10);
        });

        let yValue = y + (nameStringLines + 1) * 10;

        Object.keys(item.selectedOption).forEach((key, index) => {
            doc.setFontSize(7).setFont("helvetica");
            if (index < 3) {
                doc.text(" - " + key + " : " + item.selectedOption[key], tableLeft + 5, yValue);
                yValue = yValue + (index + 1 * 8);
            } else {
                doc.text(" - " + key + " : " + item.selectedOption[key], tableLeft + 40, yValue);
                yValue = yValue + (index - 2 + 1 * 8);
            }
        });
        doc.setFontSize(10).setFont("helvetica");

        y = y + rowHeight;
    }

    return y;
}

/**
 * Adds an order items table to the PDF document, including SKU, product name, quantity, price, and total columns.
 *
 * @param {jsPDF} doc - The PDF document to which the order items table will be added.
 * @param {Invoice} invoice - The Invoice object containing the order items to display in the table.
 * @return {number} The Y-coordinate position after adding the table.
 */
function addShippingItemsTable(doc: jsPDF, invoice: Invoice): number {
    const tableTop = 220;
    const tableLeft = 25;
    const rowHeight = 15;

    doc.setFontSize(10).setFont("helvetica", "bold");

    doc.setTextColor("black");
    doc.setFillColor("white");

    doc.text("Product", tableLeft + 5, tableTop + rowHeight);
    doc.text("Model", tableLeft + 200, tableTop + rowHeight);
    doc.text("Qty.", tableLeft + 300, tableTop + rowHeight);
    doc.text("weight", tableLeft + 355, tableTop + rowHeight);
    doc.setFontSize(10).setFont("helvetica", "normal");

    // Add table rows

    doc.setTextColor("black");
    doc.setFillColor("white");

    doc.rect(tableLeft, tableTop + 25, 400, 0, "FD");

    const y = tableTop + 2 * rowHeight;
    doc.setFontSize(10).setFont("helvetica");
    doc.setTextColor("black");

    // exceeding page
    const finalHeight = doc.internal.pageSize.getHeight() - 50;

    const heightY = y + invoice.orderItems.length * 60;

    if (heightY > finalHeight) {
        printShippingItems(doc, invoice.orderItems.slice(0, 6), y);
        return shippingItemsRecursion(doc, invoice.orderItems.slice(6));
    }

    return printShippingItems(doc, invoice.orderItems, y);
}

function shippingItemsRecursion(doc: jsPDF, arr: InvoiceOrderItem[]): number {
    if (arr.length < 9) {
        doc.addPage();
        return printShippingItems(doc, arr, 50);
    }

    doc.addPage();
    printShippingItems(doc, arr.slice(0, 9), 50);
    return orderItemsRecursion(doc, arr.slice(9));
}

//
function capitalizeWordsAndSlash(str: string) {
    const words = str.split(" ");
    const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const result = capitalizedWords.join(" ");
    const finalResult = result.replace(/\/./g, (match) => {
        return "/" + match.charAt(1).toUpperCase();
    });
    return finalResult;
}

export const getDateFromTimeStamp = (dd: Timestamp | Date | string): Date | string => {
    const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (typeof dd === "string") {
        if (pattern.test(dd)) {
            return new Date(dd);
        }
        return dd;
    } else if (dd instanceof Date) return dd;
    else if (dd instanceof Timestamp) {
        // @ts-ignore
        return new Timestamp(dd.seconds, dd.nanoseconds).toDate();
    } else {
        return new Date();
    }
};

export function formatDateToDDMMYYYY(date: Date | string) {
    if (typeof date === "string") {
        // const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        return date;
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export function breakIntoLines(text: string, maxLength: number) {
    const wordsArray = text.split(" ");
    let lines = [];
    let currentLine = "";

    for (let i = 0; i < wordsArray.length; i++) {
        const word = wordsArray[i];
        if ((currentLine + word).length <= maxLength) {
            currentLine += word + " ";
        } else {
            lines.push(currentLine.trim());
            currentLine = word + " ";
        }
    }

    if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
    }

    return lines;
}

function breakSentence(sentence: string, length: number) {
    if (sentence.length <= length) {
        return [sentence];
    } else {
        let brokenSentence = [];
        let words = sentence.split(" ");
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
            if ((currentLine + words[i]).length <= length) {
                currentLine += (currentLine === "" ? "" : " ") + words[i];
            } else {
                brokenSentence.push(currentLine);
                currentLine = words[i];
            }
        }

        brokenSentence.push(currentLine);

        return brokenSentence;
    }
}

const getTotalItemsQty = (items: InvoiceOrderItem[]) => {
    let totalQty: number = 0;

    items.forEach((item) => {
        totalQty += Number(item.qty);
    });

    return totalQty;
};
