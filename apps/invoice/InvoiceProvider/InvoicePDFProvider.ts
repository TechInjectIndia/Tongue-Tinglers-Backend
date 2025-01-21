import jsPDF from "jspdf";
import { getGSTNumber, getInvoiceNumber } from "../utils/invoice-utils";
import { INVOICE_BACKGROUND, INVOICE_BORDER, INVOICE_LOGO_URI } from "../models/invoice-constants";
import { type IInvoicePDFProvider } from "./IInvoicePDFProvider";
import { DTO, getHandledErrorDTO, getSuccessDTO } from "apps/common/models/DTO";
import { handleError } from "apps/common/utils/HelperMethods";
import type { ParsedOrder } from "apps/order/interface/Order";
import type { ParsedOrderItem } from "apps/order/interface/OrderItem";
import { formatDateUI } from "apps/common/utils/commonUtils";

class InvoicePDFProvider implements IInvoicePDFProvider {
    private readonly ROWS_ON_FIRST_PAGE = 5;
    private readonly ROWS_ON_FULL_PAGE = 18;
    private readonly ROWS_ON_LAST_PAGE_NO_GAP = 10;

    generate(order: ParsedOrder): DTO<null> {
        try {
            this.downloadPDF(order);
            return getSuccessDTO(null);
        } catch (error: any) {
            handleError(error, null);
            return getHandledErrorDTO(
                `error while downloading invoice pdf for ${order.id} : ${error.message ?? ""}`,
                error
            );
        }
    }

    getUI(order: ParsedOrder): DTO<string> {
        try {
            const res = this.getContent(order, true);
            return getSuccessDTO(res);
        } catch (error: any) {
            handleError(error, null);
            return getHandledErrorDTO(
                `error while getting Invoice UI for ${order.id} : ${error.message ?? ""}`,
                error
            );
        }
    }

    getTablesUI(order: ParsedOrder): string {
        const content: string = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invoice</title>
            </head>
            <body>
                <!--STYLES-->
                ${this.getStyles(true)}
                <div class="main">
                    <div class="container">  
                        <!--TABLE-->
                        ${this.getTables(order, true)}
                    </div>
                </div>
              
            </body>
            </html>`;

        return content;
    }

    // Private Functions:
    private downloadPDF(order: ParsedOrder) {
        const content = this.getContent(order);

        const pdf = new jsPDF("p", "mm", "a4"); // A4 dimensions: 210mm x 297mm

        const addImageBorder = (doc: jsPDF) => {
            const pageWidth = doc.internal.pageSize.width; // 210mm
            const pageHeight = doc.internal.pageSize.height; // 297mm

            const borderWidth = pageWidth;
            const borderHeight = pageHeight;

            const borderImage = INVOICE_BORDER;
            doc.addImage(borderImage, "PNG", 0, 0, borderWidth, borderHeight);
        };

        pdf.html(content, {
            callback: function (doc) {
                addImageBorder(doc);

                const totalPages = doc.internal.pages.length;
                for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                    doc.setPage(pageNumber);
                    addImageBorder(doc);
                }

                doc.save("invoice.pdf");
            },
            margin: 0,
            x: 0, 
            y: 0,
            html2canvas: {
                scale: 0.263, 
            },
            width: 180, 
            windowWidth: 798, 
        });
    }

    private getContent(order: ParsedOrder, forUi: boolean = false) {
        const content: string = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invoice</title>
            </head>
            <body>
            
            <!--STYLES-->
            ${this.getStyles()}
                
                <div class="main">
                        <img class="background-image" src="${INVOICE_BACKGROUND}" alt="Logo">
                        <div class="container ">
                            <!--Start Section-->
                            ${this.getHeader(order)}
                    
                            <!--TABLE-->
                                ${this.getTables(order, forUi)}
                
                            <!--Last Section-->
                                ${this.getFooter(order)}
                        </div>
                </div>
              
            </body>
            </html>`;

        return content;
    }

