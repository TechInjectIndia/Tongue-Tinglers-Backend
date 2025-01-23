import { IMail } from "./IMailClass";
import { AllMailOptions, MailBodyOptions } from "../models/MailOptions";
import { DTO } from "../../../../apps/common/models/DTO";

// Define an abstract Mail class with generic types T (response) and R (request body)
export abstract class Mail<T> implements IMail<T> {
    abstract validator(data: any): string | null;
    abstract parser(data: any): T;
    abstract getBody(data: T): MailBodyOptions;
    abstract getPayload(data: any, to: string | Array<string>): Promise<DTO<AllMailOptions>>;
    abstract getSubject(data: T): string;
}
