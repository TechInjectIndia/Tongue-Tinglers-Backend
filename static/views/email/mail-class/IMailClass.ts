import { ReactElement } from "react";
import { AllMailOptions, MailBodyOptions } from "../models/MailOptions";
import { DTO } from "../../../../apps/common/models/DTO";


// Define the interface for the Mail class
export interface IMail<T> {
    getBody(data: T): MailBodyOptions;
    getPayload(data: any, to: string | Array<string>): DTO<AllMailOptions>;
    getSubject(data: T): string;
    parser(data: any): T; // Generic type T for the JSON structure
}