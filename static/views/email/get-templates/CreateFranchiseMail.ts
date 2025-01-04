import { IMail } from "../mail-class/IMailClass";
import { Mail } from "../mail-class/MailClass";
import { AllMailOptions, MailBodyOptions } from "../models/MailOptions";
import CreateFranchise from "../react-templates/CreateFranchise";
import { DTO, getSuccessDTO, getUnhandledErrorDTO, getHandledErrorDTO } from "../../../../apps/common/models/DTO";

interface IWelcomeMail extends IMail<null> {}

export class CreateFranchiseMail extends Mail<null> implements IWelcomeMail {
    validator(data: any): string | null {
        return null;
    }

    parser(data: any): null {
        return null;
    }

    getBody(data: any): MailBodyOptions {
        const react = CreateFranchise(data);
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
        return "Welcome to the Tongue Tinglers Ecosystem!";
    }
}
