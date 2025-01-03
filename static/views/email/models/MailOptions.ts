import { ReactElement } from "react";

export interface AllMailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html: string | undefined | null;
    react?: React.JSX.Element | null;
    attachments: {
        filename: string | false | undefined; // allow `false | undefined`
        path?: string;
    }[];
}

export interface MailBodyOptions {
    react: ReactElement | null,
    html: HTMLElement | String | null,
    text: string | null,
}