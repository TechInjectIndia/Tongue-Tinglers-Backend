import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createStandardPaymentLink } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ContractRepo } from '../../contracts/models/ContractModel';
import { LeadRepo } from '../../lead/models/lead';
import { OrderRepo } from '../../ecommerce/models/orders';
import { ORDER_TYPE, ORDER_STATUS } from '../../../interfaces';

export default class PaymentsController {
    static async generatePaymentLink(req: Request, res: Response, next: NextFunction) {
        try {
            const contract_id = req?.body?.contract_id;
            const getContractDetails = await new ContractRepo().get(contract_id as string);
            if (getContractDetails) {
                const getLeadDetails = await new LeadRepo().get(contract_id as string);
                const link = await createStandardPaymentLink({ 'contract': getContractDetails, 'lead': getLeadDetails });
                if (link) {
                    const orderPayload = {
                        userId: getLeadDetails.id,
                        trackingNumber: '',
                        shippingAddress: '',
                        paymentMethod: 'razorpay',
                        totalPrice: getContractDetails.amount,
                        isRepeated: 0,
                        orderStatus: ORDER_STATUS.UNPAID,
                        orderType: ORDER_TYPE.CONTRACT
                    }
                    const orderCreate = await new OrderRepo().create(orderPayload);
                }
                return res
                    .status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.CREATED,
                            link
                        )
                    );
            }
            return res
                .status(401)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        ERROR_MESSAGE.INVALID_REQUEST,
                    )
                );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}