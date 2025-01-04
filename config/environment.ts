import * as path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const CONFIG = {
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD, 
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT || 3001,
    ENVIRONMENT: process.env.ENVIRONMENT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
    APP_BASE_URL: process.env.APP_BASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    BUCKET_URL: process.env.BUCKET_URL,
    RP_ID_PROD: process.env.RP_ID_PROD,
    RP_SECRET_PROD: process.env.RP_SECRET_PROD,
    RP_WEBHOOK_SECRET: process.env.RP_WEBHOOK_SECRET,
    RP_CALLBACK: process.env.RP_CALLBACK,
    RP_CALLBACK_ORDERS: process.env.RP_CALLBACK_ORDERS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    PRODUCTION: process.env.PRODUCTION,
    // TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    // TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    // TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER,
};
