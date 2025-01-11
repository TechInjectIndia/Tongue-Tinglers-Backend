import React from "react";
import MailLayout from "./MailLayout";
import { Button } from "@react-email/components";

const MakePayment = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[18px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Congratulations on reaching <br />
                    the last step of your <br /> onboarding journey!
                </p>

                <p className="text-[16px] text-left mt-5 text-black leading-7">
                    To officially become a Tongue Tinglers franchisee partner,
                    please complete your payment using the secure link.
                </p>

                <br />
                {/* Button */}
                <div className="text-center">
                    <a
                        href={data.btnLink}
                        className="border border-none cursor-pointer text-[15px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background:
                                "linear-gradient(to right, #dc322f, #ffcd32)",
                            textDecoration: "none",
                        }}
                        onClick={() => window.open(data.btnLink, "_blank")}
                    >
                        PAY NOW
                    </a>
                </div>
                <br />
                <p className="text-[16px] text-left mt-5 text-black leading-7">
                    This final step confirms your partnership and sets
                    everything in motion for an exciting journey ahead.We’re
                    thrilled to have you with us and look forward to building
                    something extraordinary together!
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

export default MakePayment;
