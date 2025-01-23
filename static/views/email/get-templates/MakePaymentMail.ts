
import { type IMail } from "../mail-class/IMailClass";
import { Mail } from "../mail-class/MailClass";
import MakePayment from "../react-templates/MakePayment";

import { AllMailOptions, MailBodyOptions } from "../models/MailOptions";
import { DTO, getHandledErrorDTO, getSuccessDTO, getUnhandledErrorDTO } from "apps/common/models/DTO";

interface IWelcomeMail extends IMail<null> {}

export class MakePaymentMail extends Mail<null> implements IWelcomeMail {
    validator(data: any): string | null {
        return null;
    }

    parser(data: any): null {
        return null;
    }

    getBody(data: any): MailBodyOptions {
        const react = MakePayment(data);
        return {
            html: null,
            react: react,
            text: null,
        };
    }

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
        return "Complete Your Journey – Make Your Payment";
    }
}
