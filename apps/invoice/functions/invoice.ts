import * as cors from "cors";
import { getSuccessDTO } from "../../common/models/DTO";
import { ServerRepoProvider } from "../../common/ServerRepoProvider";
import { HttpRequest } from "../../middlewares/firebase-functions-wrappers";
import { invoice, shippingLabel } from "./create-invoice";
import { https } from "firebase-functions/v2";
import { Response } from "express";
import { isEmpty } from "../../common/utils/common-utils";

const corsOptions: cors.CorsOptions = {
    origin: true,
    methods: ["POST"], // Only allow POST requests
};

// Define any HTTPS options if necessary

const invoiceHandler = async (request: https.Request, response: Response): Promise<void> => {
    try {
        const body = request.body;

        if (!body || typeof body !== "object") {
            response.status(400).send(getSuccessDTO({ error: "No payload found" }));
            return;
        }

        const { type, orderId } = body;

        if (!type || (type !== "invoice" && type !== "shippingNote")) {
            response.status(400).send(getSuccessDTO({ error: "Type not found" }));
            return;
        }

        if (!orderId || isEmpty(orderId)) {
            response.status(400).send(getSuccessDTO({ error: "Order ID not found" }));
            return;
        }

        const orderDto = await ServerRepoProvider.orderRepo.getOrderById(orderId);

        if (!orderDto.success) {
            response.status(404).send(getSuccessDTO({ error: "Order not found" }));
            return;
        }

        const order = orderDto.data;

        if (type === "invoice") {
            const data = await invoice(order!);
            response.status(200).send(getSuccessDTO({ data }));
            return;
        } else if (type === "shippingNote") {
            const data = await shippingLabel(order!);
            response.status(200).send(getSuccessDTO({ data }));
            return;
        }


    } catch (error) {
        console.error("Error processing request:", error);
        response.status(500).send(getSuccessDTO({ error: "Internal Server Error" }));
    }
};

export const createInvoice = HttpRequest(
    { region: "asia-south1" },
    corsOptions,
    "POST",
    invoiceHandler
);
