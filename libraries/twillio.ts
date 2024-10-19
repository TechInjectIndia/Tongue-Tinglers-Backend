import { Twilio } from 'twilio';
import { CONFIG } from '../config';

const twilioClient = new Twilio(CONFIG.TWILIO_ACCOUNT_SID, CONFIG.TWILIO_AUTH_TOKEN);

export const sendWhatsAppMessage = async (
    to: string,
    body: string,
    filePaths?: { path: string; name: string }[], // Array of file paths and names for attachments
) => {
    try {
        // Base message options
        const messageOptions: any = {
            from: `whatsapp:${CONFIG.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio WhatsApp number
            to: `whatsapp:${to}`,
            body,
        };

        // If filePaths are provided, send them as media attachments
        if (filePaths && filePaths.length > 0) {
            const mediaUrls = filePaths.map(file => file.path); // Extract URLs from filePaths
            messageOptions.mediaUrl = mediaUrls; // Adding media URLs to message options
        }

        // Sending WhatsApp message via Twilio
        const message = await twilioClient.messages.create(messageOptions);

        console.log('WhatsApp message sent:', message.sid);
        return message;
    } catch (err) {
        console.error('Error sending WhatsApp message:', err);
        throw err; // Propagate the error for further handling
    }
};
