import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { AdminRepo } from '../../admin-user/models/user';
import crypto from 'crypto';

// Generate a user-friendly referral code
function generateReferralCode(length = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        referralCode += characters[randomIndex];
    }
    return referralCode;
}

export default class ReferralController {
    static async getReferralCode(req: Request, res: Response, next: NextFunction) {
        try {
            const referralCode = req.params.referralCode as string;

            if (!referralCode) {
                return res.status(400).send(
                    sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.REFERRAL_CODE_REQUIRED)
                );
            }

            // Retrieve referral code details from the database
            const referral = await new AdminRepo().getByReferralCode(referralCode);

            if (!referral) {
                return res.status(404).send(
                    sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS)
                );
            }

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, referral)
            );
        } catch (err) {
            console.error('Error fetching referral code:', err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async generate(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', '');
            let referralCode: string;
            const checkIfExist = await new AdminRepo().get(user_id);
            if (checkIfExist) {
                if (checkIfExist.referralCode == '' || null) {
                    do {
                        referralCode = generateReferralCode();
                    } while (await new AdminRepo().existsByReferralCode(referralCode)); // Ensure code is unique

                    const payload = { referralCode: referralCode };
                    await new AdminRepo().saveReferral(user_id, payload);

                    return res.status(200).send(
                        sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, { referralCode })
                    );
                }
            }

            return res.status(404).send(
                sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS)
            );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { referralCode } = req.body;

            if (!referralCode) {
                return res.status(400).send(
                    sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.REFERRAL_CODE_REQUIRED)
                );
            }

            const existingReferral = await new AdminRepo().getByReferralCode(referralCode);
            if (!existingReferral) {
                return res.status(404).send(
                    sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS)
                );
            }

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.REFERRAL_CODE_VALID, { userId: existingReferral })
            );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}