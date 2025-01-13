import { NextFunction, Request, Response } from "express";
const axios = require("axios");
import { ZohoSignRepo } from "../models/zohosign";

import { get, isEmpty } from "lodash";
import FormData from "form-data";
import fs from "fs";
import crypto from "crypto";
import { jsonData } from "../../../types";
import { ContractRepo } from "apps/contracts/models/ContractRepo";
import {CONTRACT_STATUS, SignDoc} from "apps/contracts/interface/Contract";


const { ZOHO_WEBHOOK_SECRET } = process.env;

export default class ZohoSignController {
    // Validate sign for webhook
    static async validateSignature(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // Function to validate the HMAC signature
        const receivedSignature = req.headers["x-zoho-sign-webhook-signature"];
        const computedSignature = crypto
            .createHmac("sha256", ZOHO_WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (receivedSignature === computedSignature) {
            next(); // Signature is valid, proceed to the handler
        } else {
            res.status(400).send("Invalid signature");
        }
    }

    // Webhook endpoint
    static async callback(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;

        if (payload.requests && payload.requests.zsdocumentid) {
            const id = payload.requests.zsdocumentid;
            const existingContract =
                await new ContractRepo().getContractByDocId(id);

            console.log(existingContract);

            if (existingContract) {
                const data: SignDoc = {
                    docId: id,
                    sentBy: 0,
                    createdAt: new Date(),
                    status: payload.requests.actions[0].action_status,
                    docLink: "",
                    signedDate:
                        payload.requests.actions[0].action_status === "SIGNED"
                            ? new Date()
                            : null,
                    notes: null,
                };
                if (data.signedDate) {
                    existingContract.signedDate = new Date();
                }
                existingContract.signedDocs.push(data);
                console.log(existingContract);

                await new ZohoSignRepo().handleZohoSignCaptured(
                    existingContract.id,
                    existingContract.signedDocs
                );

                // const res = await new ContractRepo().update(
                //     existingContract.id,
                //     existingContract
                // );
                // console.log(res);
            } else {
                console.log("document not found");
            }
        }
        // Extract and process notifications data
        // const notifications = payload.notifications || {};
        // const performedByEmail = notifications.performed_by_email;
        // const performedByName = notifications.performed_by_name;
        // const performedAt = notifications.performed_at;
        // const reason = notifications.reason;
        // const activity = notifications.activity;
        // const operationType = notifications.operation_type;
        // const actionId = notifications.action_id;
        // const ipAddress = notifications.ip_address;

        // // Convert timestamp from milliseconds to a Date object
        // const performedAtDate = new Date(performedAt);

        // // Log the data
        // console.log(
        //     `Operation performed by: ${performedByName} (${performedByEmail})`
        // );
        // console.log(`Timestamp: ${performedAtDate}`);
        // console.log(`Reason: ${reason}`);
        // console.log(`Activity: ${activity}`);
        // console.log(`Operation Type: ${operationType}`);
        // console.log(`Action ID: ${actionId}`);
        // console.log(`IP Address: ${ipAddress}`);

        // // Extract and process requests data
        // const requests = payload.requests || {};
        // const requestName = requests.request_name;
        // const requestId = requests.request_id;
        // const documentIds = requests.document_ids || [];

        // // Log the requests data
        // console.log(`Request Name: ${requestName}`);
        // console.log(`Request ID: ${requestId}`);

        // documentIds.forEach((doc) => {
        //     const documentName = doc.document_name;
        //     const documentId = doc.document_id;
        //     console.log(`Document Name: ${documentName}`);
        //     console.log(`Document ID: ${documentId}`);
        // });

        // const contractDetails = await new ContractRepo().getContractByDocId(
        //     requestId as string
        // );

        // let contractId = "";
        // if (contractDetails) {
        //     contractId = contractDetails.id;
        // }

        // // Handle different operation types
        // switch (operationType) {
        //     case "RequestSubmitted":
        //         console.log("A new request has been submitted.");
        //         break;
        //     case "RequestViewed":
        //         console.log("A request has been viewed.");
        //         break;
        //     case "RequestSigningSuccess":
        //         if (contractId != "") {
        //             await new ZohoSignRepo().handleZohoSignCaptured(
        //                 contractId,
        //                 contractDetails,
        //                 requestId,
        //                 SIGN_STATUS.COMPLETED
        //             );
        //         }
        //         console.log("A document has been signed successfully.");
        //         break;
        //     case "RequestCompleted":
        //         console.log("The request has been completed.");
        //         break;
        //     case "RequestRejected":
        //         console.log("The request has been rejected.");
        //         break;
        //     case "RequestRecalled":
        //         console.log("The request has been recalled.");
        //         break;
        //     case "RequestForwarded":
        //         console.log(
        //             "The request has been forwarded to another person."
        //         );
        //         break;
        //     case "RequestExpired":
        //         console.log("The request has expired.");
        //         break;
        //     default:
        //         console.log("Unknown operation type.");
        //         break;
        // }

        return res.status(200).send({ message: "Success" });
    }

    // Send document to franchise using template
    static async sendDocumentUsingTemplate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const templateId = get(req.body, "templateId", "");
            const contractId = get(req.body, "contractId", "");
            const recipientName = get(req.body, "recipientName", "");
            const notes = get(req.body, "notes", "");
            const recipientEmail = get(req.body, "recipientEmail", "");
            let prefilledValues = get(req.body, "prefilledValues", "");

            const contractDetails = await new ContractRepo().get(
                contractId as number
            );
            if (!contractDetails) {
                return res.status(401).send("No contract found");
            }

            const getTemplate = await new ZohoSignRepo().getTemplateFields(
                templateId as number
            );
            if (!getTemplate) {
                return res.status(401).send("No template found");
            }

            const jsonData = {
                templates: {
                    field_data: {
                        field_text_data: {},
                        field_boolean_data: {},
                        field_date_data: {},
                        field_radio_data: {},
                    },
                    actions: [],
                    notes: notes,
                },
            };

            if (getTemplate?.docs) {
                const docFields = getTemplate.docs;
                prefilledValues = JSON.parse(prefilledValues);

                docFields.forEach((doc) => {
                    const fields = doc.fields || [];

                    fields.forEach((field) => {
                        const fieldLabel = field.field_label;
                        const fieldValue = prefilledValues[fieldLabel] || "";

                        if (field.field_category === "textfield") {
                            jsonData.templates.field_data.field_text_data[
                                fieldLabel
                                ] = fieldValue;
                        }
                    });
                });
            }
            if (getTemplate.actions.length > 0) {
                getTemplate.actions.forEach((action) => {
                    jsonData.templates.actions.push({
                        recipient_name: recipientName,
                        recipient_email: recipientEmail,
                        action_id: action.action_id,
                        action_type: action.action_type,
                        signing_order: 1,
                        verify_recipient: "false",
                        private_notes: "",
                    });
                });
            }

            let data = new FormData();
            data.append("data", JSON.stringify(jsonData));

            const sendDocument =
                await new ZohoSignRepo().sendDocumentUsingTemplate(
                    templateId,
                    data
                );
            if (sendDocument) {
                // const currentSignedDocs = Array.isArray(contractDetails.signedDocs) ?
                //     [...contractDetails.signedDocs] : [];

                // const contractSignDocPayload = {
                //     ...contractDetails.signedDocs[0],
                //     docId: sendDocument?.requests.request_id,
                // };

                // currentSignedDocs.push(contractSignDocPayload);
                // await new ContractRepo().updateContractDoc(contractId, currentSignedDocs);

                console.log("2w3e4r5678")
                console.log(sendDocument)
                console.log("2w3e4r5678")

                return res.status(200).send({
                    success: true,
                    message: "Document sent successfully",
                    data: sendDocument,
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Failed to send document",
                    data: {},
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error?.response?.data?.message ||
                    "An error occurred while sending the document",
            });
        }
    }

    // Get all the templates
    static async getTemplates(req: Request, res: Response, next: NextFunction) {
        try {
            const getTemplate = await new ZohoSignRepo().getTemplates();
            if (getTemplate) {
                return res.status(200).send(getTemplate);
            }
            return res.status(403).send("No templates found");
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "An error occurred while getting the templates",
            });
        }
    }

    // Get document
    static async getDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const documentId = get(req.body, "documentId", "");

            const getTemplate = await new ZohoSignRepo().getDocument(
                documentId as number
            );
            if (getTemplate) {
                return res.status(200).send(getTemplate);
            }
            return res.status(403).send("No document found");
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "An error occurred while getting the documents",
            });
        }
    }

    // Get all fields of templates
    static async getFieldsByTemplate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const templateId = get(req.params, "templateId");
        try {
            const getTemplateFields =
                await new ZohoSignRepo().getTemplateFields(templateId);
            if (!getTemplateFields) {
                res.status(403).send("No template found");
            }
            res.status(200).send(getTemplateFields);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    "An error occurred while getting the fields of template",
            });
        }
    }
}
