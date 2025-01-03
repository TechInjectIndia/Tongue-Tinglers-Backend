import React from "react";
import MailLayout from "./MailLayout";

const PaymentReceived = () => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    We have successfully received your payment. Thank you for completing this
                    important step!
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    You are now officially a Tongue Tinglers franchisee partner, and we’re excited
                    to have you on board.
                </p>

                {/* Button */}
                <div className="text-center">
                    <button
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background: "linear-gradient(to right, #dc322f, #ffcd32)",
                        }}
                    >
                        What’s NEXT?
                    </button>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    You’ll soon receive an email with your login details and a link to create your
                    password, granting you access to the Tongue Tinglers Ecosystem.
                    <br />
                    Thank you for joining us – let’s make a flavorful impact together!
                    <br />
                    <br />
                    Warm regards,
                    <br />
                    The Tongue Tinglers Team
                </p>
            </div>
        </div>
    </MailLayout>
);

export default PaymentReceived;
