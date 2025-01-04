import React from "react";

import MailLayout from "./MailLayout";

const LeadToProspect = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Thank you for moving <br /> forward with us in this <br />{" "}
                    exciting journey!
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    To proceed further and finalize the process, we kindly
                    request you to fill out your organization details.
                </p>

                {/* Button */}
                <div className="text-center">
                    <a
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background:
                                "linear-gradient(to right, #dc322f, #ffcd32)",
                        }}
                        href={data.btnLink}
                    >
                        SETUP YOUR ORGANIZATION
                    </a>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Providing this information will help us ensure a seamless
                    onboarding experience and allow us to tailor our support to
                    your specific needs.
                    <br />
                    <br />
                    We’re thrilled to have you as part of the Tongue Tinglers
                    family and look forward to working together!
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

export default LeadToProspect;
