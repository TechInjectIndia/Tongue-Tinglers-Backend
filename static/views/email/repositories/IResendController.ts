import { DTO } from "../../../../apps/common/models/DTO";
import { ResendMailOptions } from "../models/MailOptions";


export interface IResendController {
    sendMail(mailOptions: ResendMailOptions): Promise<DTO<boolean>>;
}

