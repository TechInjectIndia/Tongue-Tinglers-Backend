import * as cryptoNode from "node:crypto";

const validateWebhookSignature = (body: string, signature: string, secret: string) => {
    /*
     * Verifies webhook signature
     *
     * @param {String} summary
     * @param {String} signature
     * @param {String} secret
     *
     * @return {Boolean}
     */

    if (!isDefined(body) || !isDefined(signature) || !isDefined(secret)) {
        throw Error(
            "Invalid Parameters: Please give request body," +
                "signature sent in X-Razorpay-Signature header and " +
                "webhook secret from dashboard as parameters"
        );
    }

    body = body.toString();

    const expectedSignature = cryptoNode.createHmac("sha256", secret).update(body).digest("hex");

    return expectedSignature === signature;
};

const isDefined = (value: any) => {
    return typeof value !== "undefined";
};

export { validateWebhookSignature };
