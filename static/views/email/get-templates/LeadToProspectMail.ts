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

                const returnData: AllMailOptions = {
                    to: to,
                    subject: this.getSubject(),
                    html: null,
                    attachments: [],
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