    private getStyles(forUi: boolean = false) {
        const res = `<style>
    .main {
        font-family: Arial, sans-serif;
        position:relative;
        font-size: 12px;
        font-weight: 800;
        margin: 0;
        padding: 0;
        width:inherit;
        aspect-ratio:1/1.414 ;
    } 
    .background-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1; 
    }
    
    .page-gap{
        width: 100%;
        height: 32rem;
    }

    .container {
        background: #fff;
        position: absolute; 
        width: 95%;
        top: 20px;
        bottom: 20px;
        left: 20px;
        right: 20px;
        z-index: 1; 
        padding: 20px 40px;
        /*border: 1px solid #ccc;*/
    }
    .top-header {
        text-align: right;
        font-weight: bold;
    }
    .header{
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        font-family: 'Arial, sans-serif'; 
        font-size: 2.5rem; 
        font-weight: bold;
    }
    .header p{
        font-family: 'Arial, sans-serif'; 
        font-size: 2.5rem; 
        font-weight: semi-bold;
    }
    
    .sub-header {
        text-align: center;
        margin: 10px 0;
    }

    .sub-header {
        display: flex;
        justify-content: space-between;
        padding: 0 0.75rem; 
        margin-bottom: 2.5rem;
    }

    .sub-header .left-section {
        text-align: left;
    }

    .sub-header .right-section {
        text-align: right;
    }

    .sub-header .title {
        font-size: 1rem; /* 16px */
        font-weight: 400;
    }

    .details {
        margin-top: 0.25rem; /* 8px */
        font-size: 15px;
    }

    .invoice-heading {
        font-size: 16px;
        font-weight: 600;
    }

    .invoice-value {
        font-size: 15px;
    }

    .invoice-date {
        font-size: 16px;
    }
    .section {
        margin: 10px 0;
    }
    .section-title {
        font-family: 'Arial, sans-serif'; 
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
    }
    .section-content p{
        font-size: 14px;
    }
    .table {
        width: 100%;
        border-collapse: collapse;
        
    }
    .table th,
    .table td {
        font-size: 15px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        padding: 15px 5px;
        
    }
    
    .table td{
        font-weight: 200;
    }
    .table .left-th {
        text-align: left;
    }
    .table .center-th {
        text-align: center;
    }
    .table .left-td {
        text-align: left;
    }
    .table .center-td {
        text-align: center;
    }
    
    .table .col-1{
        width: 10%
    }
    .table .col-2{
        width: 45%
    }
    .table .col-3, .col-4, .col-5{
        width: 15%
    }

    .totals-section {
        display: flex;
        justify-content: between;
        align-items: end;
        margin: 1.5rem 0;
    }
    .totals {
        width: 30%;
        align-text: center;
    }
    .totals p{
        text-align: center;
        width: 100%;
    }
    .totals .strong{
        font-weight: 500;
    }
    
    .thank-you{
        width: 70%;
        height: 100%;
    }

    .thank-you p{
        font-family: 'Arial, sans-serif'; 
        font-size: 2.5rem; 
        text-align: left;
        font-weight: 200;
        display: flex;
        margin-top: auto;
        margin-bottom: 0px;
    }
    
    .summary{
        font-family: Arial, sans-serif;    
        display: flex;
        justify-content: space-between;
    }

    .divider {
        border: none;
        height: 1px;
        /* Set the hr color */
        color: #333; /* old IE */
        background-color: #333;
    }
    .bottom-link{
        text-align: center;
        font-size: 15px;
        font-weight: 600;
        font-family: Arial, sans-serif;    
    }
    .address{
        font-family: Arial, sans-serif;
        font-weight: 400;
        font-size: 24px;   
        text-align: right;
    }
    .section-right{
        text-align: right;
    }

    .sub-details {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-top: 0.5rem;
    }
</style>`;
        return res;
    }

    private getHeader(order: ParsedOrder): string {
        const header = `<div>
            <div class="top-header">GST IN: ${getGSTNumber(order)}</div>
            <div class="header">
                <img src="${INVOICE_LOGO_URI}" alt="Logo" width="200" >
                <p>INVOICE</p>
            </div>
            <div class="sub-header">
                <div class="left-section">
                    <p class="title">
                    <b>BILLED TO:</b>
                    </p>
                    <p class="details">
                    ${order.billingAddress.firstName + " " + order.billingAddress.lastName}
                    <br />
                    ${order.billingAddress.phoneNumber}
                    <br />
                    ${order.billingAddress.street + ", " + order.billingAddress.city + ", " + order.billingAddress.state + ", " + order.billingAddress.country}
                    <br />
                    ${order.billingAddress.postalCode}
                    <br />
                    GST IN : ${getGSTNumber(order)}
                    </p>
                </div>
                <div class="right-section">
                    <p>
                    <span class="invoice-heading">Invoice No -</span>
                    <span class="invoice-value">${getInvoiceNumber(order)}</span>
                    </p>
                    <p class="invoice-date">${formatDateUI(order.createdAt)}</p>
                </div>
            </div>
        </div>`;

        return header;
    }

