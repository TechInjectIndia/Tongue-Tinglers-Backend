import { DTO, getHandledErrorDTO, getSuccessDTO, getUnhandledErrorDTO } from "../../../../apps/common/models/DTO";
import LeadToProspect from "../react-templates/LeadToProspect";
import { IMail } from "../mail-class/IMailClass";
import { Mail } from "../mail-class/MailClass";
import { AllMailOptions, MailBodyOptions } from "../models/MailOptions";

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

    getPayload(data: any, to: string | Array<string>): DTO<AllMailOptions> {
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
