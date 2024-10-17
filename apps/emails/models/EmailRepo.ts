export class EmailRepo {

    public async sendEmail(to: string, subject: string, body: string, fileUrls: string[]) {
        const mailOptions = {
            from: 'your-email@gmail.com', // Replace with your email
            to,
            subject,
            text: body,
            attachments: fileUrls.map(url => ({ path: url })),
        };

    }
}