    private getFooter(order: ParsedOrder): string {
        const header = `  <div class="">
            <div class="totals-section">
                <div class="thank-you">
                    <p>Thank You!</p>
                </div>
                <div class="totals ">
                    <div class="summary">
                        <p class="strong">
                            <strong>Subtotal:</strong>
                        </p>
                        <br/>
                        <br/>
                        <p >
                            ${order.price["base-price"].value}
                        </p>
                        <br />
                    </div>
                    
                    <div class="summary">
                        <p class="strong">
                            <strong>Tax (18%):</strong>
                        </p>
                        <p>
                            ${order.totalTax}
                        </p>
                    </div>
                    <br/>
                    <hr class="divider">
                    <br/>
                    <div class="summary">
                        <p class="strong">
                            <strong>Total:</strong>
                        </p>
                        <p class="strong">
                            <strong>${order.price["base-price"].value + order.totalTax}</strong>
                        </p>
                    </div>
                </div>
            </div>


            <div class="sub-details">
                <div class="section">
                    <div class="section-title"> TERMS & CONDITIONS</div>
                    <div class="section-content">
                        <p>
                            1. All disputes are subject to Telangana Jurisdiction only.
                            <br />
                            2. Interest @24% p.a. will be charged if bill is not paid within 7 days.
                            <br />
                            3. TDS certification, if applicable, please share.
                        </p>
                    </div>
                </div>
            </div>
            <div class="sub-details">
                <div class="section">
                    <div class="section-title"> PAYMENT INFORMATION</div>
                    <div class="section-content">
                        <p>
                            HDFC BANK
                            <br />
                            Account Name: Tongue Tingler
                            <br />
                            Account No: 123-456-7890
                            <br />
                            IFSC:  HDFC0000408
                            <br />
                            Pay By: 29/11/2024
                        </p>
                    </div>
                </div>
                <div class="section">
                    <div><p class="address text-right"> Tongue Tingler </p></div>
                    <div class="section-content section-right">
                        <p>
                            123/76, Peter's Rd, Royapettah, Chennai,
                            <br />
                            Tamil Nadu 600014.
                            <br />
                            info@tonguetingler.com
                        </p>
                    </div>
                </div>
            </div>

            <div class="bottom-link">www.tonguetingler.com</div>
        </div>`;

        return header;
    }

    //     TABLES

    private getTables(order: ParsedOrder, forUi: boolean): string {
        const orderItems = order.items;
        const gap = ` <div class="page-gap"></div> `;

        if (forUi) return this.getTable(orderItems);

        if (orderItems.length <= this.ROWS_ON_FIRST_PAGE) {
            return this.getTable(orderItems);
        } else {
            const total = orderItems.length;

            const firstPageRows = orderItems.slice(0, this.ROWS_ON_FIRST_PAGE);

            // Other Pages:
            const startPoint = this.ROWS_ON_FIRST_PAGE;
            const forOtherPages = total - this.ROWS_ON_FIRST_PAGE;
            const mod =
                forOtherPages < this.ROWS_ON_FULL_PAGE ? 0 : forOtherPages % this.ROWS_ON_FULL_PAGE;
            const endPoint = forOtherPages - mod;

            const otherPagesRows = [];

            let lastPageStartPoint = startPoint;
            while (lastPageStartPoint < endPoint) {
                const page = orderItems.slice(
                    lastPageStartPoint,
                    lastPageStartPoint + this.ROWS_ON_FULL_PAGE
                );
                otherPagesRows.push(page);
                lastPageStartPoint = lastPageStartPoint + this.ROWS_ON_FULL_PAGE;
            }

            // last page;
            const lastPageRows = orderItems.slice(
                lastPageStartPoint,
                lastPageStartPoint + this.ROWS_ON_FULL_PAGE
            );

            // RESULT:

            const firstPageRes = this.getTable(firstPageRows);

            // other Pages Data
            const otherPagesRes =
                `${gap}` + otherPagesRows.map((page) => this.getTable(page) + gap).join(" ");

            let lastPageRes = lastPageRows.length > 0 ? this.getTable(lastPageRows) : ``;

            // add gap on lastPage

            if (lastPageRows.length > this.ROWS_ON_LAST_PAGE_NO_GAP) {
                const gapCount =
                    Math.ceil(Math.abs(this.ROWS_ON_FULL_PAGE - lastPageRows.length) / 3) + 1;

                for (let i = 0; i < gapCount; i++) {
                    lastPageRes += `${gap}`;
                }
            }

            const final = `${firstPageRes} ${otherPagesRes} ${lastPageRes}`;

            return final;
        }
    }

    private getTable(orderItems: ParsedOrderItem[]) {
        const res = `<table class="table">
            <thead>
                <tr>
                    <th class="left-th col-1">Sr. No</th>
                    <th class="left-th col-2">Items</th>
                    <th class="center-th col-3">Quantity</th>
                    <th class="center-th col-4">Unit Price</th>
                    <th class="center-th col-5">Total</th>
                </tr>
            </thead>
            <tbody>
               ${this.getRows(orderItems)}
            </tbody>
        </table>`;

        return res;
    }

    private getRows(orderItems: ParsedOrderItem[]) {
        const rows = orderItems.map((item, idx) => this.getRow(item, idx)).join(" ");

        return rows;
    }

    private getRow(orderItem: ParsedOrderItem, idx: number) {
        const res = `<tr>
                    <td class="left-td col-1">${idx + 1}</td>
                    <td class="left-td col-2">${orderItem.product.name}</td>
                    <td class="center-td col-3">${orderItem.quantity}</td>
                    <td class="center-td col-4">${orderItem.total_price}</td>
                    <td class="center-td col-5">${orderItem.total_price * orderItem.quantity}</td>
                </tr>`;
        return res;
    }
}

export { InvoicePDFProvider };
