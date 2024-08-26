import sgMail from "@sendgrid/mail";

export enum TemplateId {
    WelcomeAdminUser = "d-26e4937c40c541bdbbf13670992fdc07",
}

export const sendEmail = async (
    receiverEmail: string,
    templateId: TemplateId,
    dynamicTemplateData: any,
    attachments?: any,
): Promise<void> => {
    const senderEmail = "noreply@tonguetingler.com";
    try {
        const msg = {
            to: receiverEmail,
            from: senderEmail,
            templateId,
            dynamicTemplateData,
            attachments
        };

        await sgMail.send(msg);
    } catch (err) {
        throw new Error(err);
    }
};
