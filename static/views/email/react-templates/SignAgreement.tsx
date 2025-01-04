import React from "react";
import MailLayout from "./MailLayout";

const SignAgreement = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Let’s take our journey forward!
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Sign your agreement to start your official journey with Tongue Tinglers.
                    <br />
                    We’ve prepared an agreement that outlines our partnership and mutual
                    commitments.
                    <br />
                    To finalize your onboarding, please review and sign.{" "}
                </p>

                {/* Button */}
                <div className="text-center">
                    <a  href={data.btnLink}
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background: "linear-gradient(to right, #dc322f, #ffcd32)",
                            textDecoration: "none"
                        }}
                    >
                        SIGN YOUR AGREEMENT
                    </a>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Let’s take our journey forward and set the stage for a successful partnership!
                    We’re excited to have you on board and look forward to working together!
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

export default SignAgreement;
